"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/ui/common/cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCentsToBRL } from "@/helpers/money";

export const Cart = () => {
  const { data: cart, isPending: isLoadingCart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col px-5 pb-5">
            <div className="flex h-full max-h-full flex-col overflow-hidden">
              <ScrollArea>
                <div className="flex h-full flex-col gap-8">
                  {cart?.items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      productVariantId={item.productVariantId}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={
                        item.productVariant.priceInCents
                      }
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {cart?.items && cart?.items.length > 0 && (
              <div className="flex flex-col gap-4">
                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Delivery</p>
                  <p>Free</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Total</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Button className="mt-5 rounded-full" asChild>
                  Finish purchase
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
