import React, { Fragment } from "react";

export const Cliente = ({ cliente }) => {
  const { descripcion, mcaActivo, fecAct, sistema, userAct, idGrupo } = cliente;
  return (
    <Fragment>
      <tr className="border-y-2">
        <td className="py-1">{fecAct}</td>
        <td className="py-1">{mcaActivo}</td>
        <td className="py-1">{sistema}</td>
        <td className="py-1">{userAct}</td>
        <td className="py-1">{idGrupo}</td>
        <td className="py-1">{descripcion}</td>
      </tr>
    </Fragment>
  );
};
