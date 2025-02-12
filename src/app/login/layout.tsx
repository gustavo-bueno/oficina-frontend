import meninasDigitaisLogo from "@/app/assets/img/meninas-digitais-branco.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/grupos");

  return (
    <>
      <main className="bg-white h-screen w-screen flex">
        <div className="w-[50%]">{children}</div>
        <section className="min-h-screen w-[50%] flex items-center justify-center bg-[linear-gradient(151deg,#E3B632_4.24%,#981CB0_48.01%,#66328D_91.76%)]">
          <Image
            src={meninasDigitaisLogo}
            alt="Meninas Digitais Logo"
            height={500}
            width={500}
          />
        </section>
      </main>
      <ToastContainer />
    </>
  );
}
