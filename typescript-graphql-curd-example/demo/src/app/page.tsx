"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home = () => {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (id) {
      const route = `/blog/${id}`;
      router.push(route);
    }
  };

  return (
    <div>
      <TextField
        label="Search"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button
        style={{ backgroundColor: "lightgrey", marginLeft: "20px" }}
        onClick={handleSearch}
      >
        Search
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <Link href="/page">
        <Button style={{ backgroundColor: "lightgrey" }}>
          <span>Go to CURD Page</span>
        </Button>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <Link href="/page/page1">
        <Button style={{ backgroundColor: "lightgrey" }}>
          <span>Go to Page1</span>
        </Button>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <Link href="/page/page2">
        <Button style={{ backgroundColor: "lightgrey" }}>
          <span>Go to Page2</span>
        </Button>
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <Link href="/page/page3">
        <Button style={{ backgroundColor: "lightgrey" }}>
          <span>Go to Page3</span>
        </Button>
      </Link>
    </div>
  );
};

export default Home;
