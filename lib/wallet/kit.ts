import { StellarWalletsKit } from "@creit-tech/stellar-wallets-kit/sdk"
import { FreighterModule } from "@creit-tech/stellar-wallets-kit/modules/freighter"
import { HanaModule } from "@creit-tech/stellar-wallets-kit/modules/hana"
import { LobstrModule } from "@creit-tech/stellar-wallets-kit/modules/lobstr"
import { xBullModule } from "@creit-tech/stellar-wallets-kit/modules/xbull"
import { Networks, type ISupportedWallet } from "@creit-tech/stellar-wallets-kit/types"

export type { ISupportedWallet }

let initialized = false

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return
  // NOTE: using an explicit module list instead of defaultModules() —
  // defaultModules() statically imports every wallet module (including
  // MetaMask's), and that module's package references the old
  // "@creit.tech/..." npm name, which breaks the production bundle.
  // Albedo and Rabet are excluded: their SDK modules hard-throw
  // '"...does not support the signMessage function"' and our auth flow
  // requires signing a message, so they can never complete sign-in.
  StellarWalletsKit.init({
    modules: [new FreighterModule(), new xBullModule(), new LobstrModule(), new HanaModule()],
    // The API only exists on Stellar Testnet — the kit defaults to PUBLIC otherwise.
    network: Networks.TESTNET,
  })
  initialized = true
}

/** The kit has no promise-based "open modal" API — callers pick a wallet from this list. */
export async function listSupportedWallets(): Promise<ISupportedWallet[]> {
  ensureInitialized()
  return StellarWalletsKit.refreshSupportedWallets()
}

export async function connectWallet(walletId: string) {
  ensureInitialized()
  StellarWalletsKit.setWallet(walletId)
  const { address } = await StellarWalletsKit.fetchAddress()
  return address
}

export async function getConnectedAddress() {
  ensureInitialized()
  const { address } = await StellarWalletsKit.getAddress()
  return address
}

export async function signWalletMessage(message: string, opts: { address: string; networkPassphrase: string }) {
  ensureInitialized()
  const { signedMessage, signerAddress } = await StellarWalletsKit.signMessage(message, opts)
  // Some wallets ignore the requested `address` and sign with whatever account is
  // currently active — sending that mismatched signature gives the backend a
  // confusing "invalid signature" instead of the real cause.
  if (signerAddress && signerAddress !== opts.address) {
    throw new Error(
      `Your wallet signed with a different account (${signerAddress}) than the one you connected (${opts.address}). Switch your wallet's active account and try again.`
    )
  }
  return signedMessage
}

export async function disconnectWallet() {
  ensureInitialized()
  await StellarWalletsKit.disconnect()
}
