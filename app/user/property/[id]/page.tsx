import PageTitle from "@/app/components/pageTitle";
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ImageGrid from "./components/ImageGrid";
interface Props {
  params: {
    id: string;
  };
}

const PropertyDetail = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      PId: +params.id,
    },
    include: {
      PropertyType: true,
      PropertyStatus: true,
      feature: true,
      images: true,
      contact: true,
      location: true,
    },
  });
  if (!property) {
    return notFound();
  }
  console.log(property.images);
  return (
    <div className="p-4">
      <PageTitle
        title="Property Detail"
        href="/"
        linkCaption="Back to properties"
      ></PageTitle>
      <div className="p-4">
        <h2 className="text-3xl font-bold text-blue-500 my-5">
          {property.name}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <div className="flex gap-4">
              <ImageGrid images={property.images} />
              {/* {property.images.map((image) => (
                <Image
                  key={image.id}
                  src={image.url}
                  alt={property.name}
                  width={400}
                  height={400}
                  className="w-1/3 h-1/3"
                />
              ))} */}
            </div>
          </div>
          <Card className="p-4 flex flex-col gap-1">
            <DetailComponent title="Property Details" />
            <AttributesComponent
              label="Bedrooms"
              value={property.feature?.bedrooms ?? 1}
            />
            <AttributesComponent
              label="Bathrooms"
              value={property.feature?.bathrooms ?? 1}
            />
            <AttributesComponent
              label="Parking Spots"
              value={property.feature?.parkingSpot ?? 1}
            />
            <AttributesComponent
              label="Area"
              value={property.feature?.area ?? 1}
            />
            <DetailComponent title="Address" className="mt-7" />
            <AttributesComponent
              label="Citty"
              value={property.location?.city ?? 1}
            />
            <AttributesComponent
              label="Landmark"
              value={property.location?.landmark ?? 1}
            />
            <AttributesComponent
              label="Zip Code"
              value={property.location?.zipCode ?? 1}
            />
            <AttributesComponent
              label="Address"
              value={property.location?.streetAddress ?? 1}
            />

            <DetailComponent title="Owner Details" className="mt-7" />
            <AttributesComponent
              label="Contact Name"
              value={property.contact?.name ?? 1}
            />
            <AttributesComponent
              label="Phone"
              value={property.contact?.phone ?? 1}
            />
            <AttributesComponent
              label="Email"
              value={property.contact?.email ?? 1}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

const DetailComponent = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <div className={className}>
    <h2 className="text-xl font-bold text-blue-500">{title}</h2>
    <hr className="my-2" />
  </div>
);

const AttributesComponent = ({
  label,
  value,
}: {
  label: string | number;
  value: string | number | boolean;
}) => (
  <div className="flex justify-between">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm text-slate-600">{value}</span>
  </div>
);
