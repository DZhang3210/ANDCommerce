import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenubarTrigger } from "@radix-ui/react-menubar";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import DeleteButton from "./DeleteButton";

const OrderSideBar = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
        <DeleteButton id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderSideBar;
