import { Button, Card, Image } from "@nextui-org/react";
import { Property } from "@prisma/client";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface PropertyCardProps {
  property: Prisma.PropertyGetPayload<{
    select: {
      PId: true;
      name: true;
      description: true;
      price: true;
      location: {
        select: {
          city: true;
          state: true;
        };
      };

      images: {
        select: {
          url: true;
        };
      };
    };
  }>;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="w-72 flex flex-col hover:scale-105 shadow-md">
      <Image
        radius="none"
        src={property.images[0].url}
        alt=""
        className="object-fill w-96 h-48"
      />
      <div className="p-4">
        <p className="text-blue-600 font-bold text-lg">{property.name}</p>
        <p className="text-slate-600">
          {property.location?.city} , {property.location?.state}
        </p>
        <div className="bg-gradient-to-br   w-full flex justify-between">
          <p className="self-center font-bold text-blue-600">
            ${property.price.toLocaleString()}
          </p>
          <Link href={`/user/property/${property.PId}`}>
            <Button className="text-white bg-blue-600 px-2 py-1 rounded-md transition-colors">
              Show Detail
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
