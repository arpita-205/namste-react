import ReactDOM from "react-dom/client";
import React from "react";
const Title = () => <h1 id="title">Title</h1>;
const App = () => {
  return (
    <div id="container">
      <Title />
      {Title()}
      <h1>hello</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
