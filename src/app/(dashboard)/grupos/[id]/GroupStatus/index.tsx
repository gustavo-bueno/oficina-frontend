"use client";

import { LoadingSpinner } from "@/app/components/Loading";
import StatusItem from "@/app/components/Status";
import { updateGroupStatus } from "@/app/services/groups";
import { getStatuses, Status } from "@/app/services/status";
import useGroups from "@/app/store/group";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type GroupStatusProps = {
  activeStatus: string;
  groupId: string;
};

const GroupStatus = ({
  groupId,
  activeStatus: initialActiveStatus,
}: GroupStatusProps) => {
  const [activeStatus, setActiveStatus] = useState(initialActiveStatus);
  const [loading, setLoading] = useState(false);
  const { statuses, setStatuses } = useGroups((store) => store);
  const { data: session } = useSession();
  const token = session?.user.token ?? "";

  useEffect(() => {
    const loadStatus = async () => {
      setLoading(true);
      const statusList = await getStatuses(token);
      if (statusList) {
        setStatuses(statusList);
      }
      setLoading(false);
    };

    if (!statuses.length && token) {
      loadStatus();
    }
  }, [statuses.length, token]);

  const activeStatusPosition =
    statuses.find((status) => status.status === activeStatus)?.position ??
    statuses[0]?.position;

  const updateStatus = async (status: Status) => {
    try {
      const result = await updateGroupStatus(
        {
          groupId: groupId,
          statusId: status._id,
        },
        token,
      );

      if (result.success) {
        setActiveStatus(status.status);
        toast.success("Status atualizado com successo");
      } else {
        throw Error("Erro ao atualizar status");
      }
    } catch {
      toast.error(
        "Não foi possível atualizar o status. Tente novamente mais tarde.",
      );
    }
  };

  return (
    <div>
      <h2 className="text-[28px] font-bold text-primary">Status</h2>
      <div className="flex gap-[32px] mt-5 mb-10 overflow-x-auto flex-nowrap pb-1">
        {loading && <LoadingSpinner className="h-[20px] w-[20px]" />}
        {statuses.map((status) => (
          <StatusItem
            key={status._id}
            name={status.status}
            position={status.position}
            activePosition={activeStatusPosition}
            onClick={() => updateStatus(status)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupStatus;
