import PageTitle from "@/app/components/pageTitle";
import { getUserById } from "@/lib/actions/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, Card } from "@nextui-org/react";
import React from "react";
import SectionTitle from "./_components/sectionTitle";
import UploadAvatar from "./_components/UploadAvatar";

const Profile = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const dbUser = await getUserById(user ? user.id : "");
  return (
    <div className="p-4 flex justify-center flex-col">
      <PageTitle title="My Profile" href="/" linkCaption="Back to Homepage" />
      <Card className="p-4 m-4 flex flex-col gap-y-2">
        <SectionTitle title="Personal Information" />
        <div className="flex gap-x-4 items-center justify-start">
          <Avatar
            src={
              dbUser?.avatarUrl ??
              "https://i.pravatar.cc/150?u=a042581f4e29026024d"
            }
          />
          <UploadAvatar userId={dbUser?.id!} />
        </div>

        <Attributes
          title="Name"
          value={`${dbUser?.firstName}  ${dbUser?.lastName}`}
        />
        <Attributes title="Email" value={`${dbUser?.email}`} />
        <Attributes
          title="Registered On"
          value={`${dbUser?.createdAt.toLocaleDateString()}`}
        />
        <Attributes title="Properties Posted" value={`1`} />
      </Card>
    </div>
  );
};

export default Profile;

const Attributes = ({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p className="opacity-60">{value}</p>
    </div>
  );
};
