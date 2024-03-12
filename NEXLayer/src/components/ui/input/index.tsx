// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import TextInput from "./text-input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string | null;
    onchange?: (value: string) => void;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,errorMessage,onchange, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input w-full"
      >
        <TextInput
            onChange={(e) => onchange!(e.target.value as any)}
            type="number"
            className={className}
            value={props.value as number}
            name="number"
            placeholder={props.placeholder}
            id={props.title}
            min={0}
            errorMessage={errorMessage}
            
            {...props}
          />
      
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };
