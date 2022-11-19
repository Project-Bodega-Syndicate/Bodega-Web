import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const paymentEndpoint = "";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.confirmPayment({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(paymentEndpoint, {
          amount: 100,
          id,
        });
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  const CardElementOptions = {
    style: {
      base: {
        // iconColor: "#c4f0ff",
        color: "#e5e7eb",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        // ":-webkit-autofill": {
        //   color: "#fce883",
        // },
        "::placeholder": {
          color: "#ffffff",
        },
      },
      // invalid: {
      //   iconColor: "#FFC7EE",
      //   color: "#FFC7EE",
      // },
    },
    hidePostalCode: true,
  };

  return (
    <>
      {!success ? (
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <CardElement options={CardElementOptions} />
          <button
            className="p-2 mt-8 w-full h-12 text-white bg-neutral-700 rounded-md"
            disabled={!stripe}
          >
            Submit Details
          </button>
        </form>
      ) : (
        <div>
          <h2>Purchase Successful</h2>
        </div>
      )}
    </>
  );
}
