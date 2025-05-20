'use client'
import React, { useState, useEffect } from "react";
import {PayOSConfig, usePayOS} from "@payos/payos-checkout";
import Success from "@/components/payment/success";
import Fail from "@/components/payment/fail";
import Loading from "@/components/payment/loading";
const ProductDisplay = () => {
  const [success, setSuccess] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [loading, setLoading] = useState(true);
  const [payOSConfig, setPayOSConfig] = useState({
    RETURN_URL: process.env.NEXT_PUBLIC_FRONTEND_HOST,
    ELEMENT_ID: "embedded-payment-container",
    embedded: false,
    onSuccess: (event) => {
      setSuccess(true);
      setInProgress(false);
      setLoading(true);
      exit();
    },
    onCancel: (event) => {
      setSuccess(false);
      setInProgress(false);
    },
    onExit: (event) => {
      setSuccess(false);
      setInProgress(false);
    }
  } as PayOSConfig);

  const {open, exit} = usePayOS(payOSConfig);
  async function handleGetPaymentLink(){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/payos/create-embed-link`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      console.log("Server doesn't response");
    }

    const result = await response.json();
    setPayOSConfig((oldConfig) => ({
      ...oldConfig,
      CHECKOUT_URL: result.checkoutUrl,
    }));
  }

  useEffect(() => {
    handleGetPaymentLink().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (payOSConfig.CHECKOUT_URL != null) {
      open();
    }
  }, [payOSConfig]);
  return (
    <>
      {loading && <Loading />}
      {!inProgress && !success && <Fail />}
      {(!inProgress && success) && <Success/>}
      {(inProgress) && <div className="w-full">
          <div id="embedded-payment-container" className="h-[350px]"></div>
      </div>
      }
    </>
  );
};

export default function App() {
  return <ProductDisplay/>;
}