import ReactDOM from "react-dom/client";
import Provider from "./Provider";
import Router from "./Router";
import Container from "./Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import Landing from '../src/Landing.jsx'
const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <Landing />

    <GoogleOAuthProvider clientId="637094275991-2f53f5g9ls2d34r05ugshhugb57ng4rm.apps.googleusercontent.com">
      <Provider>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Container>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Container>
      </Provider>
    </GoogleOAuthProvider>
  </HelmetProvider>
);
