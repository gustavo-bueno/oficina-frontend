"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(4, "Mínimo de 8 caracteres")
    .required("Campo obrigatório"),
});

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const loginForm = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();

  const { errors } = loginForm.formState;

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast.error("Erro ao logar. Verifique as credenciais e tente novamente.");
    } else {
      router.push("/mentoras");
    }
  };

  return (
    <FormProvider {...loginForm}>
      <section className="flex justify-center pt-[64px]">
        <form
          className="w-full max-w-[600px]"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
          <h1 className="text-[42px] font-bold text-black">
            Esqueci minha senha
          </h1>
          <p className="text-[18px] mt-4 mb-10 text-black">
            Digite o email que você tem cadastrado aqui.
          </p>
          <div className="flex flex-col w-full gap-5">
            <Input
              placeholder="Email"
              name="email"
              error={errors.email && errors.email.message}
            />
            <div className="flex items-center justify-between">
              <Button className="w-[300px]">Recuperar senha</Button>
              <Link href="/login" className="font-bold text-primary">
                Voltar ao login
              </Link>
            </div>
          </div>
        </form>
      </section>
    </FormProvider>
  );
};

export default Login;
