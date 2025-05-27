import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/cart/add/${body.accountId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ ...data, message }), {status: res.status});
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}