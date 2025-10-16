import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";

import ProductItem from "@/components/ui/common/product-item";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <div className="space-y-6 px-5">
      <h2 className="text-xl font-semibold">{category.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            textContainerClassName="max-w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
