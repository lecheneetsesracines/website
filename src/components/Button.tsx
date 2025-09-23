import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-amber-800 font-semibold text-amber-100 hover:bg-amber-700 active:bg-amber-800 active:text-amber-100/70 dark:bg-amber-700 dark:hover:bg-amber-600 dark:active:bg-amber-700 dark:active:text-amber-100/70',
  secondary:
    'bg-amber-50 font-medium text-amber-900 hover:bg-amber-100 active:bg-amber-100 active:text-amber-900/60 dark:bg-amber-800/50 dark:text-amber-300 dark:hover:bg-amber-800 dark:hover:text-amber-50 dark:active:bg-amber-800/50 dark:active:text-amber-50/70',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
