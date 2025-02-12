import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const createGroupMemberSchema = yup.object().shape({
  nome: yup
    .string()
    .required("Campo obrigatório")
    .min(2, "O campo deve ter no mínimo dois caracteres"),
  dataNascimento: yup.string().required("Campo obrigatório"),
  escola: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  telefone: yup.string().required("Campo obrigatório"),
});

export type GroupMemberFormData = yup.InferType<typeof createGroupMemberSchema>;

type CreateGroupMemberModalProps = {
  groupId: string;
} & Omit<ModalProps, "title">;

const CreateGroupMemberModal = (props: CreateGroupMemberModalProps) => {
  const createGroupMemberForm = useForm<GroupMemberFormData>({
    resolver: yupResolver(createGroupMemberSchema),
  });

  const { errors } = createGroupMemberForm.formState;

  const onSubmit = (data: GroupMemberFormData) => {
    console.log(data);
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
              placeholder="Nome do grupo"
              error={errors.nome && errors.nome?.message}
            />
            <div>
              <label htmlFor="date" className="text-black block mb-1">
                Data de nascimento
              </label>
              <Input
                type="date"
                className="max-w-[200px]"
                name="date"
                placeholder="Data de nascimento"
                error={errors.dataNascimento && errors.dataNascimento?.message}
              />
            </div>

            <Input
              name="school"
              placeholder="Escola"
              error={errors.escola && errors.escola?.message}
            />
            <Input
              name="email"
              placeholder="Email"
              error={errors.email && errors.email?.message}
            />
            <Input
              name="phone"
              placeholder="Telefone"
              error={errors.telefone && errors.telefone?.message}
            />
          </div>
          <Button className="max-w-[286px] self-end mt-5">Adicionar</Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGroupMemberModal;
