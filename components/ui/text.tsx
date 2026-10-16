import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    muted: {
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
  },
})

type TextTag = "p" | "span" | "div" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type TextProps<T extends TextTag = "p"> = {
  as?: T
} & VariantProps<typeof textVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "color">

function Text<T extends TextTag = "p">({
  as,
  size,
  weight,
  muted,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? "p") as React.ElementType
  return (
    <Component
      data-slot="text"
      className={cn(textVariants({ size, weight, muted, className }))}
      {...props}
    />
  )
}

export { Text, textVariants }
