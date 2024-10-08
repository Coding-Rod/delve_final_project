import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export function StickyNavbar({ setOpen }) {
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className="max-h-[768px] w-[calc(100%-12px)] p-4">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Document Reader
          </Typography>
          <Button onClick={handleOpen}>
            Chats
          </Button>
        </div>
      </Navbar>
    </div>
  );
}