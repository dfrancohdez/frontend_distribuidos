
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInScreen } from "./screens/signInScreen/SignInScreen";
import { SignUpScreen } from "./screens/signUpScreen/SignUpScreen";
import { HomeScreen } from "./screens/homeScreen/HomeScreen";
import { Layout } from "./screens/layout/Layout";

import 'bootstrap/dist/css/bootstrap.min.css';
import './_app.scss';
import { RecuperarScreen } from "./screens/recuperarScreen/RecuperarScreen";
import { MovimientosScreen } from "./screens/movimientosScreen/MovimientosScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route index element={<HomeScreen />} /> */}
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/recuperar" element={<RecuperarScreen />} />
          <Route path="/movimientos" element={<MovimientosScreen />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
