
import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type ButtonProps = {
  children: ReactNode;
}

const button = tv({
  slots: {
    container: 'h-[58px] px-[64px] bg-primary border-none',
  }
})

const Button = ({
  children
}: ButtonProps) => {
  const { container } = button()

  return (
    <button className={container()}>
      {children}
    </button>
  )
}

export default Button