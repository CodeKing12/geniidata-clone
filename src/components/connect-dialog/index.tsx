import UnisatLogo from "../../assets/images/unisat.png";
import XverseLogo from "../../assets/images/xverse.png";
import OkxLogo from "../../assets/images/okx.png";
import LeatherLogo from "../../assets/images/leather.png";
import BitgetLogo from "../../assets/images/bitget.png";
import WizzLogo from "../../assets/images/wizz.png";
import "./connect-dialog.css";
import { useState } from "react";

interface WalletItemProps {
  loading: boolean;
  image: string;
  title: string;
  handleClick: () => void;
}

function WalletItem({ title, image, loading, handleClick }: WalletItemProps) {
  return (
    <button className="wallet-item" onClick={handleClick}>
      <div className="content">
        <img className="logo" src={image} />
        <span className="title">{title}</span>
      </div>
      <div className="indicators">
        <i
          className="el-icon-loading"
          style={{
            display: loading ? "" : "none",
          }}
        ></i>
        <i
          className="iconfont icon-arrow-right"
          style={{
            display: loading ? "none" : "",
          }}
        ></i>
      </div>
    </button>
  );
}

interface ConnectWalletProps {
  open: boolean;
  closeModal: () => void;
}

export default function ConnectWallet({
  open,
  closeModal,
}: ConnectWalletProps) {
  const [loadingWallets, setLoadingWallets] = useState<string[]>([]);

  function handleLoadingWallets(id: string) {
    if (loadingWallets.includes(id)) {
      setLoadingWallets((prev) => prev.filter((walletID) => walletID !== id));
    } else {
      setLoadingWallets((prev) => [...prev, id]);
    }
  }

  return (
    <section className={`connect-dialog ${open ? "" : ""}`}>
      <aside className={`wrapper bg ${open ? "opened" : "closed"}`}></aside>
      <aside
        className={`wrapper ${open ? "opened" : "closed"}`}
        style={
          {
            //   display: open ? "" : "none",
          }
        }
      >
        <div className={`dialog ${open ? "opened" : "closed"}`}>
          <section className="header">
            <p className="title">Connect Wallet</p>
          </section>
          <section className="body">
            <div className="wallet-login">
              <p className="instruction">
                Please select the connection method.
              </p>
              <div className="wallet-list">
                {wallets.map((wallet, index) => (
                  <WalletItem
                    key={index}
                    title={wallet.title}
                    image={wallet.image}
                    loading={loadingWallets.includes(wallet.id)}
                    handleClick={() => handleLoadingWallets(wallet.id)}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="footer">
            <button
              className="gn-button gn-button--medium close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </section>
        </div>
      </aside>
    </section>
  );
}

// List of wallets to loop through
const wallets = [
  {
    id: "unisat",
    title: "Unisat",
    image: UnisatLogo,
  },
  {
    id: "xverse",
    title: "Xverse",
    image: XverseLogo,
  },
  {
    id: "okx",
    title: "OKX Wallet",
    image: OkxLogo,
  },
  {
    id: "leather",
    title: "Leather Wallet",
    image: LeatherLogo,
  },
  {
    id: "bitget",
    title: "Bitget Wallet",
    image: BitgetLogo,
  },
  {
    id: "wizz",
    title: "Wizz Wallet",
    image: WizzLogo,
  },
];
