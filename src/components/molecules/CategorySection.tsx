import {HomeCategory} from "@/types/category";
import CategoryButton from "@/components/atoms/CategoryButton";

export default function CategorySection() {
  const categories : HomeCategory[] = ['Computer', 'Audio', 'Stationery', 'Book', 'Appliance', 'Mobility'];

  return (
    <div className="flex gap-6">
      {categories.map(category => (
        <CategoryButton category={category} key={category}/>
      ))}
    </div>
  )
}