import {cookies} from "next/headers";

export async function getData({url, params = {}, next, cache}: { url: string, params?: any, next?: NextFetchRequestConfig, cache?: string }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/${url}?${new URLSearchParams(params)}`, {
      method: 'GET',
      next,
      headers: {
        Authorization: `Bearer ${token}`,
        cache: cache || 'no-cache',
      }
    })
    if(res.ok) {
      const {data} = await res.json();
      return data
    }
    if(res.status !== 401) {
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function postData({url, body = {}}: { url: string, body?: any }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        cache: 'no-cache',
      }
    })
    if(res.ok) {
      const {data} = await res.json();
      return data
    }

    if(res.status !== 401) {
      return false;
    }

    const isRefreshed = await fetch("/api/auth/refresh", {method: "POST"})
    if(isRefreshed) {
      return postData({url, body})
    }
    return false;
  } catch (error) {
    return false;
  }
}