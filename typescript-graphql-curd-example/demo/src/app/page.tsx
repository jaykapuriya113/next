"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchText) {
      const route = `/testt/${searchText}`;
      router.push(route);
    }
  };

  return (
    <div>
      <TextField
        label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Link href="/page">
        <Button>Go to CURD Page</Button>
      </Link>
    </div>
  );
};

export default Home;
