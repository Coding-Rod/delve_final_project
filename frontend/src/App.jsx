import { StickyNavbar as NavBar } from "./components/NavBar";
import { DrawerDefault as Drawer } from "./components/Drawer";
import { Dialog } from "./components/Dialog";
import { Messages } from "./components/Messages";
import { MessageBox } from "./components/MessageBox";
import { useState } from "react";

export default function App() {
  const [newChat, setNewChat] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <nav>
        <NavBar setOpen={setOpenDrawer} />
        <Drawer open={openDrawer} setOpen={setOpenDrawer} />
      </nav>
      <main>
        {newChat && <Dialog />}
        {!newChat && <Messages />}
      </main>
      <footer>
        <MessageBox />
      </footer>
    </div>
  );
}
