import Shop from './Page/Shop';
import { Route, Routes } from 'react-router-dom';
import Main from './layout/Main';
import Cart from './Page/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
