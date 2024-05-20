"use client";
import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button isLoading={pending} {...props} disabled={pending}>
        {" "}
        Okay{" "}
      </Button>
    </div>
  );
};

export default SubmitButton;
