import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { createGroupMember } from "@/app/services/groups";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const createGroupMemberSchema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(2, "O campo deve ter no mínimo dois caracteres"),
  birthDate: yup.string().required("Campo obrigatório"),
  school: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  phone: yup.string().required("Campo obrigatório"),
});

export type GroupMemberFormData = yup.InferType<typeof createGroupMemberSchema>;

type CreateGroupMemberModalProps = {
  groupId: string;
  onSuccess: () => void;
} & Omit<ModalProps, "title">;

const CreateGroupMemberModal = ({
  groupId,
  onSuccess,
  ...props
}: CreateGroupMemberModalProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const createGroupMemberForm = useForm<GroupMemberFormData>({
    resolver: yupResolver(createGroupMemberSchema),
  });
  const token = session?.user.token || "";
  const { errors } = createGroupMemberForm.formState;

  const onSubmit = async (data: GroupMemberFormData) => {
    setLoading(true);
    try {
      const result = await createGroupMember(
        {
          nome: data.name,
          dataNascimento: data.birthDate,
          grupoID: groupId,
          escola: data.school,
          email: data.email,
          telefone: data.phone,
        },
        token,
      );

      if (result.success) {
        toast.success("Integrante criada com sucesso!");
        onSuccess();
      } else {
        throw Error("Erro ao criar integrante");
      }
    } catch {
      toast.error(
        "Não foi possível criar a integrante. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} title="Adicionar integrante">
      <FormProvider {...createGroupMemberForm}>
        <form
          className="min-h-[350px] flex flex-col justify-between pt-6"
          onSubmit={createGroupMemberForm.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[32px]">
            <Input
              name="name"
              placeholder="Nome da integrante"
              error={errors.name && errors.name?.message}
            />
            <div>
              <label htmlFor="birthDate" className="text-black block mb-1">
                Data de nascimento
              </label>
              <Input
                type="date"
                className="max-w-[200px]"
                name="birthDate"
                placeholder="Data de nascimento"
                error={errors.birthDate && errors.birthDate?.message}
              />
            </div>

            <Input
              name="school"
              placeholder="Escola"
              error={errors.school && errors.school?.message}
            />
            <Input
              name="email"
              placeholder="Email"
              error={errors.email && errors.email?.message}
            />
            <Input
              name="phone"
              placeholder="Telefone"
              error={errors.phone && errors.phone?.message}
            />
          </div>
          <Button loading={loading} className="max-w-[286px] self-end mt-5">
            Adicionar
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGroupMemberModal;
