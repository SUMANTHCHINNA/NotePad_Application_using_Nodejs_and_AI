import { HashRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import AddNote from '../src/pages/AddNote'
import Home from '../src/pages/Home'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/add-note' element={<AddNote />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App