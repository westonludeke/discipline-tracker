import { BrowserRouter as Router } from 'react-router-dom';

function AppRouter({ children }) {
  console.log('Rendering AppRouter');
  return (
    <Router>
      {children}
    </Router>
  );
}

export default AppRouter;