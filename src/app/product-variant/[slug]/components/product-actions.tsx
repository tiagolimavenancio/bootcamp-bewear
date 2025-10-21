"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import AddToCartButton from "@/app/product-variant/[slug]/components/add-to-cart-button";
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <div className="h3 font-medium">Quantity</div>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full" size="lg">
          Buy now
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
