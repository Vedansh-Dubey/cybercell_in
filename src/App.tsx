import { Suspense, lazy, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { EmergencyDrawer } from './components/contact/EmergencyDrawer'
import { CardSkeleton } from './components/ui/Skeleton'

const HomePage      = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const ServicesPage  = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })))
const NewsPage      = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })))
const ContactPage   = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))

function PageFallback() {
  return (
    <div className="container" style={{ padding: '80px 0', display: 'grid', gap: 20 }}>
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Layout onReport={() => setDrawerOpen(true)}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage onReport={() => setDrawerOpen(true)} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>

      {drawerOpen && <EmergencyDrawer onClose={() => setDrawerOpen(false)} />}
    </>
  )
}
