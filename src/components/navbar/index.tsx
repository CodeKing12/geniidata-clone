import { PropsWithChildren, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { usePopper } from "react-popper";
import "./navbar.css";
import "./responsive.css";
import { WalletDetails } from "../../App";
import { getRateFees } from "../../general/misc";

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

function GasPopover({ halfHourFee }: { halfHourFee?: number }) {
  const [visible, setVisible] = useState(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const arrowElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement.current } },
      ],
    }
  );

  return (
    <>
      <button
        className="pill"
        ref={referenceElement}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <i className="iconfont icon-gas1"></i>
        <span>{halfHourFee || ""}</span>
      </button>
      <div
        className={`gas-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={popperElement}
        {...attributes.popper}
      >
        <div className="arrow" style={styles.arrow} ref={arrowElement}></div>
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

interface InfoPopoverProps extends PropsWithChildren {
  title: string;
}

function InfoPopover({ title, children }: InfoPopoverProps) {
  const [visible, setVisible] = useState(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const arrowElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      modifiers: [
        { name: "arrow", options: { element: arrowElement.current } },
      ],
    }
  );

  return (
    <>
      <div
        ref={referenceElement}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      <div
        className={`info-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={popperElement}
        {...attributes.popper}
      >
        <div className="arrow" style={styles.arrow} ref={arrowElement}></div>
        <span className="popover-content">{title}</span>
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
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current
  );

  function onNightToggle() {}

  return (
    <>
      <button
        className="more-btn"
        ref={referenceElement}
        onClick={() => setVisible(!visible)}
        onBlur={() => setVisible(false)}
      >
        <i className="iconfont icon-more"></i>
      </button>
      <div
        className={`more-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={popperElement}
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

interface AddressPopoverProps {
  address: string;
  disconnectWallet: () => void;
}

function AddressPopover({ address, disconnectWallet }: AddressPopoverProps) {
  const [visible, setVisible] = useState(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement.current,
    popperElement.current
  );

  return (
    <>
      <button
        className="address-btn"
        ref={referenceElement}
        onClick={() => setVisible(!visible)}
        onBlur={() => setVisible(false)}
      >
        <div className="wrapper">
          <span>{address.slice(0, 4) + "..." + address.slice(-4)}</span>
          <i
            className="addr-arrow-icon iconfont icon-chevron-down"
            style={{
              transform: visible ? "rotate(180deg)" : "rotateY(0)",
            }}
          ></i>
        </div>
      </button>
      <div
        className={`address-popover popover ${visible ? "is-visible" : "hidden"}`}
        style={styles.popper}
        ref={popperElement}
        {...attributes.popper}
      >
        <div className="popover-content">
          <div className="addr-menu-list">
            <div className="addr-menu-item">Orders</div>
            <div className="addr-menu-item">Sign In on Mobile</div>
            <button className="addr-menu-item" onClick={disconnectWallet}>
              Disconnect
            </button>
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
  wallet: WalletDetails;
  openWalletCallback: () => void;
  handleDisconnectWallet: () => void;
}

export interface RateFeesObj {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

export default function Navbar({
  wallet,
  openWalletCallback,
  handleDisconnectWallet,
}: NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [rateFees, setRateFees] = useState<RateFeesObj>();
  // const [fetchTimer, setFetchTimer] = useState<number>(0);
  const rerunTimer = useRef(0);

  useEffect(() => {
    async function effectCode() {
      console.log("Fetching now");
      const rateFees = await getRateFees();
      if (rateFees) {
        setRateFees(rateFees);
      }
      console.log("Done Fetching");
      rerunTimer.current = window.setTimeout(effectCode, 12000);
    }

    effectCode();

    return () => {
      if (rerunTimer.current) {
        console.log("Disposing this");
        clearTimeout(rerunTimer.current);
      }
    };
  }, []);

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
            <GasPopover halfHourFee={rateFees?.halfHourFee} />
          </div>

          {wallet.address.length > 0 ? (
            <div className="watchlist">
              <InfoPopover title="Watchlist">
                <i className="iconfont icon-star-filled"></i>
              </InfoPopover>
            </div>
          ) : (
            ""
          )}

          <div className="gift-wrapper-icon-parent">
            <InfoPopover title="Rewards">
              <i className="iconfont icon-gift"></i>
            </InfoPopover>
          </div>

          <div className="more-items">
            <EllipsisPopover />
          </div>
        </div>

        <div className="nav-end">
          {wallet.address.length > 0 ? (
            <div className="address-dropdown">
              <AddressPopover
                address={wallet.address}
                disconnectWallet={handleDisconnectWallet}
              />
            </div>
          ) : (
            <button
              className="connect-wallet gn-button gn-button--medium gn-button--primary"
              onClick={openWalletCallback}
            >
              <i className="iconfont icon-wallet"></i>
              &nbsp;Connect
            </button>
          )}

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
