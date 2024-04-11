import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import ConnectWallet from "./components/connect-dialog";
import { useState } from "react";

function App() {
  const [openWallet, setOpenWallet] = useState(false);

  return (
    <main className="wrapper dark-theme">
      <Navbar openWalletCallback={() => setOpenWallet(true)} />
      <Header openWalletCallback={() => setOpenWallet(true)} />
      <ConnectWallet
        open={openWallet}
        closeModal={() => setOpenWallet(false)}
      />
    </main>
  );
}

export default App;
