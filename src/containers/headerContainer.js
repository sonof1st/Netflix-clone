import React from "react";
import Header from "../components/header/index";
import * as ROUTES from "../constants/routes";
import Logo from "../logo.svg";

export function HeaderContainer({ children, buttonShow = true }) {
  return (
    <Header>
      <Header.Frame>
        <Header.Logo to={ROUTES.HOME} alt="Netflix" src={Logo} />
        {buttonShow && (
          <Header.Button to={ROUTES.SIGN_IN}>Sign in</Header.Button>
        )}
      </Header.Frame>
      {children}
    </Header>
  );
}
