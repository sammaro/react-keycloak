import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Cliente } from "./Cliente";

export const Listado = (props) => {
  const { keycloak } = useKeycloak();
  const [respuesta, setRespuesta] = useState({});

  useEffect(() => {
    if (keycloak.authenticated) {
      var headers = new Headers();
      headers.append("userId", localStorage.getItem("userId"));
      headers.append("token", localStorage.getItem("access_token"));

      var requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch("api/getListado", requestOptions)
        .then((response) => {
          return response.text();
        })
        .then((result) => {
          setRespuesta(JSON.parse(result).data);
          Promise.resolve();
        })
        .catch((error) => {
          return null;
        });
    }
  }, [keycloak.authenticated]);

  return (
    <div>
      <h1>Lista Grupo</h1>
      <table>
        <thead>
          <tr>
            <th>descripcion</th>
            <th>mcaActivo</th>
            <th>fecAct</th>
            <th>sistema</th>
            <th>userAct</th>
            <th>idGrupo</th>
          </tr>
        </thead>
        <tbody>
          {undefined !== respuesta && undefined !== respuesta.listaGrupo
            ? respuesta.listaGrupo.map((cliente) =>
                cliente !== null ? (
                  <Cliente key={cliente.descripcion} cliente={cliente} />
                ) : null
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};
