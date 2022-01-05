import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: "https://idptest.lacaja.com.ar/auth/",
  realm: "lacaja",
  clientId: "portal-socio",
});

export default keycloak;
