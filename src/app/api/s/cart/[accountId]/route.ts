import {NextRequest, NextResponse} from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> }
) {
  try {
    const token = req.cookies.get("token")?.value;
    const { accountId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/cart/remove/${accountId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const {message} = await res.json();
    return new NextResponse(JSON.stringify({ message }), {status: res.status});
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}