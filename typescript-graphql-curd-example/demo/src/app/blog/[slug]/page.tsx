"use client";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const id = useParams();

  return (
    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
      <h2>{id && id.slug && <p>Name: {id.slug}</p>}</h2>
    </div>
  );
};
export default Page;
