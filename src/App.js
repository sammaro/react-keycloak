import { ReactKeycloakProvider } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import PrivateRoute from "./helpers/PrivateRoute";
import keycloak from "./Keycloak";
import WelcomePage from "./pages/Homepage";
import { Listado } from "./pages/Listado";
import SecuredPage from "./pages/Securedpage";

function App() {
  return (
    <div className="pt-20">
      <ReactKeycloakProvider
        initOptions={{ onLoad: "login-required" }}
        authClient={keycloak}
      >
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route
              path="/datosPerfil"
              element={
                <PrivateRoute>
                  <SecuredPage />
                </PrivateRoute>
              }
            />
            <Route path="/listado" element={<Listado />} />
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
