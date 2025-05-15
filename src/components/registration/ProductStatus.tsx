import {
  productConditions,
  productConditionDescriptions,
} from "./constants/productConditions";

type ProductStatusProps = {
  value: number | null;
  onChange: (index: number) => void;
};

export default function ProductStatus({ value, onChange }: ProductStatusProps) {
  return (
    <div className="flex flex-col w-full max-w-md gap-6">
      <label className="text-resgisterchecktext font-thin font-[15px]">
        상품상태
      </label>
      <div className="flex flex-col gap-2">
        {productConditions.map((condition, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              id={`condition-${index}`}
              name="productCondition"
              className="sr-only"
              checked={value === index}
              onChange={() => onChange(index)}
            />
            <label
              htmlFor={`condition-${index}`}
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer
                ${
                  value === index
                    ? "bg-white border-main text-main"
                    : "border-resgistersubtext text-transparent"
                }
              `}
            >
              ✓
            </label>
            <label
              htmlFor={`condition-${index}`}
              className="text-resgistertext font-normal text-[16px] cursor-pointer"
            >
              {condition}
            </label>
            <span className="text-sm text-resgistersubtext font-normal font-[14px]">
              {productConditionDescriptions[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
