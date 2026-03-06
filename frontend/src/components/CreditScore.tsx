import { useAccount, useReadContract } from 'wagmi'
import { contracts } from '../contracts/addresses'
import CreditScoreOracleABI from '../contracts/CreditScoreOracle.json'

export function CreditScoreDashboard() {
  const { address } = useAccount()

  const { data: creditScore } = useReadContract({
    address: contracts.creditScoreOracle,
    abi: CreditScoreOracleABI,
    functionName: 'getCreditScore',
    args: [address],
  }) as { data: any }

  const { data: creditHistory } = useReadContract({
    address: contracts.creditScoreOracle,
    abi: CreditScoreOracleABI,
    functionName: 'getCreditHistory',
    args: [address],
  }) as { data: any }

  const score = creditScore ? Number(creditScore[0]) : 0
  const ltvRatio = creditScore ? Number(creditScore[1]) : 50
  const interestRate = creditScore ? Number(creditScore[2]) / 100 : 10

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">Credit Score</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-4xl font-bold text-blue-500">{score}</div>
            <div className="text-gray-400 mt-2">Credit Score</div>
            <div className="text-sm text-gray-500 mt-1">Out of 100</div>
          </div>

          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-4xl font-bold text-green-500">{ltvRatio}%</div>
            <div className="text-gray-400 mt-2">LTV Ratio</div>
            <div className="text-sm text-gray-500 mt-1">Loan-to-Value</div>
          </div>

          <div className="text-center p-6 bg-gray-900 rounded-lg">
            <div className="text-4xl font-bold text-purple-500">{interestRate}%</div>
            <div className="text-gray-400 mt-2">Interest Rate</div>
            <div className="text-sm text-gray-500 mt-1">Annual Rate</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Credit History</h2>
        
        {creditHistory && (
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-900 rounded">
              <span className="text-gray-400">Total Loans</span>
              <span className="font-semibold">{Number(creditHistory[0])}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-900 rounded">
              <span className="text-gray-400">Successful Repayments</span>
              <span className="font-semibold text-green-500">{Number(creditHistory[1])}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-900 rounded">
              <span className="text-gray-400">Total Borrowed</span>
              <span className="font-semibold">{(Number(creditHistory[2]) / 1e18).toFixed(4)} ETH</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-900 rounded">
              <span className="text-gray-400">Total Repaid</span>
              <span className="font-semibold">{(Number(creditHistory[3]) / 1e18).toFixed(4)} ETH</span>
            </div>
          </div>
        )}

        {!creditHistory || Number(creditHistory[0]) === 0 && (
          <div className="text-center py-8 text-gray-400">
            No credit history yet. Take your first loan to start building credit.
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Real-World Impact</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">Improved Loan Terms</h3>
            <p className="text-gray-400 text-sm">
              Your credit score of {score} unlocks a {ltvRatio}% LTV ratio, allowing you to borrow more against your collateral.
            </p>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold mb-2">Lower Interest Rates</h3>
            <p className="text-gray-400 text-sm">
              Good credit history reduces your interest rate to {interestRate}%, saving you money on every loan.
            </p>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold mb-2">Financial Inclusion</h3>
            <p className="text-gray-400 text-sm">
              Build verifiable on-chain credit history to access better financial services in emerging markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
