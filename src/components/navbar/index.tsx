import logo from "../../assets/images/logo.png";
import "./navbar.css";
import "./responsive.css";

interface NavItemProps {
  text: string;
}

function NavItem(props: NavItemProps) {
  return (
    <p className="nav-item">
      <span className="text">{props.text}</span>
    </p>
  );
}

export default function Navbar() {
  return (
    <nav className="">
      <div className="get-app">
        <div className="content">
          <button className="btn-close-banner">
            <i className="iconfont icon-close"></i>
          </button>
          <span>Get our app for a better experience!</span>
        </div>
        <a className="install-link">Install our app</a>
      </div>
      <div className="main-nav">
        <div className="logo-container">
          <img className="" src={logo} />
        </div>
        <form className="search">
          <div className="fees">
            <span className="gas-fee-item"> Low: 42 sats/vB</span>
            <span className="gas-fee-item"> Medium: 46 sats/vB</span>
            <span className="gas-fee-item"> High: 49 sats/vB</span>
          </div>
          <div className="wrapper">
            <div className="icon-wrapper search">
              <i className="iconfont icon-search icon"></i>
            </div>
            <input placeholder="Search Address / Text / Tick / Name / Inscription" />
            <div className="icon-wrapper close">
              <i className="iconfont icon icon-close"></i>
            </div>
          </div>
        </form>
        <div className="nav-links">
          <NavItem text="Discover" />
          <NavItem text="Profile" />
          <NavItem text="Inscriptions" />
          <NavItem text="Index" />
          <NavItem text="Mint" />
        </div>
        <div className="extra-links">
          <div className="gas-fee">
            <i className="iconfont icon-gas1"></i>
            <span>29</span>
          </div>

          <div className="gift-wrapper-icon-parent">
            <i className="iconfont icon-gift"></i>
          </div>

          <div className="more-items">
            <i className="iconfont icon-more"></i>
          </div>
        </div>

        <div className="nav-end">
          <button className="connect-wallet gn-button gn-button--medium gn-button--primary">
            <i className="iconfont icon-wallet"></i>
            &nbsp;Connect
          </button>

          <button className="small-menu">
            <i className="iconfont icon-view-list icon-click"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
