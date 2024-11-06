import { Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <h1>discipline-tracker-app</h1>
      <nav>
        <Link to="/goals" className="btn btn-primary">Go to Goals</Link>
      </nav>
    </>
  )
}

export default App