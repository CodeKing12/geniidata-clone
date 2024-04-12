import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import ConnectWallet, {
  ConnectedWalletParams,
} from "./components/connect-dialog";
import { useState } from "react";
import { WalletID } from "./components/connect-dialog/connectWallets";

export type WalletDetails = {
  id?: WalletID;
  address: string;
  publicKey: string;
  signature: string;
};

function App() {
  const [openWallet, setOpenWallet] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<WalletDetails>({
    address: "",
    publicKey: "",
    signature: "",
  });

  const handleConnectWallet: ConnectedWalletParams = (
    id,
    address,
    publicKey,
    signature
  ) => {
    setOpenWallet(false);
    setConnectedWallet({
      id,
      address,
      publicKey,
      signature,
    });
  };

  function handleDisconnectWallet() {
    setConnectedWallet({
      address: "",
      publicKey: "",
      signature: "",
    });
  }

  return (
    <main className="wrapper dark-theme">
      <Navbar
        wallet={connectedWallet}
        openWalletCallback={() => setOpenWallet(true)}
        handleDisconnectWallet={handleDisconnectWallet}
      />
      <Header
        openWalletCallback={() => setOpenWallet(true)}
        wallet={connectedWallet}
      />
      <ConnectWallet
        open={openWallet}
        closeModal={() => setOpenWallet(false)}
        onWalletConnect={handleConnectWallet}
      />
    </main>
  );
}

export default App;
