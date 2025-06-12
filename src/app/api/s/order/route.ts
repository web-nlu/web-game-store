import {NextRequest, NextResponse} from "next/server";
import {getCookie} from "@/utils";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const header = req.headers;
    const searchParams = req.nextUrl.searchParams
    const session = await getServerSession(authOptions);
    if(!searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    if(!searchParams.get("size")) {
      searchParams.set("size", "20");
    }
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "") || session?.accessToken;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/orders/filter?${new URLSearchParams(searchParams)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ orders: data, message }), {status: res.status});
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ orders: [], message: "Lỗi kết nối đến server." }), {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    const header = req.headers;
    const token = req.cookies.get("token")?.value || getCookie("token", header.get("Set-Cookie") ?? "");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/orders/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })

    const {data, message} = await res.json();

    return new NextResponse(JSON.stringify({ order: data, message }), {status: res.status});
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({ message: "Lỗi kết nối đến server." }), {status: 500})
  }
}