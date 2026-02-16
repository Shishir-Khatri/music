import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { lazy, Suspense } from 'react';
import PublicPage from './pages/PublicPage';
import SmoothScroll from './components/SmoothScroll';
import './styles/style.css';

// Lazy load admin page — only needed on /admin route
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <ToastProvider>
      <SmoothScroll>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/admin" element={
              <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#fff' }}>Loading...</div>}>
                <AdminPage />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </ToastProvider>
  );
}

export default App;
