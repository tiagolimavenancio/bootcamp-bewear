"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutCancelPage = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <Image
          src="/error-illustration.png"
          alt="Error"
          width={300}
          height={300}
          className="mx-auto"
        />
        <DialogTitle className="mt-4 text-2xl text-red-600">
          Order failed
        </DialogTitle>
        <DialogDescription className="font-medium text-gray-600">
          Something went wrong while processing your order. Please try again in
          a few moments or contact support if the problem persists.
        </DialogDescription>

        <DialogFooter className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            className="rounded-full bg-red-600 text-white hover:bg-red-700"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
          <Button className="rounded-full" variant="outline" size="lg" asChild>
            <Link href="/support">Contact support</Link>
          </Button>
          <Button className="rounded-full" variant="outline" size="lg" asChild>
            <Link href="/">Back to the store</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutCancelPage;
