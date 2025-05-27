import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/cart/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ ...data }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}