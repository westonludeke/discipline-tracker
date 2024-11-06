import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Goals from './components/Goals';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;