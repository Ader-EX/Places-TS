import React, { useEffect, useState } from "react";
import PropertiesForm from "./_components/PropertiesForm";
import Stepper from "./_components/Stepper";
import prisma from "@/lib/prisma";

const AddPropertiesPage = async () => {
  const [propertyTypes, propertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ]);

  return (
    <div>
      <PropertiesForm statuses={propertyStatuses} types={propertyTypes} />
    </div>
  );
};

export default AddPropertiesPage;
