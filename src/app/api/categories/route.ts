import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/category/u/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {data, message} = await res.json();
    return new NextResponse(JSON.stringify({ categories: data ?? [], message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ categories: [], message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}