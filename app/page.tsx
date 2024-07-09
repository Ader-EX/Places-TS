import prisma from "@/lib/prisma";
import React from "react";
import PropertyCard from "./user/properties/add/_components/PropertyCard";
import PropertyContainer from "./user/properties/add/_components/PropertyContainer";
import Search from "./user/properties/add/_components/Search";
const PAGE_SIZE = 4;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Home = async ({ searchParams }: Props) => {
  const pageNum = searchParams.pageNum ?? 0;

  let query = (searchParams.search as string) ?? "";

  const properties = await prisma.property.findMany({
    select: {
      PId: true,
      name: true,
      description: true,
      price: true,
      location: {
        select: {
          city: true,
          state: true,
        },
      },

      images: {
        select: {
          url: true,
        },
      },
    },
    ...(!!query && { where: { name: { contains: String(query) } } }),
    skip: +pageNum * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const count = await prisma.property.count({
    ...(!!query && { where: { name: { contains: String(query) } } }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  console.log(pageCount, "pageCount");
  return (
    <div>
      <Search />
      <PropertyContainer totalPages={pageCount} currentPage={+pageNum + 1}>
        {properties.map((property) => (
          <PropertyCard property={property} key={property.PId} />
        ))}
      </PropertyContainer>
    </div>
  );
};

export default Home;
