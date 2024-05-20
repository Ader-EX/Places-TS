import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  Textarea,
  cn,
} from "@nextui-org/react";

import { PropertyStatus, PropertyType } from "@prisma/client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyType } from "./PropertiesForm";
interface StatusProps {
  className?: string;
  types: PropertyType[];
  statuses: PropertyStatus[];
  step: number;
  setStep: (step: number) => void;
}
const BasicForm = (props: StatusProps) => {
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
          ` "p-2 gap-3 ,${props.className} ${props.step !== 0 && "hidden"}`
        )}
      >
        <div className=" flex flex-col gap-y-4 p-4 w-full">
          <Input
            {...register("title", { required: "Title is required" })}
            label="Name"
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            placeholder="Enter title"
            className="md:col-span-3"
            defaultValue={getValues().title}
          />
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
            errorMessage={errors.description?.message}
            isInvalid={!!errors.description}
            label="Description"
            placeholder="Enter description"
            defaultValue={getValues().description}
          />
          <Select
            {...register("type")}
            errorMessage={errors.type?.message}
            isInvalid={!!errors.type}
            label="Type"
            selectionMode="single"
          >
            {props.types.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.value}
              </SelectItem>
            ))}
          </Select>
          <Select
            {...register("status", { required: "Status is required" })}
            errorMessage={errors.status?.message}
            isInvalid={!!errors.status}
            label="Status"
            selectionMode="single"
          >
            {props.statuses.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.value}
              </SelectItem>
            ))}
          </Select>
          <Input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            errorMessage={errors.price?.message}
            isInvalid={!!errors.price}
            label="Price"
            placeholder="Enter Price"
            className="md:col-span-3"
          />
        </div>
      </Card>
      <div
        className={`flex justify-end gap-x-4 mt-4 ${
          props.step !== 0 && "hidden"
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
              await trigger(["title", "description", "type", "status", "price"])
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

export default BasicForm;
