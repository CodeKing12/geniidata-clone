import { useState } from "react";
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

function MenuItem(props: NavItemProps) {
  return (
    <a className="menu-item">
      <span className="text">{props.text}</span>
    </a>
  );
}

interface MenuControlToggleProps {
  text: string;
  onUpdate?: (newVal: boolean) => void;
}

function MenuControlToggle({ text, onUpdate }: MenuControlToggleProps) {
  const [value, setValue] = useState(false);

  function handleSwitch() {
    setValue(!value);
    onUpdate?.(!value);
  }

  return (
    <a className="menu-item">
      <span className="text">{text}</span>
      <label
        className={`switch ${value ? "on" : "off"}`}
        onClick={handleSwitch}
      ></label>
    </a>
  );
}

interface SideNavProps {
  open: boolean;
}

function SideNav({ open }: SideNavProps) {
  return (
    <aside
      className="sidenav"
      style={{
        display: open ? "" : "none",
      }}
    >
      <div className="wrapper">
        <div className="menu-links">
          <MenuItem text="Discover" />
          <MenuItem text="Profile" />
          <MenuItem text="Inscriptions" />
          <MenuItem text="Index" />
          <MenuItem text="Mint" />
          <MenuItem text="Rewards" />
          <MenuItem text="About" />
          <MenuItem text="Documentation" />
        </div>

        <MenuControlToggle text="Dark Mode" />
        <MenuItem text="Install Our App" />
      </div>
    </aside>
  );
}

interface NavbarProps {
  openWalletCallback: () => void;
}

export default function Navbar({ openWalletCallback }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="">
      <div
        className="get-app"
        style={{
          display: openMenu ? "none" : "",
        }}
      >
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
        <div
          className="extra-links"
          style={{
            display: openMenu ? "none" : "",
          }}
        >
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
          <button
            className="connect-wallet gn-button gn-button--medium gn-button--primary"
            onClick={openWalletCallback}
          >
            <i className="iconfont icon-wallet"></i>
            &nbsp;Connect
          </button>

          <button className="small-menu" onClick={() => setOpenMenu(!openMenu)}>
            <i
              className="iconfont icon-view-list icon-click"
              style={{
                display: openMenu ? "none" : "",
              }}
            ></i>
            <i
              className="iconfont icon-close icon-click"
              style={{
                display: openMenu ? "" : "none",
              }}
            ></i>
          </button>
        </div>

        <SideNav open={openMenu} />
      </div>
    </nav>
  );
}
