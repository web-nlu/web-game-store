import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils";

export async function DELETE(req: NextRequest) {
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/cart/remove-all`, {
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