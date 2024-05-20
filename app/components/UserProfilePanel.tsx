"use client";
import React from "react";
import { User as prismaUser } from "@prisma/client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
interface Props {
  user: prismaUser;
}
const UserProfilePanel = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src:
              user.avatarUrl ??
              "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          className="transition-transform "
          description={user.email}
          name={user.firstName + " " + user.lastName}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem>
          <Link href={"/user/profile"}>My Profile</Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={"/user/properties"}>My Properties</Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <LogoutLink>Logout</LogoutLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfilePanel;
