import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import ConnectWallet, {
  ConnectedWalletParams,
} from "./components/connect-dialog";
import { useState } from "react";
import { WalletID } from "./components/connect-dialog/connectWallets";
import Alert, { AlertInfo } from "./components/alerts";

export type WalletDetails = {
  id?: WalletID;
  address: string;
  publicKey: string;
  signature: string;
};

function App() {
  const [openWallet, setOpenWallet] = useState(false);
  const [alerts, setAlerts] = useState<AlertInfo[]>([]);
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
        onError={(type, message) =>
          setAlerts((prev) => [
            ...prev,
            {
              id: prev.length,
              type,
              message,
            },
          ])
        }
      />
      {alerts.map((alert) => (
        <Alert
          {...alert}
          onRemove={(id) =>
            setAlerts((prev) => prev.filter((alert) => alert.id !== id))
          }
        />
      ))}
    </main>
  );
}

export default App;
