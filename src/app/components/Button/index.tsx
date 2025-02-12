import { ButtonHTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const button = tv({
  slots: {
    container:
      "h-[52px] px-[64px] bg-primary text-white border-none font-bold text-[18px] rounded-lg",
  },
});

const Button = ({ children, className, ...props }: ButtonProps) => {
  const { container } = button();

  return (
    <button {...props} className={container({ className })}>
      {children}
    </button>
  );
};

export default Button;
