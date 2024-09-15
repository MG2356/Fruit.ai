import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To extract the id from the URL
// import "../Faq.css";
import { apiUrl } from "../utils/app.utils";
function FaqDetail() {
  const { id } = useParams(); // Extract the FAQ id from the route parameter
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Fetching product details for ID:", id); // Debugging ID from URL

    // Fetch product details based on the id
    axios
      .get(`${apiUrl}/faqs/${id}`)

      .then((response) => {
        console.log("Product data:", response.data); // Debugging API response
        setProduct(response.data); // Assuming response contains the product details
      })
      .catch((error) => {
        console.error("Error fetching product details: ", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Display a loading state while data is being fetched
  }

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.image} alt={product.question} />
      </div>
      <div className="product-details">
        <h2>{product.question}</h2>
        <p>{product.answer}</p>
        {/* Add other product details here */}
      </div>
    </div>
  );
}

export default FaqDetail;
