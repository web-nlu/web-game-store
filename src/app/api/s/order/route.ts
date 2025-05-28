import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/orders/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ order: data, message }), {status: res.status});
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ message: "Lỗi kết nối đến server." }), {status: 500})
  }
}