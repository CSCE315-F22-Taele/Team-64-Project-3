import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Manager from './Pages/manager';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Server from './Pages/server';
import Customer from './Pages/customer';

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="manager" element={<Manager />}/>
      <Route path="server" element={<Server />}/>
      <Route path="customer" element={<Customer />}/>
    </Routes>
  </BrowserRouter>,
  // <App />,
  // <a>test</a>,
  document.getElementById("root")
);


