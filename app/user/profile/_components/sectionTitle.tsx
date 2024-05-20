import React from "react";

interface Props {
  title: string;
}
const SectionTitle = (props: Props) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-cyan-500">{props.title}</h1>
      <hr className="border-2 border-solid border-cyan-500 w-1/4 my-2" />
    </div>
  );
};

export default SectionTitle;
