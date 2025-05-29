'use client'

interface SortButtonProps {
  label: string;
  selected: boolean;
  onClick: (label: string) => void;
}

export default function SortButton({ label, selected, onClick }: SortButtonProps) {
  return (
    <button onClick={() =>onClick(label)} className={`${selected ? 'text-black font-semibold' : 'text-neutral-500'}`}>
      {label}
    </button>
  )
}