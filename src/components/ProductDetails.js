import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex justify-center items-start h-screen w-full text-white">
      <p className="mt-10">This is Product: {id}</p>
    </div>
  );
};

export default ProductDetails;
