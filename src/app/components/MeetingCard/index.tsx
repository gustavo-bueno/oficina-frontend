import { RiCheckFill, RiTimeLine } from "@remixicon/react";

type MeetingCardProps = {
  date: string;
  subject: string;
  completed?: boolean;
  onClick: () => void;
};

const MeetingCard = ({
  date,
  subject,
  onClick,
  completed = false,
}: MeetingCardProps) => {
  const formattedDate = new Date(date.replaceAll("/", "-")).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
    },
  );

  return (
    <article
      onClick={onClick}
      className="w-[220px] cursor-pointer h-[220px] bg-white rounded-lg p-[16px] text-black flex flex-col justify-between shadow-custom"
    >
      <div>
        <div className="flex items-center gap-[8px] text-black text-[18px]">
          <RiTimeLine />
          <p>{formattedDate}</p>
        </div>
        <h3 className="text-[22px] font-bold mt-1">
          Encontro ({formattedDate})
        </h3>
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
