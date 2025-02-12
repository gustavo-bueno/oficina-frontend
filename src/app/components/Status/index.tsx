import { RiCheckLine } from "@remixicon/react";
import { tv } from "tailwind-variants";

type StatusProps = {
  position: number;
  activePosition: number;
  name: string;
  onClick: () => void;
};

const statusClassName = tv({
  base: "h-[52px] rounded-lg cursor-pointer font-medium text-[18px] flex items-center whitespace-nowrap gap-[10px] px-[32px] py-[16px]",
  variants: {
    status: {
      active: "bg-primary text-white",
      completed: "bg-lightPurple text-primary",
      uncomplete: "bg-lightGrey text-grey",
    },
  },
});

const Status = ({ name, position, activePosition, onClick }: StatusProps) => {
  const status =
    activePosition > position
      ? "completed"
      : activePosition === position
        ? "active"
        : "uncomplete";

  return (
    <div
      onClick={onClick}
      className={statusClassName({
        status,
      })}
    >
      {status === "completed" && <RiCheckLine />}
      {name}
    </div>
  );
};

export default Status;
