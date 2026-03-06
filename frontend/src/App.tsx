import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { WalletConnect } from './components/WalletConnect'
import { MintAsset, MyAssets } from './components/RWAAssets'
import { CreditScoreDashboard } from './components/CreditScore'
import { LendingPoolStats, DepositWithdraw, BorrowRepay } from './components/LendingPool'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CrediFi
                  </span>
                </Link>
                <div className="flex gap-1">
                  <Link to="/assets" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                    Assets
                  </Link>
                  <Link to="/credit" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                    Credit Score
                  </Link>
                  <Link to="/lending" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                    Lending Pool
                  </Link>
                </div>
              </div>
              <WalletConnect />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/credit" element={<CreditPage />} />
            <Route path="/lending" element={<LendingPage />} />
          </Routes>
        </main>

        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#fff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          },
        }} />
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-6 py-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to CrediFi
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Decentralized RWA tokenization and lending platform powered by on-chain credit scoring for financial inclusion in emerging markets
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link to="/assets" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold">
            Get Started
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-semibold">
            View Docs
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Tokenize Real-World Assets</h3>
          <p className="text-gray-600 leading-relaxed">
            Convert land, crops, and vehicles into digital tokens with fractional ownership capabilities
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">On-Chain Credit Scoring</h3>
          <p className="text-gray-600 leading-relaxed">
            Build credit history on-chain to unlock better loan terms and higher LTV ratios
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">DeFi Lending Pool</h3>
          <p className="text-gray-600 leading-relaxed">
            Provide liquidity to earn yield or borrow against your RWA collateral
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Financial Inclusion for 1.7 Billion People</h2>
          <p className="text-blue-100 text-lg">
            CrediFi brings DeFi lending to underbanked populations in emerging markets through RWA tokenization and on-chain credit scoring
          </p>
          <div className="flex gap-8 justify-center pt-4">
            <div>
              <div className="text-3xl font-bold">50% → 90%</div>
              <div className="text-blue-100 text-sm">LTV Ratio Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold">10% → 5%</div>
              <div className="text-blue-100 text-sm">Interest Rate Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AssetsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-World Assets</h1>
        <p className="text-gray-600">Tokenize your assets and manage your portfolio</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <MintAsset />
        <MyAssets />
      </div>
    </div>
  )
}

function CreditPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Score</h1>
        <p className="text-gray-600">Track your on-chain credit history and unlock better loan terms</p>
      </div>
      <CreditScoreDashboard />
    </div>
  )
}

function LendingPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lending Pool</h1>
        <p className="text-gray-600">Provide liquidity or borrow against your RWA collateral</p>
      </div>
      <LendingPoolStats />
      <div className="grid md:grid-cols-2 gap-6">
        <DepositWithdraw />
        <BorrowRepay />
      </div>
    </div>
  )
}

export default App
