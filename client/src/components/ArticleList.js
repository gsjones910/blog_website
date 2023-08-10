import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/articles`,
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, []);

  return (
    <div>
      <h2>List of articles</h2>
      <div style={{display:"flex", flexWrap:"wrap"}}>
        {articles.map((article) => (
            <BlogCard article={article} key={article._id} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
