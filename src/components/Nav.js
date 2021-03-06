import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const Nav = () => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <h1 className="text-[#da484c] text-[1.4rem] px-4">loading...</h1>;
  }

  return (
    <nav className="fixed right-0 left-0 z-[1030] flex items-center py-2 h-[72px] bg-white md:justify-start top-0 border-b-2">
      <div className="top-0 w-full flex flex-wrap">
        <section className="x-auto">
          <nav className="flex justify-between text-[#da484c] w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <h1 className="text-3xl font-bold font-heading">
                Keycloak React AUTH.
              </h1>
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <a className="hover:text-blue-800" href="/">
                    Home
                  </a>
                </li>
                {!!keycloak.authenticated && (
                  <li>
                    <a className="hover:text-blue-800" href="/datosPerfil">
                      Datos Perfil
                    </a>
                  </li>
                )}
                <li>
                  <a className="hover:text-blue-800" href="/listado">
                    Listado
                  </a>
                </li>
              </ul>
              <div className="hidden xl:flex items-center space-x-5">
                <div className="hover:text-gray-200">
                  {!keycloak.authenticated && (
                    <button
                      type="button"
                      className="text-blue-800"
                      onClick={() => keycloak.login()}
                    >
                      Login
                    </button>
                  )}

                  {!!keycloak.authenticated && (
                    <button
                      type="button"
                      className="text-blue-800"
                      onClick={() => keycloak.logout()}
                    >
                      Logout ({keycloak.tokenParsed.preferred_username})
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </nav>
  );
};

export default Nav;
