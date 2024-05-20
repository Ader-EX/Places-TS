import { TrashIcon } from "@heroicons/react/16/solid";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
interface Props {
  src: string;
  index: number;
  onDelete: (index: number) => void;
}

const PictureCard = (props: Props) => {
  return (
    <Card className="flex flex-col items-center p-2">
      <Image
        src={props.src}
        width={40}
        height={40}
        alt=""
        className="w-36 h-36 object-contain"
      />

      <button onClick={() => props.onDelete(props.index)}>
        <TrashIcon className="text-danger-600 w-4" />
      </button>
    </Card>
  );
};

export default PictureCard;
