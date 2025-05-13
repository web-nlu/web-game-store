import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch('http://localhost:8080/api/auth/u/login', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(res);
    if(res.ok) {
      const { data } = await res.json()
      const { accessToken, refreshToken } = data
      return NextResponse.json({ accessToken, refreshToken });
    }
    return new NextResponse(
      JSON.stringify({ success: false, message: "Sai email hặc mật khẩu!" }),
      { status: 400 }
    )

  } catch (error) {
    return new NextResponse(JSON.stringify({success: false, message: 'Lỗi kết nối đến server.' }), { status: 500 });
  }
}