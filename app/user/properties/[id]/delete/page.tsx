import SubmitButton from "@/app/components/SubmitButton";
import { deleteProperty } from "@/lib/actions/property";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  params: { id: string };
}
const DeletePage = async ({ params }: Props) => {
  const { getUser } = getKindeServerSession();
  const propertyPromise = prisma.property.findUnique({
    where: {
      PId: +params.id,
    },
  });

  const deleteAction = async () => {
    "use server";
    try {
      await deleteProperty(+params.id);
    } catch (e) {
      console.log(e);
    }
    redirect("/user/properties");
    window.location.reload();
  };

  const [property, user] = await Promise.all([propertyPromise, getUser()]);
  if (!property || !user || property.userId != user.id) {
    return redirect("/unauthorized");
  } else {
    return (
      <form
        action={deleteAction}
        className="mt-9 flex flex-col items-center justify-center gap-2"
      >
        <p className="font-bold">
          Are you sure you want to delete the property?
        </p>
        <p>
          (<span className="text-slate-700">Name : </span>{" "}
          <span className="text-slate-700">{property.name}</span>)
        </p>
        <div className="flex gap-x-5">
          <SubmitButton type="submit" color="danger" variant="light">
            {" "}
            Okay{" "}
          </SubmitButton>
          <Link
            href={`/user/properties`}
            className="bg-slate-400 text-white rounded-md px-3 py-2 "
          >
            {" "}
            Cancel{" "}
          </Link>
        </div>
      </form>
    );
  }
};

export default DeletePage;
