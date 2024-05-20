import FileInput from "@/app/user/profile/_components/fileUpload";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Button, Card, Input, cn } from "@nextui-org/react";
import React from "react";
import PictureCard from "./PictureCard";
import { PropertyImage } from "@prisma/client";

interface Props {
  className?: string;

  step: number;
  images: File[];
  setImages: (images: File[]) => void;
  setStep: (step: number) => void;
  savedImagesUrl?: PropertyImage[];
  setSavedImagesUrl?: (images: PropertyImage[]) => void;
}

const AddImage = (props: Props) => {
  return (
    <>
      <Card
        className={cn(
          ` " ",${props.className} ${props.step !== 3 && "hidden"}`
        )}
      >
        <div className="p-4 flex flex-col gap-y-4">
          <FileInput
            onChange={(e) => {
              console.log("FileInput onChange event", e);
              props.setImages([(e as any).target.files[0], ...props.images]);
            }}
          ></FileInput>
          <div className="flex gap-3 flex-wrap">
            {props.setSavedImagesUrl!! &&
              props.savedImagesUrl!! &&
              props.savedImagesUrl?.map((image, i) => {
                return (
                  <PictureCard
                    onDelete={(item) =>
                      props.setSavedImagesUrl!! &&
                      props.setSavedImagesUrl(
                        props.savedImagesUrl!.filter(
                          (img) => img.id !== image.id
                        )
                      )
                    }
                    index={i}
                    key={image.id}
                    src={image.url}
                  />
                );
              })}
            {props.images.map((image, i) => {
              const srcUrl = URL.createObjectURL(image);
              return (
                <PictureCard
                  onDelete={(item) =>
                    props.setImages([
                      ...props.images.slice(0, item),
                      ...props.images.slice(item + 1),
                    ])
                  }
                  index={i}
                  key={i}
                  src={srcUrl}
                />
              );
            })}
          </div>
        </div>
      </Card>
      <div
        className={`flex justify-end gap-x-4 mt-4 ${
          props.step !== 3 && "hidden"
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
          onClick={() => props.setStep(props.step + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default AddImage;
