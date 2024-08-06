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
import Link from "next/link";

type UserSideBarProps = {
  id: string;
  email: string;
};

const UserSideBar = ({ id, email }: UserSideBarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile/${email}/panel`}>View</Link>
        </DropdownMenuItem>
        <DeleteButton id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSideBar;
