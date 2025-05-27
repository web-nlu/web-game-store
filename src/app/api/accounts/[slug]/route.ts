import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/accounts/u/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ account: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ account: null,  message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}