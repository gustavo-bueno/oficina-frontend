import { RiDeleteBinLine } from "@remixicon/react";

type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Apagar"
      className="bg-red-600 w-[48px] h-[48px] flex items-center justify-center text-white rounded-md"
    >
      <RiDeleteBinLine />
    </button>
  );
};

export default DeleteButton;
