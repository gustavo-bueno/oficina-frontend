import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

type InputProps = {
  name: string;
  errorMessage?: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const input = tv({
  slots: {
    field:
      "h-[52px] placeholder-grey w-full rounded-lg px-[16px] outline-primary py-[12px] text-black bg-input",
    container: "w-full",
  },
  variants: {
    status: {
      error: {
        field: "border-red-600 border",
      },
      default: {
        field: "",
      },
    },
  },
});

const Input = ({
  name,
  className,
  error,
  errorMessage,
  ...props
}: InputProps) => {
  const { register } = useFormContext();
  const { field, container } = input();

  return (
    <div className={container({ className })}>
      <input
        className={field({ status: error ? "error" : "default" })}
        {...props}
        {...register(name)}
      />
      {error && errorMessage && (
        <p className="text-red-600 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
