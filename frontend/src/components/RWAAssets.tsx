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
  const [tokenId, setTokenId] = useState('0')

  const { data: metadata, refetch } = useReadContract({
    address: contracts.rwaAsset,
    abi: RWAAssetABI,
    functionName: 'getAssetMetadata',
    args: [BigInt(tokenId)],
  }) as { data: any, refetch: any }

  const assetTypes = ['🏠 Land', '🌾 Crop', '🚗 Vehicle', '📦 Other']
  const verificationStatus = ['Pending', 'Verified', 'Rejected']

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Assets</h2>
      
      <div className="mb-6 flex gap-2">
        <input
          type="number"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
          placeholder="Enter Token ID"
        />
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
        >
          View
        </button>
      </div>

      {metadata && (
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Type</span>
            <span className="text-gray-900 font-semibold">{assetTypes[Number(metadata[0])]}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Location</span>
            <span className="text-gray-900 font-semibold">{metadata[1]}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Valuation</span>
            <span className="text-gray-900 font-semibold">{(Number(metadata[2]) / 1e18).toFixed(2)} ETH</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Document</span>
            <span className="font-mono text-sm text-gray-700 truncate max-w-xs">{metadata[3]}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600 font-medium">Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              metadata[4] === 1 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {verificationStatus[Number(metadata[4])]}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
