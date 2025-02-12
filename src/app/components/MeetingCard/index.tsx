import { RiCheckFill, RiTimeLine } from "@remixicon/react";

type MeetingCardProps = {
  number: number;
  date: Date;
  subject: string;
  mentors: string[];
  obs?: string;
  completed?: boolean;
};

const MeetingCard = ({
  number,
  date,
  subject,
  mentors,
  obs,
  completed = false,
}: MeetingCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <article className="w-[220px] h-[220px] bg-white rounded-lg p-[16px] text-black flex flex-col justify-between shadow-custom">
      <div>
        <div className="flex items-center gap-[8px] text-black text-[18px]">
          <RiTimeLine />
          <p>{formattedDate}</p>
        </div>
        <h3 className="text-[22px] font-bold mt-1">Encontro {number}</h3>
      </div>
      <div className="flex items-center justify-between gap-[8px]">
        <p className="text-[18px] font-medium">{subject}</p>
        {completed && (
          <RiCheckFill className="text-primary w-[44px] h-[44px]" />
        )}
      </div>
    </article>
  );
};

export default MeetingCard;
