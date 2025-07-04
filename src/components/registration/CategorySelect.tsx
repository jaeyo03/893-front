"use client";

import { useEffect, useState } from "react";
import { getCategoryList } from "@/lib/api/search";

type Category = {
  id: number;
  name: string;
  parent_id: number | null;
};

type CategoryTree = Category & { children: CategoryTree[] };

export type CategoryValue = {
  id: number | null;
  mainCategory: string;
  subCategory: string;
  detailCategory: string;
};

type Props = {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
};

function buildCategoryTree(categories: Category[]): CategoryTree[] {
  const map = new Map<number, CategoryTree>();
  const roots: CategoryTree[] = [];

  categories.forEach((c) => map.set(c.id, { ...c, children: [] }));
  categories.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(c.parent_id);
      parent?.children.push(node);
    }
  });

  return roots;
}

function findById(
  tree: CategoryTree[],
  id: number | null | undefined
): CategoryTree | undefined {
  const stack = [...tree];
  while (stack.length) {
    const node = stack.pop()!;
    if (node.id === id) return node;
    stack.push(...node.children);
  }
  return undefined;
}

export default function CategorySelector({ value, onChange }: Props) {
  const [tree, setTree] = useState<CategoryTree[]>([]);

  const [step1, setStep1] = useState<CategoryTree | null>(null);
  const [step2, setStep2] = useState<CategoryTree | null>(null);
  const [step3, setStep3] = useState<CategoryTree | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoryList();
      if (res.code === 200 && res.data) {
        const converted: Category[] = res.data.map((c) => ({
          id: c.id,
          name: c.name,
          parent_id: c.parentId,
        }));
        setTree(buildCategoryTree(converted));
      } else {
        console.error("카테고리 불러오기 실패:", res.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (value.id && tree.length > 0) {
      const step3Node = findById(tree, value.id);
      const step2Node = findById(tree, step3Node?.parent_id);
      const step1Node = findById(tree, step2Node?.parent_id);

      setStep1(step1Node ?? null);
      setStep2(step2Node ?? null);
      setStep3(step3Node ?? null);
    }
  }, [value.id, tree]);

  useEffect(() => {
    if (step1 && !step2 && !step3) {
      onChange({
        id: null,
        mainCategory: step1.name,
        subCategory: "",
        detailCategory: "",
      });
    }
    if (step1 && step2 && !step3) {
      onChange({
        id: null,
        mainCategory: step1.name,
        subCategory: step2.name,
        detailCategory: "",
      });
    }
    if (step1 && step2 && step3) {
      onChange({
        id: step3.id,
        mainCategory: step1.name,
        subCategory: step2.name,
        detailCategory: step3.name,
      });
    }
  }, [step1, step2, step3]);

  return (
    <div className="flex w-full max-w-[1280px] h-[240px] border-none rounded overflow-hidden text-resgisterchecktext font-normal text-[13.125px]">
      {/* Step 1 */}
      <div
        className={`w-1/3 overflow-y-auto border border-solid rounded ${
          step1 ? " border-r" : ""
        } scrollbar-none`}
      >
        {tree.map((main) => (
          <div
            key={main.id}
            onClick={() => {
              setStep1(main);
              setStep2(null);
              setStep3(null);
            }}
            className={`px-4 py-2 cursor-pointer ${
              step1?.id === main.id
                ? "bg-divider font-semibold"
                : "hover:bg-divider"
            }`}
          >
            {main.name}
          </div>
        ))}
      </div>

      {/* Step 2 */}
      <div
        className={`w-1/3 overflow-y-auto scrollbar-none border-solid rounded ${
          step1 ? "border-r border" : ""
        }`}
      >
        {step1?.children?.map((sub) => (
          <div
            key={sub.id}
            onClick={() => {
              setStep2(sub);
              setStep3(null);
            }}
            className={`px-4 py-2 cursor-pointer ${
              step2?.id === sub.id
                ? "bg-divider font-semibold"
                : "hover:bg-divider"
            }`}
          >
            {sub.name}
          </div>
        ))}
      </div>

      {/* Step 3 */}
      <div
        className={`w-1/3 overflow-y-auto scrollbar-none border-solid rounded ${
          step1 && step2 ? "border-r border" : ""
        }`}
      >
        {step2?.children?.map((detail) => (
          <div
            key={detail.id}
            onClick={() => setStep3(detail)}
            className={`px-4 py-2 cursor-pointer ${
              step3?.id === detail.id
                ? "bg-divider font-semibold"
                : "hover:bg-divider"
            }`}
          >
            {detail.name}
          </div>
        ))}
      </div>
    </div>
  );
}
