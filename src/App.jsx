import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ApiProvider } from './Components/ApiContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Description from './Components/Overview';
import Review from './Components/Review';
import Footer from './Components/Footer';
import Header from './Components/Header';
import WriteReview from './Components/WriteReview';
import ProductHome from './Components/ProductHome';
import SelfAddPage from './Components/SelfAddPage';
import PrivacyPolicy from './Components/Footer/Privacypolices';
import TermsConditions from './Components/Footer/TermsConditions';
import ReturnRefund from './Components/Footer/ReturnRefund';
import CancellationPolicy from './Components/Footer/CancellationPolicy';
import Aboutus from './Components/Footer/Aboutus';
import { ServiceProvider } from './Components/context/ServiceContext';

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <ApiProvider>
          <Header />
          <Routes>
            <Route path="/" element={<ProductHome />} />
            <Route path="/review" element={<Review />} />
            <Route path="/writeareview" element={<WriteReview />} />
            <Route path="/self-add" element={<SelfAddPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnRefund />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/about-us" element={<Aboutus />} />
          </Routes>
          <Footer />
        </ApiProvider>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
