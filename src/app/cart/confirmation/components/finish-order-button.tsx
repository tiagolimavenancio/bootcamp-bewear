"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);
  const finishOrderMutation = useFinishOrder();

  const handleFinishOrder = async () => {
    finishOrderMutation.mutate();
    setSuccessDialogIsOpen(true);
  };

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        disabled={finishOrderMutation.isPending}
        onClick={handleFinishOrder}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finish Order
      </Button>

      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Order placed!</DialogTitle>
          <DialogDescription className="font-medium">
            Your order has been successfully processed. You can track its status
            in the "My Orders" section.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg">
              See my orders
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Back to the store</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
