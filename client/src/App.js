import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ArticleDetail from "./components/ArticleDetail";
import ArticleUpload from "./components/ArticleUpload";
import HeaderComponent from "./components/HeaderComponent";
import MenuComponent from "./components/MenuComponent";
import { Layout } from "antd";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <MenuComponent collapsed={collapsed} />
      <Layout>
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route
              path="/article/upload"
              exact
              render={() => <ArticleUpload />}
            />
            <Route
              path="/article/:articleId"
              exact
              render={() => <ArticleDetail />}
            />
          </Switch>
        </Router>
      </Layout>
    </Layout>
  );
};

export default App;
