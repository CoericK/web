type AuthenticationToken = string & {
  _AuthenticationTokenBrand: never;
};

export default AuthenticationToken;
