import './App.css';
import Users from './components/UserManager/UserManager';
import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/defaultLayout'
import ProductManager from './components/ProductManager/ProductManager';
import Order from './components/Order/Order';
import LoginAdmin from './components/Login/LoginAdmin';
import RequiredAdmin from './components/RequireAdmin/RequireAdmin';
import CreateProduct from './components/CreateProduct/CreateProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequiredAdmin />}>
        <Route path='/' element={<DefaultLayout><Users /></DefaultLayout>} />
          <Route path='/products-manager' element={<DefaultLayout><ProductManager /></DefaultLayout>} />
          <Route path='/order-manager' element={<DefaultLayout><Order /></DefaultLayout>} />
          <Route path='/create-product' element={<DefaultLayout><CreateProduct /></DefaultLayout>} />
        </Route>
        <Route path='/Login' index element={<LoginAdmin />} />
      </Routes>

    </div>
  );
}

export default App;
