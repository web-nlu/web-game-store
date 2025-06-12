// app/providers.jsx
"use client"; // Đánh dấu đây là Client Component

import { SessionProvider } from "next-auth/react";
import {ReactNode} from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}