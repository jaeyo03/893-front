import Image from "next/image";
import {HomeCategory} from "@/types/category";
import Link from "next/link";

export default function CategoryButton({ category } : {category : HomeCategory}) {
  const imageUrl : Record<HomeCategory, string> = {
    Computer: '/icons/Computer.svg',
    Audio: "/icons/Audio.svg",
    Stationery: "/icons/Stationery.svg",
    Book: "/icons/Book.svg",
    Appliance: "/icons/Appliance.svg",
    Mobility: "/icons/Mobility.svg",
  }

  const categoryWord : Record<HomeCategory, string> = {
    Computer : '전자기기',
    Audio : '오디오',
    Stationery : '문구류',
    Book : '도서',
    Appliance : '가전제품',
    Mobility : '이동장치',
  }

  return (
    <Link className="bg-[#F3F4F5] h-[141px] w-[155px] rounded-[12px] cursor-pointer p-2 grid gap-4" href={`/search?mainCategoryId=${category}`}>
      <Image
        src={imageUrl[category]}
        alt={`${category} icon`}
        height={64}
        width={64}
      />
      <div className="ml-2 font-bold text-base">{categoryWord[category]}</div>
    </Link>
  )
}