import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Card, Checkbox, Input, cn } from "@nextui-org/react";

import React from "react";
import { AddPropertyType } from "./PropertiesForm";
import { Controller, useFormContext } from "react-hook-form";
interface Props {
  className?: string;

  step: number;
  setStep: (step: number) => void;
}

const Features = (props: Props) => {
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
          ` " ",${props.className} ${props.step !== 2 && "hidden"}`
        )}
      >
        <div className="p-4 flex flex-col gap-y-4">
          <Input
            type="number"
            {...register("features.bathrooms", {
              required: "bathrooms is required",
              valueAsNumber: true,
            })}
            errorMessage={errors.features?.bathrooms?.message}
            isInvalid={!!errors.features?.bathrooms}
            label="Bathroom"
          >
            {" "}
          </Input>
          <Input
            type="number"
            {...register("features.bedrooms", {
              required: "Bedrooms is required",
              valueAsNumber: true,
            })}
            errorMessage={errors.features?.bedrooms?.message}
            isInvalid={!!errors.features?.bedrooms}
            label="Bedroom"
            {...register("features.bedrooms", {
              required: "Title is required",
            })}
          >
            {" "}
          </Input>
          <Input
            label="Parking Spot"
            type="number"
            {...register("features.parkingSpots", {
              required: "parkingSpots is required",
              valueAsNumber: true,
            })}
            errorMessage={errors.features?.parkingSpots?.message}
            isInvalid={!!errors.features?.parkingSpots}
          >
            {" "}
          </Input>
          <Input
            type="number"
            {...register("features.area", {
              required: "area is required",
              valueAsNumber: true,
            })}
            errorMessage={errors.features?.area?.message}
            isInvalid={!!errors.features?.area}
            label="Area"
          >
            {" "}
          </Input>
          <div className="flex items-center  col-span-2 gap-x-4 ">
            <Controller
              control={control}
              name="features.hasSwimmingPool"
              render={({ field }) => (
                <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
                  Has Swimming Pool
                </Checkbox>
              )}
            ></Controller>

            <Controller
              control={control}
              name="features.hasBalcony"
              render={({ field }) => (
                <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
                  Has Balcony
                </Checkbox>
              )}
            ></Controller>
            <Controller
              control={control}
              name="features.hasGarden"
              render={({ field }) => (
                <Checkbox onChange={field.onChange} onBlur={field.onBlur}>
                  Has Garden
                </Checkbox>
              )}
            ></Controller>
          </div>
        </div>
      </Card>
      <div
        className={`flex justify-end gap-x-4 mt-4 ${
          props.step !== 2 && "hidden"
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
                "features.bathrooms",
                "features.bedrooms",
                "features.parkingSpots",
                "features.area",
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

export default Features;
