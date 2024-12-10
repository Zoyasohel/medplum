import { BrowserRouter, Route, Routes } from '@medplum/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { History } from './components/History';
import { Overview } from './components/Overview';
import { Timeline } from './components/Timeline';
import { HomePage } from './pages/HomePage';
import { PatientPage } from './pages/PatientPage';
import { ResourcePage } from './pages/ResourcePage';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Patient/:id" element={<PatientPage />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="/:resourceType/:id" element={<ResourcePage />} />
        <Route path="/:resourceType/:id/_history/:versionId" element={<ResourcePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
