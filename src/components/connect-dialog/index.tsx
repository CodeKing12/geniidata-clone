import UnisatLogo from "../../assets/images/unisat.png";
import XverseLogo from "../../assets/images/xverse.png";
import OkxLogo from "../../assets/images/okx.png";
import LeatherLogo from "../../assets/images/leather.png";
import BitgetLogo from "../../assets/images/bitget.png";
import WizzLogo from "../../assets/images/wizz.png";
import "./connect-dialog.css";

interface WalletItemProps {
  loading: boolean;
  image: string;
  title: string;
}

function WalletItem({ title, image, loading }: WalletItemProps) {
  return (
    <div className="wallet-item">
      <div className="content">
        <img className="logo" src={image} />
        <span className="title">{title}</span>
      </div>
      <div className="indicators">
        <i
          className="el-icon-loading"
          style={{
            display: loading ? "none" : "auto",
          }}
        ></i>
        <i className="iconfont icon-arrow-right"></i>
      </div>
    </div>
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
                <WalletItem title="Unisat" image={UnisatLogo} loading={false} />
                <WalletItem title="Xverse" image={XverseLogo} loading={false} />
                <WalletItem
                  title="OKX Wallet"
                  image={OkxLogo}
                  loading={false}
                />
                <WalletItem
                  title="Leather Wallet"
                  image={LeatherLogo}
                  loading={false}
                />
                <WalletItem
                  title="Bitget Wallet"
                  image={BitgetLogo}
                  loading={false}
                />
                <WalletItem
                  title="Wizz Wallet"
                  image={WizzLogo}
                  loading={false}
                />
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
