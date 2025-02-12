import { RiCheckLine } from "@remixicon/react";
import { tv } from "tailwind-variants";

type StatusProps = {
  position: number;
  activePosition: number;
  name: string;
};

const statusClassName = tv({
  base: "h-[52px] rounded-lg font-medium text-[18px] flex items-center whitespace-nowrap gap-[10px] px-[32px] py-[16px]",
  variants: {
    status: {
      active: "bg-primary text-white",
      completed: "bg-lightPurple text-primary",
      uncomplete: "bg-lightGrey text-grey",
    },
  },
});

const Status = ({ name, position, activePosition }: StatusProps) => {
  const status =
    activePosition > position
      ? "completed"
      : activePosition === position
        ? "active"
        : "uncomplete";

  return (
    <div
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
