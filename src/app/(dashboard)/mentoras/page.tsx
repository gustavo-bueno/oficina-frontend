import { getServerSession } from "next-auth";
import Form from "./Form";
import { getMentors } from "@/app/services/mentors";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Mentoras = async () => {
  const session = await getServerSession(authOptions);
  const mentors = await getMentors(session?.user?.token ?? "");

  if (!session?.user.admin) redirect("/grupos");

  return <Form mentors={mentors} />;
};

export default Mentoras;
