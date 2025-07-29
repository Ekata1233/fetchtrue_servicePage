import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { ApiProvider } from './Components/ApiContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Description from './Components/Description';
import Review from './Components/Review';
import Footer from './Components/Footer';
import Header from './Components/Header';
import WriteReview from './Components/WriteReview';
import ProductHome from './Components/ProductHome';

function App() {

  return (
    <>
      <BrowserRouter>
      <ApiProvider> 
        <Header/>
        <Routes>
         
          <Route path='/' element={<ProductHome /> } />
          <Route path="/description" element={<Description />} />
          <Route path="/review" element={<Review />} />
          <Route path="/writeareview" element={<WriteReview />} />

         
        </Routes>
        <Footer/>
      </ApiProvider>
    </BrowserRouter>
    
    </>
  )
}

export default App
