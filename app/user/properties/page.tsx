import React from "react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import PropertiesTable from "./_components/PropertiesTable";
interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PropertiesPage = async ({ searchParams }: Props) => {
  const { getUser } = await getKindeServerSession();

  if (!getUser) {
    return <div>Not authenticated</div>;
  }

  const user = await getUser();
  const pageNum = searchParams.pageNum ?? 1;
  const pageSize = 3;

  const propertyPromise = prisma.property.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      PropertyType: true,
      PropertyStatus: true,
    },
    skip: (Number(pageNum) - 1) * Number(pageSize),
    take: Number(pageSize),
  });

  const totalProperties = prisma.property.count({
    where: {
      userId: user?.id,
    },
  });

  const [properties, counterProperty] = await Promise.all([
    propertyPromise,
    totalProperties,
  ]);

  console.log(counterProperty);
  return (
    <div>
      <PropertiesTable
        properties={properties}
        totalPages={Math.ceil(counterProperty / pageSize)}
        currentPage={Number(pageNum)}
      />
    </div>
  );
};

export default PropertiesPage;
