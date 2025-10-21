import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

import ProductActions from "@/app/product-variant/[slug]/components/product-actions";
import VariantSelector from "@/app/product-variant/[slug]/components/variant-selector";
import ProductList from "@/components/ui/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Image
        src={productVariant.imageUrl}
        alt={productVariant.name}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full object-cover"
      />
      <div className="px-5">
        <VariantSelector
          variants={productVariant.product.variants}
          selectedVariantSlug={productVariant.slug}
        />
      </div>

      <div className="px-5">
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
        <h3 className="text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h3>
      </div>

      <ProductActions productVariantId={productVariant.id} />

      <div className="px-5">
        <p className="text-shadow-amber-600">
          {productVariant.product.description}
        </p>
      </div>

      <div className="py-5">
        <ProductList title="Maybe yoy like" products={likelyProducts} />
      </div>
    </div>
  );
};

export default ProductVariantPage;
