import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { usePopper } from "react-popper";
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

function GasPopover() {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  return (
    <>
      <button
        className="pill"
        ref={setReferenceElement}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <i className="iconfont icon-gas1"></i>
        <span>29</span>
      </button>
      <div
        className={`gas-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={setPopperElement}
        {...attributes.popper}
      >
        <div className="arrow" style={styles.arrow} ref={setArrowElement}></div>
        <div className="popover-content">
          <div className="gas-list">
            <div className="gas-item">
              <i className="nav-rate-icon iconfont icon-bike"></i>
              <span className="nav-rate-text">Low: 39 sats/vB</span>
            </div>
            <div className="gas-item">
              <i className="nav-rate-icon iconfont icon-plane1"></i>
              <span className="nav-rate-text">Medium: 43 sats/vB</span>
            </div>
            <div className="gas-item">
              <i className="nav-rate-icon iconfont icon-flashlight-line"></i>
              <span className="nav-rate-text">High: 55 sats/vB</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RewardsPopover() {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <i className="iconfont icon-gift"></i>
      </div>
      <div
        className={`rewards-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={setPopperElement}
        {...attributes.popper}
      >
        <div className="arrow" style={styles.arrow} ref={setArrowElement}></div>
        <span className="popover-content">Rewards</span>
      </div>
    </>
  );
}

interface ExtraItemProps {
  title: string;
  icon: string;
}

function ExtraItem({ title, icon }: ExtraItemProps) {
  return (
    <div className="additional-item">
      <i className={`iconfont gn-icon-click ${icon}`}></i>
      <span>{title}</span>
    </div>
  );
}

function EllipsisPopover() {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  function onNightToggle() {}

  return (
    <>
      <button
        className="more-btn"
        ref={setReferenceElement}
        onClick={() => setVisible(!visible)}
        onBlur={() => setVisible(false)}
      >
        <i className="iconfont icon-more"></i>
      </button>
      <div
        className={`more-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={setPopperElement}
        {...attributes.popper}
      >
        <div className="popover-content">
          <div>
            <div className="night-mode">
              <i className="iconfont gn-icon-click icon-dark"></i>
              <span>Night Mode</span>
              <SwitchButton
                className="toggle"
                onUpdate={onNightToggle}
                defaultVal={true}
              />
            </div>
            <ExtraItem title="About" icon="icon-info-circle-filled" />
            <ExtraItem title="API" icon="icon-soundmian" />
            <ExtraItem title="Twitter" icon="icon-twitter1" />
            <ExtraItem title="Discord" icon="icon-discord-fill" />
            <ExtraItem title="Documentation" icon="icon-book-filled" />
          </div>
        </div>
      </div>
    </>
  );
}

interface SwitchButtonProps {
  className?: string;
  defaultVal?: boolean;
  onUpdate?: (newVal: boolean) => void;
}

interface MenuControlToggleProps extends SwitchButtonProps {
  text: string;
}

function SwitchButton({ className, defaultVal, onUpdate }: SwitchButtonProps) {
  const [value, setValue] = useState(!!defaultVal);

  function handleSwitch() {
    setValue(!value);
    onUpdate?.(!value);
  }

  return (
    <label
      className={`switch ${className} ${value ? "on" : "off"}`}
      onClick={handleSwitch}
    ></label>
  );
}

function MenuControlToggle({ text, onUpdate }: MenuControlToggleProps) {
  return (
    <a className="menu-item">
      <span className="text">{text}</span>
      <SwitchButton onUpdate={onUpdate} />
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
            <GasPopover />
          </div>

          <div className="gift-wrapper-icon-parent">
            <RewardsPopover />
          </div>

          <div className="more-items">
            <EllipsisPopover />
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
