import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  ChartNoAxesGantt,
  FolderCog,
  MonitorCog,
  SquarePlus,
  SquareX,
} from "lucide-react";

const env = process.env.NODE_ENV;
let _BASE_URL_;
if (env == "development") {
  _BASE_URL_ = "http://localhost:3000";
} else if (env == "production") {
  _BASE_URL_ = "https://rent-a-car-scheduler.vercel.app";
}

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a
              href={`${_BASE_URL_}/manage`}
              className="flex flex-row items-center gap-2"
            >
              <ChartNoAxesGantt />
              Διαχείρηση στόλου
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href={`${_BASE_URL_}/monitor`}
              className="flex flex-row items-center gap-2"
            >
              <MonitorCog />
              Κατάσταση οχημάτων
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuGroup> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FolderCog size={17} className="mr-2" color="#737373" />
            <span>Επεξεργασία στόλου</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <a
                  href={`${_BASE_URL_}/addVehicle`}
                  className="flex flex-row items-center gap-2"
                >
                  <SquarePlus />
                  Προσθήκη οχήματος
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href={`${_BASE_URL_}/removeVehicle`}
                  className="flex flex-row items-center gap-2"
                >
                  <SquareX />
                  Αφαίρεση οχήματος
                </a>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* </DropdownMenuGroup> */}
        {/* <DropdownMenuSeparator /> */}

        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
