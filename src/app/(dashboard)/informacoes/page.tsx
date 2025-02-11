'use client'

import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { RiDeleteBinLine, RiExternalLinkLine } from "@remixicon/react"
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from 'yup'


const mentorSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    name: yup.string().min(2, "Mínimo de 8 caracteres").required("Campo obrigatório")
})

const Mentoras = () => {
  const mentorForm = useForm<any>({
    resolver: yupResolver(mentorSchema),
  })

  const onSubmit = async () => {}

  return (
<div 
     className="pt-10"

>

  <div className="flex items-center justify-between">
    <h1 className="text-black text-[42px] font-bold">
      Informações Gerais
    </h1>
    <button className="text-secondary text-[22px] font-bold border-none p-4">
      Adicionar informação
    </button>
  </div>

    <Link className="flex mb-10 mt-4 items-center text-primary font-bold text-[22px] gap-[8px]" href="https://www.technovationbrasil.org/">
      Site Technovation Girls
      <RiExternalLinkLine />
    </Link>
    
    <div className="flex flex-wrap gap-[24px]">
      <div className="w-[220px] h-[220px] bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
              <p className="text-[22px] text-black font-bold">
              Sala de para encontros
              </p>
          <span className="text-grey text-ellipsis">
            Disponíveis P104, P105, P106, P202
          </span>
      </div>
      <div className="w-[220px] h-[220px] bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
              <p className="text-[22px] text-black font-bold">
              Templates Canva
              </p>
          <span className="text-grey text-ellipsis">
           Disponível em https://www.canva.com/templates/
          </span>
      </div>
    </div>
    </div>

  )
}

export default Mentoras