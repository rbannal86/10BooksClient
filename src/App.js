import React from "react";
import Main from "./Components/Main/Main";
import "./App.css";

function App() {
  return (
    <>
      <header className="app_header">
        <h1 className="app_header_title">10Books</h1>
        <h2 className="app_header_title">Only the most relevant books</h2>
      </header>
      <main>
        <Main />
      </main>
    </>
  );
}

export default App;
