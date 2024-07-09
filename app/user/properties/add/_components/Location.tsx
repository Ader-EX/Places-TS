import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Card, Input, Textarea, cn } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyType } from "./PropertiesForm";
interface Props {
  className?: string;

  step: number;
  setStep: (step: number) => void;
}
const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyType>();
  return (
    <>
      <Card
        className={cn(
          ` " ",${props.className} ${props.step !== 1 && "hidden"}`
        )}
      >
        <div className="p-4 flex flex-col gap-y-4">
          <Input
            label="Street"
            {...register("location.street", { required: "Street is required" })}
            errorMessage={errors.location?.street?.message}
            isInvalid={!!errors.location?.street}
            defaultValue={getValues().location?.street || ""}
          >
            {" "}
          </Input>
          <Input
            label="Zip/Postal Code"
            {...register("location.zip", { required: "Zipcode is required" })}
            errorMessage={errors.location?.zip?.message}
            isInvalid={!!errors.location?.zip}
            defaultValue={getValues().location?.zip || ""}
          >
            {" "}
          </Input>
          <Input
            label="City"
            {...register("location.city", { required: "Title is required" })}
            errorMessage={errors.location?.city?.message}
            isInvalid={!!errors.location?.city}
          >
            {" "}
          </Input>
          <Input
            label="State"
            {...register("location.state", { required: "Title is required" })}
            errorMessage={errors.location?.state?.message}
            isInvalid={!!errors.location?.state}
          >
            {" "}
          </Input>
          <Input
            label="Region"
            className="col-span-2"
            {...register("location.region", { required: "Title is required" })}
            errorMessage={errors.location?.region?.message}
            isInvalid={!!errors.location?.region}
          ></Input>
          <Textarea
            label="Landmark"
            className="col-span-2"
            {...register("location.landmark", {
              required: "Title is required",
            })}
            errorMessage={errors.location?.landmark?.message}
            isInvalid={!!errors.location?.landmark}
          ></Textarea>
        </div>
      </Card>
      <div
        className={`flex justify-end gap-x-4 mt-4 ${
          props.step !== 1 && "hidden"
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
          className="bg-primary-400 text-white"
          isDisabled={props.step === 4}
          onClick={async () => {
            if (
              await trigger([
                "location.street",
                "location.zip",
                "location.city",
                "location.state",
                "location.region",
                "location.landmark",
              ])
            ) {
              props.setStep(props.step + 1);
            }
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Location;
