import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { ReviewRoom } from '@/pages/ReviewRoom';
import { CandidateDetail } from '@/pages/CandidateDetail';
import { Interns } from '@/pages/Interns';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';
import { Apply } from '@/pages/Apply';
import { InternLayout } from '@/features/intern/portal/InternLayout';
import { InternDashboard } from '@/features/intern/portal/pages/InternDashboard';
import { TasksPage } from '@/features/intern/portal/pages/TasksPage';
import { TaskDetailPage } from '@/features/intern/portal/pages/TaskDetailPage';
import { TrainingPlanPage } from '@/features/intern/portal/pages/TrainingPlanPage';
import { PerformancePage } from '@/features/intern/portal/pages/PerformancePage';
import { CertificatePage } from '@/features/intern/portal/pages/CertificatePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Route - No Layout */}
          <Route path="/apply" element={<Apply />} />

          {/* Intern Portal Routes */}
          <Route path="/intern" element={<InternLayout />}>
            <Route index element={<InternDashboard />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="tasks/:taskId" element={<TaskDetailPage />} />
            <Route path="training" element={<TrainingPlanPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="certificate" element={<CertificatePage />} />
          </Route>

          {/* Admin Routes - With Layout */}
          <Route
            path="/*"
            element={
              <div className="flex h-screen overflow-hidden bg-cream">
                <Sidebar />
                
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  
                  <main className="flex-1 overflow-hidden">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/review-room" element={<ReviewRoom />} />
                      <Route path="/candidate/:id" element={<CandidateDetail />} />
                      <Route path="/interns" element={<Interns />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
