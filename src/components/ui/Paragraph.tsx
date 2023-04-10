import { VariantProps, cva } from "class-variance-authority";
import cn from "@/lib/utils";

export const paragraphVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export default function Paragraph({
  className,
  size,
  children,
  ...props
}: ParagraphProps) {
  return (
    <p {...props} className={cn(paragraphVariants({ size, className }))}>
      {children}
    </p>
  );
}

Paragraph.displayName = "Paragraph";
