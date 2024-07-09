"use client";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("search", value);
    else params.delete("search");
    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);
  return (
    <div className=" p-6  items-center w-full  justify-center">
      <h1 className="text-blue-500 text-2xl font-bold mb-4 text-center justify-center">
        Search
      </h1>
      <Input
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        className=" w-100 "
        defaultValue={searchParams.get("search") ?? ""}
        endContent={<MagnifyingGlassIcon className="w-6 h-6 self-center" />}
      />
    </div>
  );
};

export default Search;
