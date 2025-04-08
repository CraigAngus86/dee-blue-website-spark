
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardNewProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "flat" | "sm" | "md" | "lg" | "xl";
  hoverEffect?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CardNew = React.forwardRef<HTMLDivElement, CardNewProps>(
  (
    { elevation = "md", hoverEffect = false, className, children, ...props },
    ref
  ) => {
    const elevationClasses = {
      flat: "border border-medium-gray",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    const hoverClasses = hoverEffect
      ? "transition-all duration-[var(--animation-standard)] ease-out hover:-translate-y-1 hover:shadow-lg"
      : "";

    return (
      <div
        className={cn(
          "bg-white rounded-lg overflow-hidden",
          elevationClasses[elevation],
          hoverClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardNew.displayName = "CardNew";

const CardNewHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 border-b border-medium-gray", className)}
    {...props}
  />
));

CardNewHeader.displayName = "CardNewHeader";

const CardNewContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));

CardNewContent.displayName = "CardNewContent";

const CardNewFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 border-t border-medium-gray", className)}
    {...props}
  />
));

CardNewFooter.displayName = "CardNewFooter";

const CardNewMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: "16/9" | "4/3" | "1/1" }
>(({ className, aspectRatio = "16/9", ...props }, ref) => {
  const aspectRatioClasses = {
    "16/9": "aspect-video",
    "4/3": "aspect-4/3",
    "1/1": "aspect-square",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        aspectRatioClasses[aspectRatio],
        className
      )}
      {...props}
    />
  );
});

CardNewMedia.displayName = "CardNewMedia";

const CardNewTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-h4 font-montserrat font-bold tracking-tight text-black",
      className
    )}
    {...props}
  />
));

CardNewTitle.displayName = "CardNewTitle";

const CardNewDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-small text-gray mt-2", className)}
    {...props}
  />
));

CardNewDescription.displayName = "CardNewDescription";

export {
  CardNew,
  CardNewHeader,
  CardNewContent,
  CardNewFooter,
  CardNewMedia,
  CardNewTitle,
  CardNewDescription,
};
