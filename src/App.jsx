import './App.css'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';


function App ()
{


  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/orders' element={<OrdersPage />}></Route>
      <Route path='/tracking' element={<TrackingPage />}></Route>
      <Route path='*' element={<NotFoundPage />}></Route>
    </Routes>

  );
}

export default App
