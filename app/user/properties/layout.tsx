import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
interface Props {
  children: React.ReactNode;
  modalDelete: React.ReactNode;
}
const PropertiesLayout = ({ children, modalDelete }: Props) => {
  return (
    <div className="p-8">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="font-semibold text-xl text-primary-500">
          User Properties
        </h2>
        <Link href={"properties/add"}>
          <Button color="primary">
            <PlusCircleIcon className="w-6 text-white" />
            Add Property
          </Button>
        </Link>
      </div>
      {children}
      {modalDelete}
    </div>
  );
};

export default PropertiesLayout;
