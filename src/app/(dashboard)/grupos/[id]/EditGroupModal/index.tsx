import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Select } from "@/app/components/Select";
import { updateGroup } from "@/app/services/groups";
import { seniorityLevels } from "@/app/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const editGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(2, "O campo deve ter no mínimo dois caracteres"),
  seniority: yup.string().required("Campo obrigatório"),
});

type EditGroupForm = yup.InferType<typeof editGroupSchema>;

type EditGroupModalProps = {
  name: string;
  seniority: string;
  groupId: string;
  onSuccess: () => void;
} & Omit<ModalProps, "title">;

const EditGroupModal = ({
  name,
  seniority,
  groupId,
  onSuccess,
  ...props
}: EditGroupModalProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const editGroupForm = useForm<EditGroupForm>({
    resolver: yupResolver(editGroupSchema),
    defaultValues: {
      name,
      seniority,
    },
  });

  const { errors } = editGroupForm.formState;
  const token = session?.user?.token || "";

  const onSubmit = async (data: EditGroupForm) => {
    setLoading(true);
    try {
      const { success } = await updateGroup(
        {
          nome: data.name,
          senioridade: data.seniority,
        },
        groupId,
        token,
      );

      if (success) {
        toast.success("Grupo atualizado com sucesso!");
        onSuccess();
      }
    } catch (error) {
      toast.error("Erro aoa atualizar grupo. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} title="Editar grupo">
      <FormProvider {...editGroupForm}>
        <form
          className="min-h-[350px] flex flex-col justify-between pt-6"
          onSubmit={editGroupForm.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[32px]">
            <Input
              name="name"
              placeholder="Nome do grupo"
              error={errors.name && errors.name?.message}
            />
            <Select
              placeholder="Selecione sua senioridade"
              name="seniority"
              options={seniorityLevels}
              error={errors.seniority && errors.seniority.message}
            />
          </div>
          <Button loading={loading} className="max-w-[286px] self-end">
            Editar grupo
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditGroupModal;
