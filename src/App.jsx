import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const HomePage = lazy(() => import('./pages/Home'))
const TrackPage = lazy(() => import('./pages/Track'))
const QuotePage = lazy(() => import('./pages/Quote'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const SustainabilityPage = lazy(() => import('./pages/Sustainability'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-navy-900 text-slategray-100">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
