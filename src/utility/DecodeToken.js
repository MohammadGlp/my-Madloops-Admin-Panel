import jwtDecode from "jwt-decode";

export const DecodeToken = (token) => {
  let decodedToken = {};
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {}
  return decodedToken;
};
