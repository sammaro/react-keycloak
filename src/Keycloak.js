import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://beta.caja.com:8180/auth/",
  realm: "caja",
  clientId: "docdigitales",
});

export default keycloak;
