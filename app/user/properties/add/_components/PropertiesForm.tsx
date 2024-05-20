"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";
import { Button } from "@nextui-org/react";
import BasicForm from "./basic";
import {
  Prisma,
  Property,
  PropertyImage,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";
import Location from "./Location";
import Features from "./Features";
import AddImage from "./AddImage";
import Contact from "./Contact";
import { z } from "zod";
import { AddPropertySchema } from "@/lib/zodSchema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadImages } from "@/lib/upload";
import { saveProperty, updateProperty } from "@/lib/actions/property";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const steps = [
  { label: "Basic" },
  { label: "Location" },
  { label: "Features" },
  { label: "Photos" },
  { label: "Contact" },
];
interface Props {
  types: PropertyType[];
  statuses: PropertyStatus[];
  property?: Prisma.PropertyGetPayload<{
    include: {
      location: true;
      feature: true;
      images: true;
      contact: true;
    };
  }>;
  isEdit?: boolean;
  myId?: number;
}

export type AddPropertyType = z.infer<typeof AddPropertySchema>;

const PropertiesForm = ({ isEdit = false, ...props }: Props) => {
  console.log(props);
  const methods = useForm<AddPropertyType>({
    resolver: zodResolver(AddPropertySchema),
    defaultValues: {
      contact: props.property?.contact ?? undefined,
      location: props.property?.location ?? undefined,
      description: props.property?.description ?? "",
      features: props.property?.feature ?? undefined,
      price: props.property?.price ?? 0,
      status: props.property?.propertyStatusId ?? undefined,
      title: props.property?.name ?? "",
      type: props.property?.propertyTypeId ?? undefined,
    },
  });
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(
    props.property?.images ?? []
  );

  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const formHandleSubmit: SubmitHandler<AddPropertyType> = async (data) => {
    console.log(data);
    console.log(images);
    const imageUrl = await UploadImages(images);
    console.log(imageUrl);
    console.log(user);
    console.log(props.myId?.toString()!);

    try {
      if (isEdit && props.property) {
        const deletedImageIds = props.property?.images
          .filter((img) => !savedImagesUrl.includes(img))
          .map((img) => img.id);
        await updateProperty(
          props.property?.PId!,
          data,
          imageUrl,
          deletedImageIds || []
        );
        toast.success("Property updated successfully");
      } else {
        await saveProperty(data, imageUrl, user?.id!);
        toast.success("Property added successfully");
      }

      router.push("/user/properties");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add property");
    }
  };

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <FormProvider {...methods}>
        <form
          className="mt-4 p-2"
          onSubmit={methods.handleSubmit(formHandleSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <BasicForm
            step={step}
            setStep={setStep}
            types={props.types}
            statuses={props.statuses}
          />
          <Location step={step} setStep={setStep} />
          <Features step={step} setStep={setStep} />
          <AddImage
            step={step}
            setStep={setStep}
            images={images}
            setImages={setImages}
            {...(props.property!! && {
              savedImagesUrl: savedImagesUrl,
              setSavedImagesUrl: setSavedImagesUrl,
            })}
          />
          <Contact step={step} setStep={setStep} />
          <Button type="submit" className="mt-4">
            Save
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PropertiesForm;
