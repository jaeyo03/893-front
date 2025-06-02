import { useState } from "react";
import { Check } from "lucide-react";
export default function SellerAgreementCheckbox({
  onChange,
}: {
  onChange: (checked: boolean) => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const handleChange = () => {
    const newAgreed = !agreed;
    setAgreed(newAgreed);
    onChange(newAgreed);
  };
  return (
    <div
      className="flex justify-center items-start gap-[4px] flex-shrink-0 
                 w-[728px] h-[60px] 
                 px-[120px] pt-[17px] pb-[18px] 
                 border-t border-b text-[#333] text-[14px]"
      style={{
        borderColor: "#DADEE5",
        borderTopWidth: "0.8px",
        borderBottomWidth: "0.8px",
      }}
    >
      <input
        type="checkbox"
        id="agree"
        checked={agreed}
        onChange={handleChange}
        className="hidden"
      />

      <label
        htmlFor="agree"
        className={`w-5 h-5 flex items-center justify-center cursor-pointer 
          rounded-[6px] 
          ${agreed ? "text-main" : "text-transparent"}
        `}
      >
        <Check
          className={`w-4 h-4 ${agreed ? "text-main" : "text-transparent"}`}
        />
      </label>

      <label
        htmlFor="agree"
        className="text-[15px] text-resgisterchecktext cursor-pointer ml-2 font-normal "
      >
        판매 정보가 실제 상품과 다를 경우, 책임은 판매자에게 있음을 동의합니다.
      </label>
    </div>
  );
}
