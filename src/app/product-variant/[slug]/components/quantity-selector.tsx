"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
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
  );
};

export default QuantitySelector;
