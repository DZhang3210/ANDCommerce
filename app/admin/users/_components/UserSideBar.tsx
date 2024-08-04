import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import { MenubarTrigger } from "@radix-ui/react-menubar";
import React from "react";

const UserSideBar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger></MenubarTrigger>

        <MenubarContent>
          <MenubarItem>View Profile</MenubarItem>
          <MenubarItem>Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserSideBar;
