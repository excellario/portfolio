import { Routes, Route, Navigate } from 'react-router-dom'
import { ScrollBar, ScrollManager } from './components/bits'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'

export default function App() {
  return (
    <>
      <ScrollBar />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
