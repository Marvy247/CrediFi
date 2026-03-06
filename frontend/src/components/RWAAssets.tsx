import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { toast } from 'react-hot-toast'
import { contracts } from '../contracts/addresses'
import RWAAssetABI from '../contracts/RWAAsset.json'

export function MintAsset() {
  const { address } = useAccount()
  const [assetType, setAssetType] = useState('0')
  const [location, setLocation] = useState('')
  const [valuation, setValuation] = useState('')
  const [documentHash, setDocumentHash] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Asset minted successfully!')
      setAssetType('0')
      setLocation('')
      setValuation('')
      setDocumentHash('')
    }
  }, [isSuccess])

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      writeContract({
        address: contracts.rwaAsset,
        abi: RWAAssetABI,
        functionName: 'mintAsset',
        args: [address, parseInt(assetType), location, BigInt(valuation) * BigInt(10 ** 18), documentHash],
      })
      toast.success('Transaction submitted!')
    } catch (error) {
      toast.error('Transaction failed')
      console.error(error)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mint RWA Token</h2>
      <form onSubmit={handleMint} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Asset Type</label>
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
          >
            <option value="0">🏠 Land</option>
            <option value="1">🌾 Crop</option>
            <option value="2">🚗 Vehicle</option>
            <option value="3">📦 Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Lagos, Nigeria"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Valuation (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={valuation}
            onChange={(e) => setValuation(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Document Hash (IPFS)</label>
          <input
            type="text"
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            placeholder="QmHash..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint Asset'}
        </button>
      </form>
    </div>
  )
}

export function MyAssets() {
  const { address } = useAccount()
  const [assets, setAssets] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadAssets = async () => {
    if (!address) return
    
    setLoading(true)
    const loadedAssets = []
    
    // Try to load up to 20 assets (adjust based on expected usage)
    for (let i = 0; i < 20; i++) {
      try {
        const response = await fetch(
          `https://ethereum-sepolia-rpc.publicnode.com`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: contracts.rwaAsset,
                data: `0x6352211e${i.toString(16).padStart(64, '0')}` // ownerOf(tokenId)
              }, 'latest'],
              id: 1
            })
          }
        )
        const data = await response.json()
        
        if (data.result && data.result !== '0x') {
          const owner = '0x' + data.result.slice(-40)
          if (owner.toLowerCase() === address.toLowerCase()) {
            loadedAssets.push(i)
          }
        }
      } catch (error) {
        // Token doesn't exist, continue
      }
    }
    
    setAssets(loadedAssets)
    setLoading(false)
  }

  useEffect(() => {
    loadAssets()
  }, [address])

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Assets</h2>
        <button
          onClick={loadAssets}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {!address ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="font-medium">Connect your wallet to view assets</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading your assets...</p>
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="font-medium">No assets found</p>
          <p className="text-sm mt-1">Mint your first asset to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {assets.map((tokenId) => (
            <AssetCard key={tokenId} tokenId={tokenId} />
          ))}
        </div>
      )}
    </div>
  )
}

function AssetCard({ tokenId }: { tokenId: number }) {
  const { data: metadata, isLoading } = useReadContract({
    address: contracts.rwaAsset,
    abi: RWAAssetABI,
    functionName: 'getAssetMetadata',
    args: [BigInt(tokenId)],
  }) as { data: any, isLoading: boolean }

  const assetTypes = ['🏠 Land', '🌾 Crop', '🚗 Vehicle', '📦 Other']
  const verificationStatus = ['Pending', 'Verified', 'Rejected']
  const statusColors = ['bg-yellow-100 text-yellow-700 border-yellow-200', 'bg-green-100 text-green-700 border-green-200', 'bg-red-100 text-red-700 border-red-200']

  if (isLoading || !metadata) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  const assetType = metadata[0] !== undefined ? Number(metadata[0]) : 0
  const location = metadata[1] || 'Unknown'
  const valuation = metadata[2] ? Number(metadata[2]) : 0
  const documentHash = metadata[3] || 'N/A'
  const status = metadata[4] !== undefined ? Number(metadata[4]) : 0

  return (
    <div className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-2xl mb-1">{assetTypes[assetType]}</div>
          <div className="text-xs text-gray-500 font-mono">Token ID: #{tokenId}</div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
          {verificationStatus[status]}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Location</div>
          <div className="text-sm font-semibold text-gray-900">{location}</div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Valuation</div>
          <div className="text-lg font-bold text-blue-600">{(valuation / 1e18).toFixed(2)} ETH</div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Document Hash</div>
          <div className="text-xs font-mono text-gray-600 truncate">{documentHash}</div>
        </div>
      </div>
    </div>
  )
}
