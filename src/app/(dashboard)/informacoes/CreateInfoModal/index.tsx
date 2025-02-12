import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const createInfoSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  content: yup.string().required("Campo obrigatório"),
});

type CreateInfoForm = yup.InferType<typeof createInfoSchema>;

const CreateInfoModal = (props: Omit<ModalProps, "title">) => {
  const createInfoForm = useForm<CreateInfoForm>({
    resolver: yupResolver(createInfoSchema),
  });

  const { errors } = createInfoForm.formState;

  const onSubmit = (data: CreateInfoForm) => {
    console.log(data);
  };

  return (
    <Modal {...props} title="Criar grupo">
      <FormProvider {...createInfoForm}>
        <form
          className="flex flex-col justify-between gap-[32px] pt-6"
          onSubmit={createInfoForm.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[32px]">
            <Input
              name="title"
              placeholder="Título"
              error={errors.title && errors.title?.message}
            />
            <Input
              as="textarea"
              rows={5}
              className="resize-none h-[256px]"
              name="content"
              placeholder="Conteúdo"
              error={errors.content && errors.content?.message}
            />
          </div>
          <Button className="max-w-[300px] self-end">Criar informação</Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateInfoModal;
