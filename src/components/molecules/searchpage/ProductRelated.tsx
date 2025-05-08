import RelatedWordButton from "../../atoms/RelatedWordButton";

export default function ProductRelated() {
  return (
    <div className="flex gap-2 items-center">
      <div className="font-bold">
        연관
      </div>
      <RelatedWordButton/>
    </div>
  )
}