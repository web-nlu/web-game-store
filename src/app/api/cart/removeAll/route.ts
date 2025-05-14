import {NextRequest, NextResponse} from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const res = await fetch(`http://localhost:8080/api/cart/remove-all`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    if(!res.ok) return new NextResponse(JSON.stringify({ success: false }), { status: res.status });
    return new NextResponse(JSON.stringify({ success: true }), {status: 200});
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ success: false }), { status: 500 });
  }
}