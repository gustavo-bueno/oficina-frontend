import MeetingCard from "@/app/components/MeetingCard";
import { useEffect, useState } from "react";
import CreateMeetingModal, { MeetingData } from "./CreateMeetingModal";
import MeetingDetailsModal from "./MeetingModal";
import { getGroupMeetings, Meeting } from "@/app/services/meetings";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/app/components/Loading";
import { RiEmotionSadLine } from "@remixicon/react";

type MeetingsProps = {
  groupId: string;
};

const Meetings = ({ groupId }: MeetingsProps) => {
  const { data: session } = useSession();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [meetingToShow, setMeetingToShow] = useState<Meeting>({
    _id: "",
    data: "",
    usuarios: [
      {
        nome: "",
      },
    ],
    tema: "",
    concluido: false,
    observacoes: "",
    local: "",
    hora: "",
    grupoID: "",
  });
  const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);
  const [showMeetingDetailsModal, setShowMeetingDetailsModal] = useState(false);
  const token = session?.user.token ?? "";

  const loadMeetings = async () => {
    setLoading(true);
    const groupList = await getGroupMeetings(token ?? "", groupId);
    setMeetings(groupList);
    setLoading(false);
  };

  useEffect(() => {
    if (token) loadMeetings();
  }, [token]);

  const completedMeetings = meetings.filter((meeting) => meeting.concluido);
  const upcomingMeetings = meetings.filter((meeting) => !meeting.concluido);

  console.log(upcomingMeetings);

  return (
    <div>
      <MeetingDetailsModal
        {...meetingToShow}
        open={showMeetingDetailsModal}
        close={() => setShowMeetingDetailsModal(false)}
        onSuccess={async () => {
          loadMeetings();
        }}
      />
      <CreateMeetingModal
        groupId={groupId}
        onSuccess={async () => {
          setShowCreateMeetingModal(false);
          loadMeetings();
        }}
        open={showCreateMeetingModal}
        close={() => setShowCreateMeetingModal(false)}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-primary">Cronograma</h2>
        <button
          onClick={() => setShowCreateMeetingModal(true)}
          className="text-[22px] text-secondary font-bold"
        >
          Adicionar encontro
        </button>
      </div>
      <div className="flex flex-wrap gap-[32px] mt-5 mb-10 overflow-x-auto min-h-[228px]">
        {loading ? (
          <LoadingSpinner className="w-[30px] h-[30px]" />
        ) : !upcomingMeetings?.length ? (
          <div className="w-full text-[22px] flex-col font-bold text-darkGrey flex items-center justify-center">
            <RiEmotionSadLine className="h-[50px] w-[50px] mb-2" />
            <p> Nenhum encontro cadastrado</p>
          </div>
        ) : (
          upcomingMeetings.map((encontro) => (
            <MeetingCard
              key={encontro._id}
              {...encontro}
              date={encontro.data}
              subject={encontro.tema}
              completed={encontro.concluido}
              onClick={() => {
                setMeetingToShow(encontro);
                setShowMeetingDetailsModal(true);
              }}
            />
          ))
        )}
      </div>
      {completedMeetings.length > 0 ? (
        <>
          <h2 className="text-[28px] font-bold text-primary">
            Encontros concluídos
          </h2>
          <div className="flex flex-wrap gap-[32px] mt-5 mb-10 overflow-x-auto pb-1">
            {completedMeetings.map((encontro) => (
              <MeetingCard
                key={encontro._id}
                {...encontro}
                date={encontro.data}
                subject={encontro.tema}
                completed={encontro.concluido}
                onClick={() => {
                  setMeetingToShow(encontro);
                  setShowMeetingDetailsModal(true);
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Meetings;
