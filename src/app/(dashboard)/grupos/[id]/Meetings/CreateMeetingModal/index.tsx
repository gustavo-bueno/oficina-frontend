"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Select } from "@/app/components/Select";
import { getMentors, Mentora } from "@/app/services/mentors";
import { seniorityLevels } from "@/app/utils/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const createMeetingSchema = yup.object().shape({
  subject: yup.string().required("Campo obrigatório"),
  mentors: yup.array().of(yup.string()).required("Campo obrigatório"),
  obs: yup.string(),
  date: yup.string().required("Campo obrigatório"),
  time: yup.string(),
  place: yup.string(),
});

export type MeetingData = yup.InferType<typeof createMeetingSchema>;

const CreateMeetingModal = (props: Omit<ModalProps, "title">) => {
  const { data: session } = useSession();
  const [mentors, setMentors] = useState<Mentora[]>([]);
  const createMeetingForm = useForm<MeetingData>({
    resolver: yupResolver(createMeetingSchema),
  });

  const token = session?.user.token || "";

  useEffect(() => {
    const loadMentors = async () => {
      const mentorList = await getMentors(token);
      if (mentorList) setMentors(mentorList);
    };

    loadMentors();
  }, []);

  const { errors } = createMeetingForm.formState;
  const mentorsOptions = mentors.map((mentor) => ({
    label: mentor.nome,
    value: mentor._id,
  }));

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
                options={mentorsOptions}
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
            <Input
              placeholder="Hora"
              name="time"
              error={errors.time && errors.time.message}
            />
            <Input
              placeholder="Local"
              name="place"
              error={errors.place && errors.place.message}
            />
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
