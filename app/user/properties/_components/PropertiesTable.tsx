"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Prisma, Property } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type PropertiesTableProps = {
  totalPages: number;
  currentPage: number;
  properties: Prisma.PropertyGetPayload<{
    include: {
      PropertyType: true;
      PropertyStatus: true;
    };
  }>[];
};

const PropertiesTable = ({
  properties,
  totalPages,
  currentPage,
}: PropertiesTableProps) => {
  const router = useRouter();
  console.log(totalPages);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.PId}>
              <TableCell>{property.name}</TableCell>
              <TableCell>{property.price}</TableCell>
              <TableCell>{property.PropertyType?.value}</TableCell>
              <TableCell>
                <span
                  className={
                    property.PropertyStatus?.value === "Sold"
                      ? "bg-green-200 px-2 py-1 rounded"
                      : property.PropertyStatus?.value === "Under Contract"
                      ? "bg-yellow-200 px-2 py-1 rounded"
                      : "bg-red-200 px-2 py-1 rounded"
                  }
                >
                  {property.PropertyStatus?.value}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-x-4">
                  <Tooltip content="Details">
                    <Link href={`/user/property/${property.PId}`}>
                      <EyeIcon className="w-5 text-blue-500" />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit" color="warning">
                    <Link href={`/user/properties/${property.PId}/edit`}>
                      <PencilIcon className="w-5 text-yellow-500 " />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Delete" color="danger">
                    <Link href={`/user/properties/${property.PId}/delete`}>
                      <TrashIcon className="w-5 text-red-500" />
                    </Link>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => router.push(`/user/properties?pageNum=${page}`)}
        className="flex w-full justify-end mt-4"
      />
    </div>
  );
};

export default PropertiesTable;
