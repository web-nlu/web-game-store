import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`http://localhost:8080/api/auth/u/refresh-token`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if(!res.ok) return new NextResponse(JSON.stringify({success: false}), { status: 401 });
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ success: true, ...data }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({success: false}), { status: 500 });
  }
}