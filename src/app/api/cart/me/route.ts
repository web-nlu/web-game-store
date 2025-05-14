import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const res = await fetch(`http://localhost:8080/api/cart/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if(!res.ok) return new NextResponse(JSON.stringify({ success: false }), { status: res.status });
    const {data} = await res.json();
    return new NextResponse(JSON.stringify({ success: true, ...data }), {status: 200});
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false }), { status: 500 });
  }
}