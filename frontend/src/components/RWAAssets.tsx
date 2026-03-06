import { useState } from 'react'
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
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

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
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Mint RWA Token</h2>
      <form onSubmit={handleMint} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Asset Type</label>
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
          >
            <option value="0">Land</option>
            <option value="1">Crop</option>
            <option value="2">Vehicle</option>
            <option value="3">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Lagos, Nigeria"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Valuation (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={valuation}
            onChange={(e) => setValuation(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Document Hash (IPFS)</label>
          <input
            type="text"
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            placeholder="QmHash..."
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint Asset'}
        </button>
      </form>
    </div>
  )
}

export function MyAssets() {
  const [tokenId, setTokenId] = useState('0')

  const { data: metadata } = useReadContract({
    address: contracts.rwaAsset,
    abi: RWAAssetABI,
    functionName: 'getAssetMetadata',
    args: [BigInt(tokenId)],
  }) as { data: any }

  const assetTypes = ['Land', 'Crop', 'Vehicle', 'Other']
  const verificationStatus = ['Pending', 'Verified', 'Rejected']

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Token ID</label>
        <input
          type="number"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
        />
      </div>

      {metadata && (
        <div className="space-y-3 bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span>{assetTypes[Number(metadata[0])]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Location:</span>
            <span>{metadata[1]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Valuation:</span>
            <span>{(Number(metadata[2]) / 1e18).toFixed(2)} ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Document:</span>
            <span className="font-mono text-sm">{metadata[3]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={metadata[4] === 1 ? 'text-green-500' : 'text-yellow-500'}>
              {verificationStatus[Number(metadata[4])]}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
