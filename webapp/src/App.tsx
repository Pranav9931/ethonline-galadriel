import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Homepage } from './pages'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App