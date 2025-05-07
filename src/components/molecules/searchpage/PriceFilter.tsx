export default function PriceFilter() {
  return (
    <div className="border-b-[1px] border-divider">
      <div className="flex justify-between items-center px-4 py-2">
        <label htmlFor="price" className="font-bold text-md">
          경매 시작가
        </label>
      </div>
      <div className="px-4 py-2">
        <input className="w-full" type="range" id="price" name="price" min="0" max="11" value="90" step="10"/>
      </div>
    </div>
  )
}