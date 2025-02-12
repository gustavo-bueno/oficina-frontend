import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Select } from "@/app/components/Select";
import { seniorityLevels } from "@/app/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const createGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(2, "O campo deve ter no mínimo dois caracteres"),
  seniority: yup.string().required("Campo obrigatório"),
});

type CreateGroupForm = yup.InferType<typeof createGroupSchema>;

const CreateGroupModal = (props: Omit<ModalProps, "title">) => {
  const createGroupForm = useForm<CreateGroupForm>({
    resolver: yupResolver(createGroupSchema),
  });

  const { errors } = createGroupForm.formState;

  const onSubmit = (data: CreateGroupForm) => {
    console.log(data);
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
          <Button className="max-w-[286px] self-end">Criar grupo</Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateGroupModal;
