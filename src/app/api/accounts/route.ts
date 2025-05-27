import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
      const searchParams = req.nextUrl.searchParams

      if(!searchParams.get("page")) {
        searchParams.set("page", "1");
      }
      if(!searchParams.get("size")) {
        searchParams.set("size", "30");
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/accounts/u/filter-lazyloading?${searchParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const {data, message} = await res.json();

      return new NextResponse(JSON.stringify({ accounts: data.content ?? [], message }), {status: res.status});
    } catch (error) {
      return new NextResponse(JSON.stringify({ accounts: [], message: (error as Error).message }), { status: 500 });
    }
}