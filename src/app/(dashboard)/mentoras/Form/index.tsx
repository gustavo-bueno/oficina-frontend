"use client";

import Button from "@/app/components/Button";
import DeleteButton from "@/app/components/DeleteButton";
import Input from "@/app/components/Input";
import { deleteMentor, inviteMentor } from "@/app/services/mentors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const mentorSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  name: yup
    .string()
    .min(2, "Mínimo de 8 caracteres")
    .required("Campo obrigatório"),
});

type MentorForm = yup.InferType<typeof mentorSchema>;

type FormProps = {
  mentors: any[];
};

const Form = ({ mentors: initialMentors }: FormProps) => {
  const [mentors, setMentors] = useState(initialMentors);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const mentorForm = useForm<MentorForm>({
    resolver: yupResolver(mentorSchema),
  });

  const token = session?.user.token || "";
  const { errors } = mentorForm.formState;

  const onSubmit = async (data: MentorForm) => {
    setLoading(true);
    try {
      const { success, ...mentor } = await inviteMentor(
        {
          nome: data.name,
          email: data.email,
        },
        token,
      );

      if (success) {
        toast.success("Mentora convidada com sucesso!");
        setMentors((currentMentors) => [...currentMentors, mentor]);
        mentorForm.reset();
      }
    } catch {
      toast.error("Erro ao convidar mentora");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const result = await deleteMentor(id, token);
      if (result.success) {
        toast.success("Mentora apagada com sucesso!");
        setMentors((currentMentors) =>
          currentMentors.filter((mentor) => mentor._id !== id),
        );
      }
    } catch {
      toast.error("Erro ao apagar mentora.");
    }
  };

  return (
    <FormProvider {...mentorForm}>
      <div className="pt-10">
        <h1 className="text-black text-[42px] font-bold">Mentoras</h1>
        <form
          className="flex gap-[24px] mt-10 mb-16 items-center"
          onSubmit={mentorForm.handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Nome"
            containerClassName="max-w-[300px]"
            name="name"
            error={errors.name && errors.name?.message}
          />
          <Input
            placeholder="Email"
            name="email"
            error={errors.email && errors.email?.message}
          />
          <Button loading={loading} className="min-w-[298px]">
            Criar mentora
          </Button>
        </form>
        <ul className="flex flex-col gap-[36px]">
          {mentors.map((mentor) => (
            <li key={mentor._id} className="flex items-center justify-between">
              <div className="flex flex-col text-black">
                <p className="font-bold text-[20px]">{mentor.nome}</p>
                <p>{mentor.email}</p>
              </div>
              <DeleteButton onClick={() => deleteUser(mentor._id)} />
            </li>
          ))}
        </ul>
      </div>
    </FormProvider>
  );
};

export default Form;
