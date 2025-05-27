import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  try {
    const header = req.headers;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/user/me`, {
      method: 'GET',
      headers: {
        'Authorization': header.get('Authorization') ?? '',
        'Content-Type': 'application/json'
      }
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ user: data, message }), { status: res.status });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}