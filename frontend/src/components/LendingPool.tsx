import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { toast } from 'react-hot-toast'
import { parseEther, formatEther } from 'viem'
import { contracts } from '../contracts/addresses'
import LendingPoolABI from '../contracts/LendingPool.json'

export function LendingPoolStats() {
  const { data: totalLiquidity, refetch: refetchLiquidity } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'totalLiquidity',
  }) as { data: any, refetch: any }

  const { data: totalBorrowed, refetch: refetchBorrowed } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'totalBorrowed',
  }) as { data: any, refetch: any }

  const { data: utilizationRate, refetch: refetchUtilization } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'getUtilizationRate',
  }) as { data: any, refetch: any }

  const { data: apy, refetch: refetchApy } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'getAPY',
  }) as { data: any, refetch: any }

  const refetchAll = () => {
    refetchLiquidity()
    refetchBorrowed()
    refetchUtilization()
    refetchApy()
  }

  useEffect(() => {
    const interval = setInterval(refetchAll, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pool Statistics</h2>
        <button onClick={refetchAll} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Refresh
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-gray-600 text-sm font-medium mb-1">Total Liquidity</div>
          <div className="text-3xl font-bold text-blue-700">
            {totalLiquidity ? formatEther(totalLiquidity) : '0'} ETH
          </div>
        </div>

        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="text-gray-600 text-sm font-medium mb-1">Total Borrowed</div>
          <div className="text-3xl font-bold text-green-700">
            {totalBorrowed ? formatEther(totalBorrowed) : '0'} ETH
          </div>
        </div>

        <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
          <div className="text-gray-600 text-sm font-medium mb-1">Utilization Rate</div>
          <div className="text-3xl font-bold text-orange-700">
            {utilizationRate ? Number(utilizationRate) : 0}%
          </div>
        </div>

        <div className="p-6 bg-teal-50 rounded-xl border border-teal-200">
          <div className="text-gray-600 text-sm font-medium mb-1">APY</div>
          <div className="text-3xl font-bold text-teal-700">
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
  const { isLoading: isDepositConfirming, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({ hash: depositHash })
  const { isLoading: isWithdrawConfirming, isSuccess: isWithdrawSuccess } = useWaitForTransactionReceipt({ hash: withdrawHash })

  const { data: providerData, refetch } = useReadContract({
    address: contracts.lendingPool,
    abi: LendingPoolABI,
    functionName: 'liquidityProviders',
    args: [address],
  }) as { data: any, refetch: any }

  useEffect(() => {
    if (isDepositSuccess) {
      toast.success('Deposit successful!')
      setDepositAmount('')
      refetch()
    }
  }, [isDepositSuccess])

  useEffect(() => {
    if (isWithdrawSuccess) {
      toast.success('Withdrawal successful!')
      setWithdrawAmount('')
      refetch()
    }
  }, [isWithdrawSuccess])

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
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Liquidity Provider</h2>

      {providerData && (
        <div className="mb-6 p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="text-gray-600 text-sm font-medium mb-1">Your Deposited Amount</div>
          <div className="text-3xl font-bold text-green-700">
            {formatEther(providerData[0])} ETH
          </div>
        </div>
      )}

      <div className="space-y-6">
        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Deposit Amount (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="1.0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isDepositPending || isDepositConfirming}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isDepositPending || isDepositConfirming ? 'Depositing...' : 'Deposit'}
          </button>
        </form>

        <div className="border-t border-gray-200 pt-6">
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Withdraw Amount (ETH)</label>
              <input
                type="number"
                step="0.01"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="1.0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isWithdrawPending || isWithdrawConfirming}
              className="w-full px-6 py-3 bg-red-50 text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isWithdrawPending || isWithdrawConfirming ? 'Withdrawing...' : 'Withdraw'}
            </button>
          </form>
        </div>
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
  const { isLoading: isBorrowConfirming, isSuccess: isBorrowSuccess } = useWaitForTransactionReceipt({ hash: borrowHash })
  const { isLoading: isRepayConfirming, isSuccess: isRepaySuccess } = useWaitForTransactionReceipt({ hash: repayHash })

  useEffect(() => {
    if (isBorrowSuccess) {
      toast.success('Borrow successful!')
      setCollateralTokenId('')
      setBorrowAmount('')
    }
  }, [isBorrowSuccess])

  useEffect(() => {
    if (isRepaySuccess) {
      toast.success('Repayment successful!')
      setLoanId('')
      setRepayAmount('')
    }
  }, [isRepaySuccess])

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
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrow & Repay</h2>

      <div className="space-y-6">
        <form onSubmit={handleBorrow} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Borrow</h3>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Collateral Token ID</label>
            <input
              type="number"
              value={collateralTokenId}
              onChange={(e) => setCollateralTokenId(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Borrow Amount (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              placeholder="5.0"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isBorrowPending || isBorrowConfirming}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isBorrowPending || isBorrowConfirming ? 'Borrowing...' : 'Borrow'}
          </button>
        </form>

        <div className="border-t border-gray-200 pt-6">
          <form onSubmit={handleRepay} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Repay</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Loan ID</label>
              <input
                type="number"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Repay Amount (ETH)</label>
              <input
                type="number"
                step="0.01"
                value={repayAmount}
                onChange={(e) => setRepayAmount(e.target.value)}
                placeholder="6.0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isRepayPending || isRepayConfirming}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isRepayPending || isRepayConfirming ? 'Repaying...' : 'Repay Loan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
