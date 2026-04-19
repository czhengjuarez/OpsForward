import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import SiteDetail from './pages/SiteDetail'
import Dashboard from './pages/Dashboard'
import SubmitSite from './pages/SubmitSite'
import Admin from './pages/Admin'
import Search from './pages/Search'
import About from './pages/About'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-[var(--of-bg-base)] text-[var(--of-fg-default)]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/site/:id" element={<SiteDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route 
                path="/submit" 
                element={
                  <ProtectedRoute>
                    <SubmitSite />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-[var(--of-fg-muted)] mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a href="/" className="text-[var(--of-fg-brand)] hover:underline">
          Go back home
        </a>
      </div>
    </div>
  )
}

export default App
