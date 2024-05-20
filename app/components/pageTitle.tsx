import Link from "next/link";
import React from "react";

interface Props {
  title?: string;
  href?: string;
  linkCaption?: string;
}

const PageTitle = (props: Props) => {
  return (
    <div className="p-6  flex gap-x-4">
      <h1 className="font-bold">{props.title} </h1>
      {props.href && (
        <Link href={props.href} className=" self-center opacity-60 text-sm">
          {props.linkCaption}
        </Link>
      )}
    </div>
  );
};

export default PageTitle;
