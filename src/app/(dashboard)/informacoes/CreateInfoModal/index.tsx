import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { createInformation } from "@/app/services/general-info";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const createInfoSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  content: yup.string().required("Campo obrigatório"),
});

type CreateInfoForm = yup.InferType<typeof createInfoSchema>;

type CreateInfoModalProps = {
  token: string;
  onSuccess: () => void;
} & Omit<ModalProps, "title">;

const CreateInfoModal = ({
  token,
  onSuccess,
  ...props
}: CreateInfoModalProps) => {
  const [loading, setLoading] = useState(false);
  const createInfoForm = useForm<CreateInfoForm>({
    resolver: yupResolver(createInfoSchema),
  });

  const { errors } = createInfoForm.formState;

  const onSubmit = async (data: CreateInfoForm) => {
    setLoading(true);
    try {
      const result = await createInformation(
        {
          titulo: data.title,
          conteudo: data.content,
        },
        token,
      );

      if (result.success) {
        toast.success("Informação criada com sucesso!");
        createInfoForm.reset();
        onSuccess();
      } else {
        throw Error("Erro ao criar informação");
      }
    } catch {
      toast.error(
        "Não foi possível criar o informação. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} title="Criar informação">
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
          <Button loading={loading} className="max-w-[300px] self-end">
            Criar informação
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateInfoModal;
