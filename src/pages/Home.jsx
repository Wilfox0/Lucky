import React from "react";
import Products from "./Products";

const Home = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">المنتجات المميزة</h1>
      <Products />
    </div>
  );
};

export default Home;
