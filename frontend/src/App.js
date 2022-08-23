import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "@stripe/stripe-js";

import './App.css';


import AdminForm from "./container/admin/AdminForm";
import Identity from "./container/admin/Identity";
import ResetPassword from './container/admin/ResetPassword';
import Hallinfo from './container/admin/Hallinfo';
import Addmovie from './container/admin/Addmovie';
import AdminHalls from './container/admin/AdminHalls';
import Booked from './container/admin/Booked';

import Landingpage from './container/users/Landingpage';
import IndMoviePage from './container/users/IndMoviePage';
import Hall from "./container/users/Hall";
import BookingSummary from './container/users/BookingSummary';
import CheckoutSuccess from './container/users/CheckoutSuccess';
import CheckoutFailure from "./container/users/checkoutFailure";
import PageNotFound from "./container/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* admin routes */}
          <Route path="/login" element={<AdminForm />}/>
          <Route path='/hallinfo' element={<Hallinfo />} />
          <Route path="/addmovies" element={<Addmovie />}/>
          <Route path="/hall-details" element={<AdminHalls />}/>
          <Route path="/booked-customers" element={<Booked />}/>
          <Route path='/identity' element={<Identity />}/>
          <Route path="/resetpassword" element={<ResetPassword />}/>

          {/* users routes */}
          <Route path="/" element={<Landingpage />}/>
          <Route path="/movie/:movie" element={<IndMoviePage />}/>
          <Route path="/movie/:movie/:show" element={<Hall />}/>
          <Route path="/summary" element={<BookingSummary />}/>
          <Route path="/checkout-success" element={<CheckoutSuccess />}/>
          <Route path="/checkout-failure" element={<CheckoutFailure />}/>

          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
