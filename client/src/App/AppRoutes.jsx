import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppShell from '../features/layout/AppShell';
import SubmitArticlePage from '../pages/SubmitArticlePage';
import SearchArticlesPage from '../pages/SearchArticlesPage';
import ModeratorQueuePage from '../pages/ModeratorQueuePage';
import AnalystQueuePage from '../pages/AnalystQueuePage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppShell />}>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/search' element={<SearchArticlesPage />} />
          <Route path='/submit' element={<SubmitArticlePage />} />
          <Route path='/moderationqueue' element={<ModeratorQueuePage />} />
          <Route path='/analysisqueue' element={<AnalystQueuePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
