"use server";
import prisma from "@/lib/prisma";
import React from "react";
import PropertiesForm from "../../add/_components/PropertiesForm";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
  params: { id: string };
}
const EditPage = async ({ params }: Props) => {
  console.log(params);

  const [propertyStatuses, propertyTypes, property] = await Promise.all([
    prisma.propertyStatus.findMany(),
    prisma.propertyType.findMany(),
    prisma.property.findUnique({
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
    }),
  ]);

  console.log(propertyTypes, propertyStatuses, property);

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || property?.userId != user.id) {
    return redirect("/unauthorized");
  }

  if (!property) {
    return notFound();
  } else {
    return (
      <PropertiesForm
        property={property}
        types={propertyTypes}
        statuses={propertyStatuses}
        isEdit={true}
        myId={parseInt(params.id)}
      />
    );
  }
};

export default EditPage;
