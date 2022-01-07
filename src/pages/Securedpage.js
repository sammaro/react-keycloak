import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";

const Secured = () => {
  const { keycloak, initialized } = useKeycloak();

  const { userData } = useUserData();
  const [respuesta, setRespuesta] = useState({});

  useEffect(() => {
    if (initialized && undefined !== userData.userId) {
      var headers = new Headers();
      headers.append("userId", keycloak.tokenParsed.preferred_username);
      headers.append("token", userData.token);

      var requestOptions = {
        method: "GET",
        headers: headers,
      };

      fetch("api/verPerfil", requestOptions)
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
     // eslint-disable-next-line
  }, [userData]);

  const {
    tipoUser,
    nomUser,
    cifId,
    habAdm,
    otraInfo,
    verPerfil,
    errorCode,
    errorMsg,
  } = respuesta;

  return (
    <div>
      <h1 className="text-[#da484c] text-[1.4rem]">Datos de Perfil</h1>
      <ul>
        <li>tipoUser: {tipoUser}</li>
        <li>nomUser: {nomUser}</li>
        <li>cifId: {cifId}</li>
        <li>habAdm: {habAdm}</li>
        <li>otraInfo: {otraInfo}</li>
        <li>
          verPerfil:
          {undefined !== verPerfil ? (
            <ul>
              <li> descripcion: {verPerfil[0].descripcion}</li>
              <li> codigo: {verPerfil[0].codigo}</li>
              <li>tipoHab: {verPerfil[0].tipoHab}</li>
            </ul>
          ) : null}
        </li>
        <li>errorCode: {errorCode}</li>
        <li>errorMsg: {errorMsg}</li>
      </ul>
    </div>
  );
};

export default Secured;
