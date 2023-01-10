import React from "react";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../Login/Login";
import TodoList from "../Todo/TodoList";

const DATA_KEY = "keylogin";

const App = () => {

  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
              <Route path="/" element={<TodoList keyLogin={DATA_KEY} />} />
              <Route path="/login" element={<Login keyLogin={DATA_KEY} />} />
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
