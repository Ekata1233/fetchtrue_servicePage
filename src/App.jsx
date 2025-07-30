import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { ApiProvider } from './Components/ApiContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Description from './Components/Overview';
import Review from './Components/Review';
import Footer from './Components/Footer';
import Header from './Components/Header';
import WriteReview from './Components/WriteReview';
import ProductHome from './Components/ProductHome';
import SelfAddPage from './Components/SelfAddPage';
import ShareCustomerPage from './Components/ShareCustomerPage';

function App() {

  return (
    <>
      {/* <BrowserRouter> */}
        <ApiProvider>
          <Header />
          <Routes>

            <Route path='/' element={<ProductHome />} />
            <Route path="/description" element={<Description />} />
            <Route path="/review" element={<Review />} />
            <Route path="/writeareview" element={<WriteReview />} />
            <Route path="/self-add" element={<SelfAddPage />} />
            {/* <Route path="/share-to-customer" element={<ShareCustomerPage />} /> */}

          </Routes>
          <Footer />
        </ApiProvider>
      {/* </BrowserRouter> */}

    </>
  )
}

export default App
