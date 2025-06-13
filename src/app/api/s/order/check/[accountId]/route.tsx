import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }) {
  try {
    const { accountId } = await params;
    const header = req.headers;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/orders/check/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': header.get('Authorization') ?? '',
      }
    })
    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ haveOrder: data, message }), {status: res.status});
  } catch (error) {
    return new NextResponse(JSON.stringify({ haveOrder: false,  message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}