import { NavBar } from "./components/NavBar";
import { Drawer } from "./components/Drawer";
import { Dialog } from "./components/Dialog";
import { Messages } from "./components/Messages";
import { MessageBox } from "./components/MessageBox";

export default function App() {
  return (
    <>
      <nav>
        <NavBar />
        <Drawer />
      </nav>
      <main>
        <Dialog />
        <Messages />
      </main>
      <footer>
        <MessageBox />
      </footer>
    </>
  );
}
