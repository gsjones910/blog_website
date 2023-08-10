import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetail = ({ match }) => {
  const [article, setArticle] = useState({});
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/article/${articleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/pay`,
        { articleId: article._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{margin:"20px"}}>
      <div onClick={() => window.history.back()}><ArrowLeftOutlined style={{marginRight:"10px"}}/>Back</div>
      <h2>{article.title}</h2>
      {article.isPay ? (
        <p>{article.content}</p>
      ) : (
        <div>
          <p>Payment is required to view the full content of this article.</p>
          <button onClick={handlePayment}>Make a payment</button>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
