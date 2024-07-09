"use client";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  totalPages: number;
  currentPage: number;

  route?: string;
}

const PaginationContainer = ({
  currentPage,
  totalPages,

  route = "/",
}: Props) => {
  const router = useRouter();
  if (totalPages <= 1) return null;
  return (
    <Pagination
      total={totalPages}
      initialPage={1}
      page={currentPage}
      onChange={(page) => {
        console.log(page);

        router.push(`${route}?pageNum=${page - 1}`);
      }}
    />
  );
};

export default PaginationContainer;
