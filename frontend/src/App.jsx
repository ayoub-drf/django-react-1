import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'




const App = () => {
    return (
      <BrowserRouter>
      
        <Routes>
          <Route 
            path='/'
            element={
             <ProtectedRoute>
              <Home></Home>
             </ProtectedRoute>
            }
          >
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App