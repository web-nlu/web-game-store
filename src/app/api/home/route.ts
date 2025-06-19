import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/home/u`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ data: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ data: null, message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}