import React from "react";
import ArticleList from "./ArticleList";
import { Button } from "antd";

const Home = () => {
  const createHandle = () => {
    window.location.href = "/article/upload";
  };

  return (
    <div style={{margin:"20px"}}>
      <h1>Blogging website</h1>
      <Button
        type="primary"
        onClick={createHandle}
        className="login-form-button"
      >
        Create New Blog
      </Button>
      <div>
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
