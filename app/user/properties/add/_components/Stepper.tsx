import { cn } from "@nextui-org/react";
import React from "react";
interface Props {
  items: {
    label: string;
  }[];
  activeItem: number;
  setActiveItem: (index: number) => void;
  className?: string;
}
const Stepper = ({ items, activeItem, setActiveItem, className }: Props) => {
  return (
    <div className={cn("flex items-center justify-around p-6 ", className)}>
      {items.map((item, i) => {
        return (
          <div key={i} className={cn("flex flex-col")}>
            <div
              className={cn(
                "rounded-full w-6 h-6 flex justify-center self-center items-center transition-colors",
                {
                  "bg-primary-400 text-white": i === activeItem,
                  "bg-gray-400 text-white": i > activeItem,
                  "bg-primary-700 text-white": i < activeItem,
                  "cursor-pointer": i <= activeItem,
                }
              )}
              {...(i < activeItem ? { onClick: () => setActiveItem(i) } : {})}
            >
              {i + 1}
            </div>

            <p
              className={cn("", {
                "text-primary-400 ": i === activeItem,
                "text-gray-400 ": i > activeItem,
                "text-primary-700 ": i < activeItem,
                "cursor-pointer": i <= activeItem,
              })}
            >
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
