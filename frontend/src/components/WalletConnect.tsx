import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { useSwitchChain } from 'wagmi'

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { data: balance } = useBalance({ address })

  const isWrongNetwork = isConnected && chain?.id !== sepolia.id

  return (
    <div className="flex items-center gap-4">
      {!isConnected ? (
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          {isWrongNetwork && (
            <button
              onClick={() => switchChain({ chainId: sepolia.id })}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Switch to Sepolia
            </button>
          )}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg">
            <div className="text-sm">
              <div className="text-gray-400">Balance</div>
              <div className="font-mono">
                {balance ? `${(Number(balance.value) / 1e18).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-400">Address</div>
              <div className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</div>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}
