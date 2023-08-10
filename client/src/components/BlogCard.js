import React from "react";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const BlogCard = ({ article }) => {
  return (
    <a href={`/article/${article._id}`} style={{margin:"10px"}}>
      <Card
        style={{
          width: 240,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title={article.title}
          description={article.category}
        />
      </Card>
    </a>
  );
};
export default BlogCard;
