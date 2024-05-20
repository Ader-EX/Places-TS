"use server";
import { AddPropertyType } from "@/app/user/properties/add/_components/PropertiesForm";
import prisma from "../prisma";
import { Property } from "@prisma/client";

export async function saveProperty(
  propertyData: AddPropertyType,
  imageUrls: string[],
  userId: string
) {
  const basic: Omit<Property, "PId"> = {
    name: propertyData.title,
    description: propertyData.description,
    price: propertyData.price,
    propertyTypeId: propertyData.type,
    propertyStatusId: propertyData.status,
    userId: userId,
  };
  const result = await prisma.property.create({
    data: {
      ...basic,
      location: {
        create: {
          streetAddress: propertyData.location.street,
          zipCode: propertyData.location.zip,
          city: propertyData.location.city,
          state: propertyData.location.state,
          region: propertyData.location.region,
          landmark: propertyData.location.landmark,
        },
      },
      feature: {
        create: {
          bedrooms: propertyData.features.bedrooms,
          bathrooms: propertyData.features.bathrooms,
          parkingSpot: propertyData.features.parkingSpots,
          area: propertyData.features.area,
          hasSwimmingPool: propertyData.features.hasSwimmingPool ?? false,
          hasBalcony: propertyData.features.hasBalcony ?? false,
          hasGarden: propertyData.features.hasGarden ?? false,
        },
      },
      contact: {
        create: {
          name: propertyData.contact.name,
          phone: propertyData.contact.phone.toString(),
          email: propertyData.contact.email,
        },
      },
      images: {
        createMany: {
          data: imageUrls.map((url) => ({ url: url })),
        },
      },
    },
  });
  console.log(result);
  return result;
}

export async function updateProperty(
  propertyId: number,
  propertyData: AddPropertyType,
  newImageUrls: string[],

  deletedImageIds: number[]
) {
  const result = await prisma.property.update({
    where: {
      PId: Number(propertyId),
    },
    data: {
      name: propertyData.title,
      price: propertyData.price,
      description: propertyData.description,
      propertyStatusId: propertyData.status,
      propertyTypeId: propertyData.type,

      location: {
        update: {
          streetAddress: propertyData.location.street,
          zipCode: propertyData.location.zip,
          city: propertyData.location.city,
          state: propertyData.location.state,
          region: propertyData.location.region,
          landmark: propertyData.location.landmark,
        },
      },
      feature: {
        update: {
          bedrooms: propertyData.features.bedrooms,
          bathrooms: propertyData.features.bathrooms,
          parkingSpot: propertyData.features.parkingSpots,
          area: propertyData.features.area,
          hasSwimmingPool: propertyData.features.hasSwimmingPool ?? false,
          hasBalcony: propertyData.features.hasBalcony ?? false,
          hasGarden: propertyData.features.hasGarden ?? false,
        },
      },
      contact: {
        update: {
          name: propertyData.contact.name,
          phone: propertyData.contact.phone.toString(),
          email: propertyData.contact.email,
        },
      },
      images: {
        create: newImageUrls.map((url) => ({ url: url })),

        deleteMany: {
          id: { in: deletedImageIds },
        },
      },
    },
  });
  console.log(result);
  return result;
}

export async function deleteProperty(propertyId: number) {
  // Delete the related records
  await prisma.propertyImage.deleteMany({
    where: {
      propertyId: propertyId,
    },
  });

  await prisma.propertyLocation.deleteMany({
    where: {
      propertyId: propertyId,
    },
  });

  await prisma.propertyFeature.deleteMany({
    where: {
      propertyId: propertyId,
    },
  });

  await prisma.contact.deleteMany({
    where: {
      propertyId: propertyId,
    },
  });

  // Then delete the property
  const result = await prisma.property.delete({
    where: {
      PId: propertyId,
    },
  });

  console.log(result);
  return result;
}
