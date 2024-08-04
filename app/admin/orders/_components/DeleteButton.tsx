"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteOrder } from "../_actions/orderActions";

const DeleteButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="transition hover:bg-destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrder({ id });
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteButton;
