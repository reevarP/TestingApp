import './App.css';
import React from 'react';
import ProductListing from './Components/ProductListing';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';
import { Routes, Route } from 'react-router-dom';
import FilterPage from './Components/FilterPage';
import MyCart from './Components/MyCart';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<ProductListing />} />
          <Route exact path="/filter/:filterBy" element={<FilterPage />} />
          <Route exact path="/mycart" element={<MyCart />} />
        </Routes>
      </Provider>
    </React.Fragment>
  );
}

export default App;
