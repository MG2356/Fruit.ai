import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Faq.css";
import { apiUrl } from "../utils/app.utils";
function Faq() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get(`${apiUrl}/faqs`)
      .then((response) => {
        setFaqs(response.data); // Assuming the data comes as an array of FAQ items
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="app-container">
      {/* FAQ Section */}
      <div className="faq-section">
        <h1>FaQ Section</h1>
        <div className="faq-container">
        {faqs.map((faq, index) => (
  <FaqItem
    key={index}
    id={faq.id} // Ensure id is passed correctly here
    image={faq.image}
    imageName={faq.imageName}
    question={faq.question}
    answer={faq.answer}
  />
))}

        </div>
      </div>
    </div>
  );
}
function FaqItem({ id, image,imageName, question, answer }) {
  console.log("Passed ID to FaqItem:", id); // Debugging
  return (
    <Link to={`/faqs/${id}`}>
      <div className="faq-item">
        <div className="faq-image">
          <img src={image} alt={question} />
          
        </div>
        <div className="faq-imageName">
          <p>{imageName}</p>
        </div>
        <div className="faq-text">
          <h3>{question}</h3>
          <p>{answer}</p>
        </div>
      </div>
    </Link>
  );
}


export default Faq;
