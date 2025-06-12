'use client'
import React, {useState, useEffect, JSX} from "react";
import {PayOSConfig, usePayOS} from "@payos/payos-checkout";
import Success from "@/components/payment/success";
import Fail from "@/components/payment/fail";
import Loading from "@/components/payment/loading";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import {cancel} from "@/utils/checkout";

type Props = {
  params: ReadonlyURLSearchParams
}

const ProductDisplay = ({ params }: Props) => {
  const [success, setSuccess] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState({} as EventPayos);
  const [payOSConfig, setPayOSConfig] = useState({
    RETURN_URL: process.env.NEXT_PUBLIC_FRONTEND_HOST,
    ELEMENT_ID: "embedded-payment-container",
    embedded: false,
    onSuccess: (event: EventPayos) => {
      setCheckout(event);
      setSuccess(true);
      setInProgress(false);
    },
    onCancel: (event: EventPayos) => {
      cancel(params.get("orderCode")!);
      setCheckout(event);
      setSuccess(false);
      setInProgress(false);
    },
    onExit: (event: EventPayos) => {
      window.location.href = "/gio-hang"
    }
  } as PayOSConfig);

  const {open} = usePayOS(payOSConfig);
  async function handleGetPaymentLink(){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/payos/create-embed-link`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderCode: Number(String(Date.now()).slice(-6)),
          amount: parseFloat(params.get("totalPrice")!),
          description: params.get("orderCode")!
        })
      }
    );
    if (!response.ok) {
      window.location.href = "/gio-hang";
      return;
    }

    const result = await response.json();
    setPayOSConfig((oldConfig) => ({
      ...oldConfig,
      CHECKOUT_URL: result.checkoutUrl,
    }));
  }

  useEffect(() => {
    setLoading(true)
    handleGetPaymentLink().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (payOSConfig.CHECKOUT_URL != null && !loading) {
      open();
    }
  }, [payOSConfig, loading]);
  return (
    <>
      {loading && <Loading />}
      {!inProgress && !success && <Fail data={checkout} />}
      {(!inProgress && success) && <Success data={checkout}/>}
      {(inProgress) && <div className="w-full">
          <div id="embedded-payment-container" className="h-[350px]"></div>
      </div>
      }
    </>
  );
};

export default function App(): JSX.Element {
  const params = useSearchParams();
  useEffect(() => {
    if(!params.get("orderCode") || !params.get("totalPrice")) {
      window.location.href = "/"
      return;
    }
  }, []);

  return <ProductDisplay params={params} />;
}