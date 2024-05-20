"use client";
import Image from "next/image";
import { useState } from "react";

const ImageGrid = ({ images }: any) => {
  while (images.length < 5) {
    images = [...images, ...images];
  }

  images = images.slice(0, 5);
  const [bigImage, setBigImage] = useState(images[0]);

  const handleChangeImage = (image: any) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4">
      <div key={0}>
        <Image
          width={1000}
          height={1000}
          className="h-auto max-w-full rounded-lg"
          src={bigImage.url}
          alt=""
        />
      </div>
      <div className="flex gap-4">
        {images.slice(1).map((image: { url: string }, index: number) => (
          <div key={index + 1} onClick={() => handleChangeImage(image)}>
            <Image
              width={250}
              height={250}
              className="h-auto max-w-full rounded-lg hover:shadow-xl cursor-pointer"
              src={image.url}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
