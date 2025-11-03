import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CartSummary } from "@/app/cart/components/cart-summary";
import FinishOrderButton from "@/app/cart/confirmation/components/finish-order-button";
import { formatAddress } from "@/app/cart/helpers/address";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  // Redirect to home if cart is empty or doesn't exist
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <div className="space-y-4 px-5">
      <Card>
        <CardHeader>
          <CardTitle>Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardContent>
              <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
            </CardContent>
          </Card>
        </CardContent>
        <FinishOrderButton />
      </Card>

      <CartSummary
        subtotalInCents={cartTotalInCents}
        totalInCents={cartTotalInCents}
        products={cart.items.map((item) => ({
          id: item.productVariant.id,
          name: item.productVariant.product.name,
          variantName: item.productVariant.name,
          quantity: item.quantity,
          priceInCents: item.productVariant.priceInCents,
          imageUrl: item.productVariant.imageUrl,
        }))}
      />
    </div>
  );
};

export default ConfirmationPage;
