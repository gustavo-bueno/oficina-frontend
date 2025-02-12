"use client";

import { tv } from "tailwind-variants";
import SidebarLink from "./SidebarLink";
import {
  RiGroup2Line,
  RiInformation2Line,
  RiLogoutBoxRLine,
  RiMentalHealthLine,
} from "@remixicon/react";
import { usePathname } from "next/navigation";
import sidebarLogo from "@/app/assets/img/logo-sidebar.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

const button = tv({
  slots: {
    container:
      "w-[186px] sticky top-0 h-screen flex flex-col justify-between bg-white shadow-custom p-[12px]",
    listContainer: "flex flex-col gap-[20px]",
    logo: "mb-10 mx-auto",
  },
});

const Sidebar = () => {
  const { container, listContainer, logo } = button();
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (route: string) => {
    return pathname.includes(route);
  };

  const isAdmin = session?.user.admin;

  return (
    <aside className={container()}>
      <div>
        <Image
          src={sidebarLogo}
          height={82}
          width={65}
          alt="Meninas Digitais Logo"
          className={logo()}
        />
        <nav>
          <ul className={listContainer()}>
            {isAdmin && (
              <li>
                <SidebarLink
                  active={isActive("mentoras")}
                  icon={<RiMentalHealthLine />}
                  href="/mentoras"
                >
                  Mentoras
                </SidebarLink>
              </li>
            )}
            <li>
              <SidebarLink
                active={isActive("grupos")}
                icon={<RiGroup2Line />}
                href="/grupos"
              >
                Grupos
              </SidebarLink>
            </li>
            <li>
              <SidebarLink
                active={isActive("informacoes")}
                icon={<RiInformation2Line />}
                href="/informacoes"
              >
                Informações
              </SidebarLink>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className="text-primary mb-4 pl-2 font-medium text-[18px] flex items-center gap-[12px]"
        onClick={() => signOut()}
      >
        <RiLogoutBoxRLine /> Log out
      </button>
    </aside>
  );
};

export default Sidebar;
