import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
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

const CreateGroupMemberModal = (props: Omit<ModalProps, "title">) => {
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
              error={errors.name && errors.name?.message}
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
              name="name"
              placeholder="Nome do grupo"
              error={errors.name && errors.name?.message}
            />
            <Input
              name="phone"
              placeholder="Telefone"
              error={errors.phone && errors.phone?.message}
            />
          </div>
          <Button className="max-w-[286px] self-end mt-5">Adicionar</Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGroupMemberModal;
