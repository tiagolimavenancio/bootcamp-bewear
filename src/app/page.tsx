import Image from "next/image";

import CategorySelector from "@/components/ui/common/category-selector";
import ProductList from "@/components/ui/common/product-list";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <div className="space-y-6">
      <div className="px-5">
        <Image
          src="/banner-01.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <ProductList products={products} title="Mais vendidos" />

      <div className="px-5">
        <CategorySelector categories={categories} />
      </div>

      <div className="px-5">
        <Image
          src="/banner-02.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <ProductList products={products} title="Novos produtos" />
    </div>
  );
};

export default Home;
