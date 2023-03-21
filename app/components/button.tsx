import clsx from "clsx";

type Props = React.PropsWithChildren<{
  variant: 'contained' | 'outlined';
}>

export default function Button({ variant, children }: Props) {
  return <button className={clsx(
    "text-button  uppercase rounded h-10 px-4",
    {
      "text-primary border border-primary/50 hover:bg-primary/5 hover:border-primary transition-colors duration-300": variant === "outlined",
      "bg-primary text-onPrimary": variant === "contained",
    },
  )}>{children}</button>
}