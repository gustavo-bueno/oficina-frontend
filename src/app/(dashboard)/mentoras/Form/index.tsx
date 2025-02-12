"use client";

import Button from "@/app/components/Button";
import DeleteButton from "@/app/components/DeleteButton";
import Input from "@/app/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
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

const Form = ({ mentors }: FormProps) => {
  const mentorForm = useForm<MentorForm>({
    resolver: yupResolver(mentorSchema),
  });

  console.log(mentors);

  const onSubmit = async () => {};
  const { errors } = mentorForm.formState;

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
          <Button className="min-w-[298px]">Criar mentora</Button>
        </form>
        <ul className="flex flex-col gap-[36px]">
          {mentors.map((mentor) => (
            <li key={mentor._id} className="flex items-center justify-between">
              <div className="flex flex-col text-black">
                <p className="font-bold text-[20px]">{mentor.nome}</p>
                <p>{mentor.email}</p>
              </div>
              <DeleteButton onClick={() => console.log("delete")} />
            </li>
          ))}
        </ul>
      </div>
    </FormProvider>
  );
};

export default Form;
