import "./header.css";

interface HeaderProps {
  connectCallback: () => void;
}

export default function Header({ connectCallback }: HeaderProps) {
  return (
    <section className="parent">
      <div className="container">
        <div className="container-2">
          <div className="poster">
            <img />
          </div>
          <div className="content">
            <h1 className="gn-h1">
              Connect your web3 wallet to view your rewards!
            </h1>
            <button
              className="gn-button gn-button--primary gn-button--medium connect-btn"
              onClick={connectCallback}
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
