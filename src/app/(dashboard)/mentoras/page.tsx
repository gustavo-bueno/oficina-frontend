"use client";

import Button from "@/app/components/Button";
import DeleteButton from "@/app/components/DeleteButton";
import Input from "@/app/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiDeleteBinLine } from "@remixicon/react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const mentorSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  name: yup
    .string()
    .min(2, "Mínimo de 8 caracteres")
    .required("Campo obrigatório"),
});

const Mentoras = () => {
  const mentorForm = useForm<any>({
    resolver: yupResolver(mentorSchema),
  });

  const onSubmit = async () => {};

  return (
    <FormProvider {...mentorForm}>
      <div className="pt-10">
        <h1 className="text-black text-[42px] font-bold">Mentoras</h1>
        <form
          className="flex gap-[24px] mt-10 mb-16 items-center"
          onSubmit={mentorForm.handleSubmit(onSubmit)}
        >
          <Input placeholder="Nome" className="max-w-[300px]" name="name" />
          <Input placeholder="Email" name="email" />
          <Button className="min-w-[298px]">Criar mentora</Button>
        </form>
        <ul className="flex flex-col gap-[36px]">
          <li className="flex items-center justify-between">
            <div className="flex flex-col text-black">
              <p className="font-bold text-[20px]">Gabriela Passotto</p>
              <p>passotto@alunos.utfpr.edu.br</p>
            </div>
            <DeleteButton onClick={() => console.log("delete")} />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex flex-col text-black">
              <p className="font-bold text-[20px]">Marcos Bueno</p>
              <p>mprestes@alunos.utfpr.edu.br</p>
            </div>
            <DeleteButton onClick={() => console.log("delete")} />
          </li>
        </ul>
      </div>
    </FormProvider>
  );
};

export default Mentoras;
