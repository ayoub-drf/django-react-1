import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
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
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App