import SearchInput from "@/components/templates/SearchBox";
import QueryProvider from "@/components/QueryProvider";
import { cookies } from "next/headers";

export default async function SearchBoxWrapper() {
  const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')?.value;
	const isLoggedIn = accessToken ? true : false;

  return (
    <QueryProvider>
      <SearchInput isLoggedIn={isLoggedIn}/>
    </QueryProvider>
  )
}