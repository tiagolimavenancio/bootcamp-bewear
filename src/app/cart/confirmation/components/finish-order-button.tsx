"use client";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();

  const handleFinishOrder = async () => {
    finishOrderMutation.mutate();
  };

  return (
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
  );
};

export default FinishOrderButton;
