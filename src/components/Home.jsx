import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <h1>Welcome to my home page</h1>
      <p>This is a paragraph of text.</p>

      <button>
        {" "}
        <Link to="/chat"> Start chat </Link>
      </button>
      {/* <button>
        {" "}
        <Link to="/admin"> admin </Link>
      </button> */}
    </div>
  );
};

export default Home;
