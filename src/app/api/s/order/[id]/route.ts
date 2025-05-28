import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ order: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ order: null,  message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}