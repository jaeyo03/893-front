import RelatedWordButton from "../../atoms/RelatedWordButton";

export default function ProductRelated({ relatedWords }: { relatedWords: string[] }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="font-bold">
        연관
      </div>
      {relatedWords.map((word) => (
        <RelatedWordButton key={word} label={word} />
      ))}
    </div>
  )
}