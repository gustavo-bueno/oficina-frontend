import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Select } from "@/app/components/Select";
import { seniorityLevels } from "@/app/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
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
} & Omit<ModalProps, "title">;

const EditGroupModal = ({ name, seniority, ...props }: EditGroupModalProps) => {
  const editGroupForm = useForm<EditGroupForm>({
    resolver: yupResolver(editGroupSchema),
    defaultValues: {
      name,
      seniority,
    },
  });

  const { errors } = editGroupForm.formState;

  const onSubmit = (data: EditGroupForm) => {
    console.log(data);
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
          <Button className="max-w-[286px] self-end">Editar grupo</Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditGroupModal;
