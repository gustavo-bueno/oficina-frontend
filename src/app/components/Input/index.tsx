
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form';
import { tv } from 'tailwind-variants'

type InputProps = {
  name: string;
} & InputHTMLAttributes<HTMLInputElement>

const input = tv({
  slots: {
    container: 'h-[58px] w-full rounded-lg p-[12px] text-black bg-lightGrey',
  }
})

const Input = ({
  name,
  className,
  ...props
}: InputProps) => {
  const { register } = useFormContext()
  const { container } = input()

  return (
    <input className={container({ className })} {...props} {...register(name)} />
  )
}

export default Input