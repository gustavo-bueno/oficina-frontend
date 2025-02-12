import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Select } from "@/app/components/Select";
import { createGroup } from "@/app/services/groups";
import { seniorityLevels } from "@/app/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const createGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(2, "O campo deve ter no mínimo dois caracteres"),
  seniority: yup.string().required("Campo obrigatório"),
});

export type CreateGroupForm = yup.InferType<typeof createGroupSchema>;

type CreateGroupModalProps = {
  onSuccess: () => void;
} & Omit<ModalProps, "title">;

const CreateGroupModal = ({ onSuccess, ...props }: CreateGroupModalProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const createGroupForm = useForm<CreateGroupForm>({
    resolver: yupResolver(createGroupSchema),
  });

  const { errors } = createGroupForm.formState;
  const token = session?.user.token || "";

  const onSubmit = async (data: CreateGroupForm) => {
    setLoading(true);
    try {
      const result = await createGroup(
        {
          nome: data.name,
          senioridade: data.seniority,
        },
        token,
      );

      if (result.success) {
        toast.success("Grupo criado com sucesso!");
        onSuccess();
      } else {
        throw Error("Erro ao criar grupo");
      }
    } catch {
      toast.error(
        "Não foi possível criar o grupo. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} title="Criar grupo">
      <FormProvider {...createGroupForm}>
        <form
          className="min-h-[350px] flex flex-col justify-between pt-6"
          onSubmit={createGroupForm.handleSubmit(onSubmit)}
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
            Criar grupo
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGroupModal;
