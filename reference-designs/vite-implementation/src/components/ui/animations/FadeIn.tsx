
import React, { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
};

const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = "up",
  duration = 0.3,
  delay = 0,
  threshold = 0.1,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // Direction-based transform values
  const transformMap = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
    none: "none",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transformMap[direction],
        transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
