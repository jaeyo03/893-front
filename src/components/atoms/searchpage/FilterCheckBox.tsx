"use client"

interface FilterCheckBoxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (value : string, checked : boolean) => void;
}

export default function FilterCheckBox({ id, name, label, checked, onChange }: FilterCheckBoxProps) {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input 
          type="checkbox" 
          value={id} 
          id={id} 
          name={name} 
          className="peer cursor-pointer appearance-none h-4 w-4 border-2 border-[#E8ECEF] rounded bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none"
          checked={checked}
          onChange={(e) => onChange(e.target.value, e.target.checked)}
        />
        <svg
          className="absolute left-0 top-0 fill-white w-4 h-4 pointer-events-none hidden peer-checked:block" 
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      <label htmlFor={id} className="cursor-pointer pl-2 text-[#121212]">{label}</label>
    </div>
  )
}