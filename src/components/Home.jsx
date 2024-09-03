import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
     <div className="custom-border"> 
      <h1>Send SMS from the Web</h1>
      <p>Join thousands of companies and start sending your text messages today!</p>

     
        
        <Link to="/chat" className="chunmun"> Start chat </Link>
    
      {/* <button>
        {" "}
        <Link to="/admin"> admin </Link>
      </button> */}
      </div>
    </div>
  );
};

export default Home;
