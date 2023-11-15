import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage.tsx";
import {ProtectedRoutes} from "./ProtectedRoutes.tsx";
import {MainPage} from "./pages/MainPage.tsx";
import {BrowserPage} from "./pages/BrowserPage.tsx";
import {Layout} from "./app/Layout.tsx";

import {setAuth} from "./utils/auth.ts";

function App() {

  setAuth(false);

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/login" element={<AuthPage />}/>
                    <Route path="/browse" element={<BrowserPage />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to="/" replace />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
