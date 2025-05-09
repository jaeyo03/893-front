"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function LoginPage() {
  async function getUserInfo() {
    const response = await fetch("http://localhost:8080/api/user-info");
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="grid">
      <Link href="http://localhost:8080/oauth2/authorization/google">
        로그인
      </Link>
      <Button onClick={getUserInfo}>사용자 정보 조회</Button>
    </div>
  )
}