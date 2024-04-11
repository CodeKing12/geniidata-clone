import HeaderBGImg from "../../assets/images/header-bg.png";
import "./header.css";

interface HeaderProps {
  openWalletCallback: () => void;
}

export default function Header({ openWalletCallback }: HeaderProps) {
  return (
    <section className="parent">
      <div className="container">
        <div className="container-2">
          <div className="poster">
            <img src={HeaderBGImg} />
          </div>
          <div className="content">
            <h1 className="gn-h1">
              Connect your web3 wallet to view your rewards!
            </h1>
            <button
              className="gn-button gn-button--primary gn-button--medium connect-btn"
              onClick={openWalletCallback}
            >
              <i className="iconfont icon-wallet"></i>
              &nbsp;Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
