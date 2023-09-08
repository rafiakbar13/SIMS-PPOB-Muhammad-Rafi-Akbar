export function setTokenWithExpiration(token, expirationHours) {
  const expirationTime =
    new Date().getTime() + expirationHours * 60 * 60 * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiration", expirationTime.toString());
}

export function getToken() {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("tokenExpiration");
  const currentTime = new Date().getTime();

  if (token && expirationTime && currentTime < parseInt(expirationTime, 10)) {
    return token;
  } else {
    return null;
  }
}
