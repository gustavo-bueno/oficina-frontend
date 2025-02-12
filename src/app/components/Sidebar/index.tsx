"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";
import SidebarLink from "./SidebarLink";
import {
  RiGroup2Line,
  RiInformation2Line,
  RiMentalHealthLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import sidebarLogo from "@/app/assets/img/logo-sidebar.png";
import Image from "next/image";

const button = tv({
  slots: {
    container:
      "w-[186px] sticky top-0 h-screen bg-white shadow-custom p-[12px]",
    listContainer: "flex flex-col gap-[20px]",
    logo: "mb-10 mx-auto",
  },
});

const Sidebar = () => {
  const { container, listContainer, logo } = button();
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname.includes(route);
  };

  return (
    <aside className={container()}>
      <Image
        src={sidebarLogo}
        height={82}
        width={65}
        alt="Meninas Digitais Logo"
        className={logo()}
      />
      <nav>
        <ul>
          <li className={listContainer()}>
            <ul>
              <SidebarLink
                active={isActive("mentoras")}
                icon={<RiMentalHealthLine />}
                href="/mentoras"
              >
                Mentoras
              </SidebarLink>
            </ul>
            <ul>
              <SidebarLink
                active={isActive("grupos")}
                icon={<RiGroup2Line />}
                href="/grupos"
              >
                Grupos
              </SidebarLink>
            </ul>
            <ul>
              <SidebarLink
                active={isActive("informacoes")}
                icon={<RiInformation2Line />}
                href="/informacoes"
              >
                Informações
              </SidebarLink>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
