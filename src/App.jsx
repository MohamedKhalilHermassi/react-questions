import './App.css'
import { Route, Routes } from 'react-router-dom'
import MoviesList from './components/MoviesList'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <>
        <Provider store={store}>
            <Routes>
                
                <Route path='' >
                      <Route index element={<MoviesList/>}></Route>
                </Route>
            </Routes>
        </Provider>
    </>
      
  )
}

export default App
