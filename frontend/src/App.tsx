import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { WalletConnect } from './components/WalletConnect'
import { MintAsset, MyAssets } from './components/RWAAssets'
import { CreditScoreDashboard } from './components/CreditScore'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="border-b border-gray-800 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <Link to="/" className="text-xl font-bold text-blue-500">
                  CrediFi
                </Link>
                <div className="flex gap-4">
                  <Link to="/assets" className="hover:text-blue-400 transition">
                    Assets
                  </Link>
                  <Link to="/credit" className="hover:text-blue-400 transition">
                    Credit Score
                  </Link>
                  <Link to="/lending" className="hover:text-blue-400 transition">
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

        <Toaster position="bottom-right" />
      </div>
    </Router>
  )
}

function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">Welcome to CrediFi</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Decentralized RWA tokenization and lending platform powered by on-chain credit scoring
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-2">Tokenize Real-World Assets</h3>
          <p className="text-gray-400">
            Convert land, crops, and vehicles into digital tokens with fractional ownership
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-2">On-Chain Credit Scoring</h3>
          <p className="text-gray-400">
            Build credit history on-chain to unlock better loan terms and higher LTV ratios
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-2">DeFi Lending Pool</h3>
          <p className="text-gray-400">
            Provide liquidity to earn yield or borrow against your RWA collateral
          </p>
        </div>
      </div>
    </div>
  )
}

function AssetsPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <MintAsset />
      <MyAssets />
    </div>
  )
}

function CreditPage() {
  return <CreditScoreDashboard />
}

function LendingPage() {
  return <div className="text-center py-12">Lending Pool page coming soon...</div>
}

export default App
