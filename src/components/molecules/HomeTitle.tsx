import {ReactNode} from "react";

export default function HomeTitle({children}: {children: ReactNode}) {
  return (
    <div className="flex items-center text-[56px] font-bold justify-center">
      {children}
    </div>
  )
}