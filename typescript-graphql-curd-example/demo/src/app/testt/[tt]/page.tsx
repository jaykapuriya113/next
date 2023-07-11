"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  console.log(router.query.slug);
  const searchText = router.query;
  return (
    <div>
      <h2>TESTT</h2>
      <h2>{searchText}</h2>
      <img
        src="https://cdn.pixabay.com/photo/2019/04/04/15/17/smartphone-4103051_1280.jpg"
        alt="Smartphone"
        width="800"
        height="533"
      ></img>
    </div>
  );
};

export default page;
