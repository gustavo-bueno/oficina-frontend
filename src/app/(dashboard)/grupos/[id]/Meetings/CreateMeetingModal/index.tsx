import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Select } from "@/app/components/Select";
import { seniorityLevels } from "@/app/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const createMeetingSchema = yup.object().shape({
  number: yup.string().required("Campo obrigatório"),
  subject: yup.string().required("Campo obrigatório"),
  mentors: yup.array().of(yup.string()).required("Campo obrigatório"),
  obs: yup.string(),
  date: yup.string().required("Campo obrigatório"),
});

export type MeetingData = yup.InferType<typeof createMeetingSchema>;

const CreateMeetingModal = (props: Omit<ModalProps, "title">) => {
  const createMeetingForm = useForm<MeetingData>({
    resolver: yupResolver(createMeetingSchema),
  });

  const { errors } = createMeetingForm.formState;

  const onSubmit = (data: MeetingData) => {
    console.log(data);
  };

  return (
    <Modal {...props} title="Criar encontro">
      <FormProvider {...createMeetingForm}>
        <form
          className="min-h-[350px] flex flex-col justify-between pt-6"
          onSubmit={createMeetingForm.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[24px]">
            <Input
              name="number"
              placeholder="N. do encontro"
              error={errors.number && errors.number?.message}
            />
            <Input
              placeholder="Tema"
              name="subject"
              error={errors.subject && errors.subject.message}
            />
            <div>
              <label htmlFor="mentors" className="text-black block mb-1">
                Selecione as mentoras (Command ou Ctrl para selecionar)
              </label>
              <Select
                placeholder="Selecione as mentoras"
                name="mentors"
                multiple
                defaultValue={["Select"]}
                options={seniorityLevels}
                error={errors.mentors && errors.mentors.message}
              />
            </div>
            <Input
              placeholder="Observações"
              name="obs"
              error={errors.obs && errors.obs.message}
              as="textarea"
              className="resize-none h-[200px]"
            />
            <div>
              <label htmlFor="date" className="text-black block mb-1">
                Data do encontro
              </label>
              <Input
                type="date"
                name="date"
                placeholder="Data"
                className="max-w-[200px]"
                error={errors.date && errors.date?.message}
              />
            </div>
          </div>
          <Button className="max-w-[286px] self-end mt-4">
            Criar encontro
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CreateMeetingModal;
