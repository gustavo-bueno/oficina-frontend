import { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useFormContext } from "react-hook-form";

type OptionProps = {
  value?: string;
  label: string;
};

type SelectProps = {
  name: string;
  options: OptionProps[];
  placeholder?: string;
  error?: string;
  containerClassName?: string;
} & InputHTMLAttributes<HTMLSelectElement>;

const select = tv({
  slots: {
    container: "flex flex-col gap-2",
    wrapper: [
      "w-full bg-color-input relative",
      "after:absolute after:content-[''] after:pointer-events-none after:w-5 after:h-5 after:right-4 after:top-1/2 after:-translate-y-1/2 after:bg-no-repeat after:bg-center after:bg-[length:20px] after:bg-[url('data:image/svg+xml;base64,PHN2ZwogICAgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgICAgICB3aWR0aD0iMTYiCiAgICAgICAgaGVpZ2h0PSIxNiIKICAgICAgICBmaWxsPSJjdXJyZW50Q29sb3IiCiAgICAgICAgdmlld0JveD0iMCAwIDE2IDE2IgogICAgICA+CiAgICAgICAgPHBhdGgKICAgICAgICAgIGZpbGwtcnVsZT0iZXZlbm9kZCIKICAgICAgICAgIGQ9Ik0xLjY0NiA0LjY0NmEuNS41IDAgMCAxIC43MDggMEw4IDEwLjI5M2w1LjY0Ni01LjY0N2EuNS41IDAgMCAxIC43MDguNzA4bC02IDZhLjUuNSAwIDAgMS0uNzA4IDBsLTYtNmEuNS41IDAgMCAxIDAtLjcwOCIKICAgICAgICAvPgogICAgICA8L3N2Zz4=')]",
    ],
    errorMessage: "text-[16px] text-red-600 mt-2",
    placeholderStyle: "disabled:text-grey hidden:text-grey",
  },
});

const field = tv({
  base: "relative appearance-none h-[52px] text-black w-full px-6 bg-input placeholder-grey rounded-lg outline-primary border hover:border-primary",
  variants: {
    status: {
      default: "",
      error: "border-red-600 hover:border-red-600",
    },
  },
});

export function Select({
  name,
  options,
  placeholder,
  error,
  defaultValue = "",
  containerClassName = "",
  ...props
}: SelectProps) {
  const { container, wrapper, errorMessage, placeholderStyle } = select();
  const { register } = useFormContext();

  return (
    <div className={container({ className: containerClassName })}>
      <div className={wrapper()}>
        <select
          id={name}
          className={field({ status: error ? "error" : "default" })}
          {...props}
          {...register(name)}
          defaultValue={defaultValue}
        >
          <option className={placeholderStyle()} value="" disabled hidden>
            {placeholder || "Select"}
          </option>
          {options.map((item) => (
            <option key={item.label} value={item.value || item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={errorMessage()}>{error}</p>}
    </div>
  );
}
