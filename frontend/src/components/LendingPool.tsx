import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { toast } from 'react-hot-toast'
import { parseEther, formatEther } from 'viem'
import { contracts } from '../contracts/addresses'
import LendingPoolABI from '../contracts/LendingPool.json'

export function LendingPoolStats() {
  const { data: totalLiquidity } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'totalLiquidity',
  }) as { data: any }

  const { data: totalBorrowed } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'totalBorrowed',
  }) as { data: any }

  const { data: utilizationRate } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'getUtilizationRate',
  }) as { data: any }

  const { data: apy } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'getAPY',
  }) as { data: any }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Pool Statistics</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-gray-400 text-sm">Total Liquidity</div>
          <div className="text-2xl font-bold mt-1">
            {totalLiquidity ? formatEther(totalLiquidity) : '0'} ETH
          </div>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-gray-400 text-sm">Total Borrowed</div>
          <div className="text-2xl font-bold mt-1">
            {totalBorrowed ? formatEther(totalBorrowed) : '0'} ETH
          </div>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-gray-400 text-sm">Utilization Rate</div>
          <div className="text-2xl font-bold mt-1 text-blue-500">
            {utilizationRate ? Number(utilizationRate) : 0}%
          </div>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg">
          <div className="text-gray-400 text-sm">APY</div>
          <div className="text-2xl font-bold mt-1 text-green-500">
            {apy ? (Number(apy) / 10).toFixed(1) : 0}%
          </div>
        </div>
      </div>
    </div>
  )
}

export function DepositWithdraw() {
  const { address } = useAccount()
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const { writeContract: deposit, data: depositHash, isPending: isDepositPending } = useWriteContract()
  const { writeContract: withdraw, data: withdrawHash, isPending: isWithdrawPending } = useWriteContract()
  const { isLoading: isDepositConfirming } = useWaitForTransactionReceipt({ hash: depositHash })
  const { isLoading: isWithdrawConfirming } = useWaitForTransactionReceipt({ hash: withdrawHash })

  const { data: providerData } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'liquidityProviders',
    args: [address],
  }) as { data: any }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      deposit({
        address: contracts.lendingPool,
        abi: LendingPoolABI,
        functionName: 'deposit',
        value: parseEther(depositAmount),
      })
      toast.success('Deposit transaction submitted!')
    } catch (error) {
      toast.error('Deposit failed')
      console.error(error)
    }
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      withdraw({
        address: contracts.lendingPool,
        abi: LendingPoolABI,
        functionName: 'withdraw',
        args: [parseEther(withdrawAmount)],
      })
      toast.success('Withdraw transaction submitted!')
    } catch (error) {
      toast.error('Withdraw failed')
      console.error(error)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Liquidity Provider</h2>

      {providerData && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <div className="text-gray-400 text-sm">Your Deposited Amount</div>
          <div className="text-2xl font-bold mt-1">
            {formatEther(providerData[0])} ETH
          </div>
        </div>
      )}

      <div className="space-y-6">
        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Deposit Amount (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="1.0"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isDepositPending || isDepositConfirming}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {isDepositPending || isDepositConfirming ? 'Depositing...' : 'Deposit'}
          </button>
        </form>

        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Withdraw Amount (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="1.0"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isWithdrawPending || isWithdrawConfirming}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isWithdrawPending || isWithdrawConfirming ? 'Withdrawing...' : 'Withdraw'}
          </button>
        </form>
      </div>
    </div>
  )
}

export function BorrowRepay() {
  const { address } = useAccount()
  const [collateralTokenId, setCollateralTokenId] = useState('')
  const [borrowAmount, setBorrowAmount] = useState('')
  const [loanId, setLoanId] = useState('')
  const [repayAmount, setRepayAmount] = useState('')

  const { writeContract: borrow, data: borrowHash, isPending: isBorrowPending } = useWriteContract()
  const { writeContract: repay, data: repayHash, isPending: isRepayPending } = useWriteContract()
  const { isLoading: isBorrowConfirming } = useWaitForTransactionReceipt({ hash: borrowHash })
  const { isLoading: isRepayConfirming } = useWaitForTransactionReceipt({ hash: repayHash })

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      borrow({
        address: contracts.lendingPool,
        abi: LendingPoolABI,
        functionName: 'borrow',
        args: [BigInt(collateralTokenId), parseEther(borrowAmount)],
      })
      toast.success('Borrow transaction submitted!')
    } catch (error) {
      toast.error('Borrow failed')
      console.error(error)
    }
  }

  const handleRepay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      repay({
        address: contracts.lendingPool,
        abi: LendingPoolABI,
        functionName: 'repay',
        args: [BigInt(loanId)],
        value: parseEther(repayAmount),
      })
      toast.success('Repay transaction submitted!')
    } catch (error) {
      toast.error('Repay failed')
      console.error(error)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Borrow & Repay</h2>

      <div className="space-y-6">
        <form onSubmit={handleBorrow} className="space-y-4">
          <h3 className="text-lg font-semibold">Borrow</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Collateral Token ID</label>
            <input
              type="number"
              value={collateralTokenId}
              onChange={(e) => setCollateralTokenId(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Borrow Amount (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              placeholder="5.0"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isBorrowPending || isBorrowConfirming}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isBorrowPending || isBorrowConfirming ? 'Borrowing...' : 'Borrow'}
          </button>
        </form>

        <div className="border-t border-gray-700 pt-6">
          <form onSubmit={handleRepay} className="space-y-4">
            <h3 className="text-lg font-semibold">Repay</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Loan ID</label>
              <input
                type="number"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Repay Amount (ETH)</label>
              <input
                type="number"
                step="0.01"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
                placeholder="6.0"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isRepayPending || isRepayConfirming}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isRepayPending || isRepayConfirming ? 'Repaying...' : 'Repay Loan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
