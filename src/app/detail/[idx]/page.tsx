// src/app/detail/[idx]/page.tsx (Server Component)
import { cookies } from "next/headers";
import DetailPageClient from "./DetailPageClient";

interface PageProps {
  params: { idx: string };
}

export default function Page({ params }: PageProps) {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.has("accessToken");

  return <DetailPageClient params={params} isLoggedIn={isLoggedIn} />;
}
