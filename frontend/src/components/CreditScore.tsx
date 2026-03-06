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
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Credit Score Overview</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{score}</div>
            <div className="text-gray-700 font-semibold mt-2">Credit Score</div>
            <div className="text-sm text-gray-500 mt-1">Out of 100</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{ltvRatio}%</div>
            <div className="text-gray-700 font-semibold mt-2">LTV Ratio</div>
            <div className="text-sm text-gray-500 mt-1">Loan-to-Value</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{interestRate}%</div>
            <div className="text-gray-700 font-semibold mt-2">Interest Rate</div>
            <div className="text-sm text-gray-500 mt-1">Annual Rate</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Credit History</h2>
        
        {creditHistory && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Total Loans</span>
              <span className="text-2xl font-bold text-gray-900">{Number(creditHistory[0])}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-gray-600 font-medium">Successful Repayments</span>
              <span className="text-2xl font-bold text-green-600">{Number(creditHistory[1])}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Total Borrowed</span>
              <span className="text-2xl font-bold text-gray-900">{(Number(creditHistory[2]) / 1e18).toFixed(4)} ETH</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Total Repaid</span>
              <span className="text-2xl font-bold text-gray-900">{(Number(creditHistory[3]) / 1e18).toFixed(4)} ETH</span>
            </div>
          </div>
        )}

        {!creditHistory || Number(creditHistory[0]) === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium">No credit history yet</p>
            <p className="text-sm mt-1">Take your first loan to start building credit</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-World Impact</h2>
        
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-600">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Improved Loan Terms
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Your credit score of {score} unlocks a {ltvRatio}% LTV ratio, allowing you to borrow more against your collateral.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-600">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lower Interest Rates
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Good credit history reduces your interest rate to {interestRate}%, saving you money on every loan.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-600">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financial Inclusion
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Build verifiable on-chain credit history to access better financial services in emerging markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
