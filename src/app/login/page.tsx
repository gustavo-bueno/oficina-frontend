"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import meninasDigitaisLogo from "@/app/assets/img/meninas-digitais-branco.png";
import Image from "next/image";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "Mínimo de 8 caracteres")
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

  const { errors } = loginForm.formState;

  const onSubmit = () => {};

  return (
    <FormProvider {...loginForm}>
      <div className="flex">
        <section className="w-[50%] flex justify-center pt-[64px]">
          <form
            className="w-full max-w-[600px]"
            onSubmit={loginForm.handleSubmit(onSubmit)}
          >
            <h1 className="text-[42px] font-bold text-black">Login</h1>
            <p className="text-[18px] mt-4 mb-10 text-black">
              Bem vinda (o) de volta! :)
            </p>
            <div className="flex flex-col w-full gap-5">
              <Input
                placeholder="Email"
                name="email"
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                placeholder="Senha"
                name="password"
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <div className="flex items-center justify-between">
                <Button className="w-[280px]">Entrar</Button>

                <a className="font-bold text-primary">Esqueci minha senha</a>
              </div>
            </div>
          </form>
        </section>
        <section className="min-h-screen w-[50%] flex items-center justify-center bg-[linear-gradient(151deg,#E3B632_4.24%,#981CB0_48.01%,#66328D_91.76%)]">
          <Image
            src={meninasDigitaisLogo}
            alt="Meninas Digitais Logo"
            height={500}
            width={500}
          />
        </section>
      </div>
    </FormProvider>
  );
};

export default Login;
