import React, { useContext, useState } from "react";
import Form from "../components/form";
import { FooterContainer } from "../containers/footerContainer";
import { HeaderContainer } from "../containers/headerContainer";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router";

export default function SignIn() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { firebase } = useContext(FirebaseContext);

  // Check validation
  const isInvalid = emailAddress === "" || password === "";

  const handleSignIn = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        //push to the browse page
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer buttonShow={false}>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignIn} method="POST">
            <Form.Input
              placeholder="email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              placeholder="password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Sign In
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            New to Netflix?{" "}
            <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
