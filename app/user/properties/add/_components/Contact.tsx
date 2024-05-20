import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { Button, Card, Input, cn } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyType } from "./PropertiesForm";

interface Props {
  className?: string;

  step: number;
  setStep: (step: number) => void;
}
const Contact = (props: Props) => {
  const {
    register,
    formState: { errors },
    control,
    trigger,
  } = useFormContext<AddPropertyType>();
  return (
    <>
      <Card
        className={cn(
          ` " ",${props.className} ${props.step !== 4 && "hidden"}`
        )}
      >
        <div className="p-4 flex flex-col gap-y-4">
          <Input
            {...register("contact.name", {
              required: "Contact Name is required",
            })}
            errorMessage={errors.contact?.name?.message}
            isInvalid={!!errors.contact?.name}
            label="Contact Name"
          >
            {" "}
          </Input>
          <Input
            {...register("contact.phone", {
              required: "Contact Phone is required",
            })}
            errorMessage={errors.contact?.phone?.message}
            isInvalid={!!errors.contact?.phone}
            label="Phone"
          >
            {" "}
          </Input>
          <Input
            {...register("contact.email", {
              required: "Contact email is required",
            })}
            errorMessage={errors.contact?.email?.message}
            isInvalid={!!errors.contact?.email}
            label="Email"
          >
            {" "}
          </Input>
        </div>
      </Card>
      <div
        className={`flex justify-end gap-x-4 mt-4 ${
          props.step !== 4 && "hidden"
        }`}
      >
        <Button
          isDisabled={props.step === 0}
          onClick={() => props.setStep(props.step - 1)}
          startContent={<ChevronLeftIcon className="w-6" />}
        >
          Previous
        </Button>
        <Button
          endContent={<ChevronRightIcon className={cn(`w-6`)} />}
          className="bg-secondary-400 text-white"
          type="submit"
          onClick={async () => {
            if (
              await trigger(["contact.name", "contact.phone", "contact.email"])
            ) {
              console.log("masuk");
            }
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default Contact;
