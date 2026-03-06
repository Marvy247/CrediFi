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
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          {isWrongNetwork && (
            <button
              onClick={() => switchChain({ chainId: sepolia.id })}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-md font-medium"
            >
              Switch to Sepolia
            </button>
          )}
          <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <div className="text-sm">
              <div className="text-gray-500 text-xs font-medium">Balance</div>
              <div className="font-mono font-semibold text-gray-900">
                {balance ? `${(Number(balance.value) / 1e18).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-sm">
              <div className="text-gray-500 text-xs font-medium">Address</div>
              <div className="font-mono font-semibold text-gray-900">{address?.slice(0, 6)}...{address?.slice(-4)}</div>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-all font-medium"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}
