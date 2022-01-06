import React, { Fragment } from "react";

export const Cliente = ({ cliente }) => {
  const { descripcion, mcaActivo, fecAct, sistema, userAct, idGrupo } = cliente;
  return (
    <Fragment>
      <tr>
        <td>{descripcion}</td>
        <td>{mcaActivo}</td>
        <td>{fecAct}</td>
        <td>{sistema}</td>
        <td>{userAct}</td>
        <td>{idGrupo}</td>
      </tr>
    </Fragment>
  );
};
