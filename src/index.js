import React from "react";
// import ReactDOM from "react-dom";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./fonts/Termina-W05-Bold.ttf";
import { AuthProvider } from "./context/AuthProvider";
import { AppProvider } from "./context/AppProvider";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const PUBLIC_KEY =
//   "pk_test_51LJ13iSBBRZ3ptVuedxQAF2PMeHOOwAthU0tCE3sppgfuJbTWMMQPqEfGr1J7VTjKcb4m3eZhbwQnEmKagtiy9tA008AkDQABX";

// const stripeTestPromise = loadStripe(PUBLIC_KEY);

// const options = {
//   // passing the client secret obtained from the server
//   clientSecret: "{{CLIENT_SECRET}}",
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Elements stripe={stripeTestPromise}> */}
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
    {/* </Elements> */}
  </React.StrictMode>
);
