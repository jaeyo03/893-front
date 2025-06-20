import type { BestCategoryGroup } from "@/lib/api/home";
import { getBestByCategory } from "@/lib/api/home";
import BestByCategoryClient from "./BestByCategoryClient";

export default async function BestByCategory() {
  const { data: bestByCategory }: { data: BestCategoryGroup[] } =
    await getBestByCategory();

  return (
      <BestByCategoryClient bestByCategory={bestByCategory} />
  );
}
