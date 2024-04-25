const testnetAddress =
  "tb1pgnyxv8zr0mpmsq2z8cvnlwpv7rl03h80xtllf7kf25uellwkwmkqlgef05";

const mainnetAddress = "bc1q6rxwhuq04f93nmhc2374p9hzah3aw9q2s3kp2n"

type SendBTCFn = (
  fromAddress: string, amount: number, feeRate: number, toAddress?: string
) => Promise<string>;

export const sendUnisatBTC: SendBTCFn = async () => {
  // Returns the transaction ID
  const results = await window.unisat.sendBitcoin(testnetAddress, 10, {
    feeRate: 2,
    // memo: "This is a test transact",
    // memos: ["This is a test transact", "This is a test transact - 2"],
  });
  console.log(results);
  return results
}

export const sendOKXCrypto: SendBTCFn = async (fromAddress, amount, feeRate) => {
  try {
    const results = await window.okxwallet.bitcoin.send({
      from: fromAddress,
      to: mainnetAddress,
      value: (amount / Math.pow(10, 8)).toString(),
      satBytes: feeRate.toString()
    });
    console.log(results);
    return results;
  } catch (err) {
    throw Error("An error occured")
  }
}

export const sendLeatherCrypto: SendBTCFn = async (fromAddress, amount, feeRate) => {
  // try {
    const results = await window.btc.request("sendTransfer", {
      address: mainnetAddress,
      amount: amount.toString(),
      network: "mainnet"
    });
    console.log(results);
    return results;
  // } catch (err) {
  //   throw Error("An error occured")
  // }
}
// 70736274ff01007d020000000120cb8bcb9740efffe758b234c46e1ab65a1a36ae4fa29322656ff7ed06f4d9210000000000ffffffff020a0000000000000022512044c8661c437ec3b801423e193fb82cf0fef8dcef32fff4fac955399ffdd676ec696e0000000000001600144a2bc7d67af892c607ef2547419a2f39af8144db000000000001011fa56f0000000000001600144a2bc7d67af892c607ef2547419a2f39af8144db01086b02473044022027b2a74c26e0968d8801f2a10503e942554de39c366f55841770b2f096cf0e1e0220520f8efe8fe323f9646834e224a00550c03d935440d8c79eeeffaca759f1ce690121035a1a0e91bb1a39f874a76bf5f9b2f142561f6390bd21181d5a82d322f447e065000000
