import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
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
    <div className="mx-4">
      <h1 className="text-[#da484c] text-[1.4rem]">Lista Grupo</h1>
      <table className="text-sm w-full top-52">
        <thead className="bg-[#da484c] text-white top-[70px] sticky">
          <tr className="">
            <th className="my-2 p-2">fecAct</th>
            <th className="my-2 p-2">mcaActivo</th>
            <th className="my-2 p-2">sistema</th>
            <th className="my-2 p-2">userAct</th>
            <th className="my-2 p-2">idGrupo</th>
            <th className="my-2 p-2">descripcion</th>
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
        <tfoot className="bg-[#da484c] text-white">
        <tr className="">
          <td colspan="6" className="my-2 p-2 text-right">
          {undefined !== respuesta && undefined !== respuesta.listaGrupo
            ? `${respuesta.listaGrupo.length} rows`
            : null}
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};
