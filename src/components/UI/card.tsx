import React from "react";
import coinsBg from "../../assets/coinsBg.png";
interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function Card({ className, children }: Props) {
  const classes = `card ${className || ""}`;
  return (
    <div className={classes}>
      <img
        className="absolute top-8 z-[-1]"
        src={coinsBg}
        alt=""
      />
      {children}
    </div>
  );
}
