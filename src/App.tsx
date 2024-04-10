import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import ConnectWallet from "./components/connect-dialog";
import { useState } from "react";

function App() {
  const [openWallet, setOpenWallet] = useState(false);

  return (
    <main className="wrapper">
      <Navbar />
      <Header connectCallback={() => setOpenWallet(true)} />
      <ConnectWallet
        open={openWallet}
        closeModal={() => setOpenWallet(false)}
      />
    </main>
  );
}

export default App;
