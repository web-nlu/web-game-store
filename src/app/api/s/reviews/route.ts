import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getCookie} from "@/utils";

export async function POST(req: NextRequest) {
  try {
    const header = req.headers;
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "") || session?.accessToken;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })

    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ review: data, message }), {status: res.status});
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ review: null, message: "Lỗi kết nối đến server." }), {status: 500})
  }
}