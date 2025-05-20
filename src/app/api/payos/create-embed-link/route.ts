import PayOS from "@payos/node";
import {NextResponse} from "next/server";

export async function POST() {
  const payOS = new PayOS(
    "796482f0-657c-4278-abe3-d415661098f4",
    "42ff7c76-55d6-4215-b756-34f042c79dd1",
    "cc145e97f6e707092dbe27a95ed8e564033c8fdeaa4a8d6cb8b3acedfa12a5e8"
  );

  const YOUR_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_HOST;
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: 10000,
    description: "Thanh toan don hang",
    returnUrl: `${YOUR_DOMAIN}`,
    cancelUrl: `${YOUR_DOMAIN}`,
  }
  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    return new NextResponse(JSON.stringify({...paymentLinkResponse}), {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({}), {status: 500})
  }
}