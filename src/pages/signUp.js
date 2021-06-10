import React, { useContext, useState } from "react";
import Form from "../components/form";
import { FooterContainer } from "../containers/footerContainer";
import { HeaderContainer } from "../containers/headerContainer";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const isInvalid = emailAddress === "" || password === "" || name === "";

  const handleSignUp = (e) => {
    e.preventDefault();

    // Add user to firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: name,
            photoURL: Math.floor(Math.random() * 5) + 1, // user pp randomly assigned 1-5
          })
          .then(() => {
            history.push(ROUTES.BROWSE);
          });
      })
      .catch((error) => {
        setName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignUp} method="POST">
            <Form.Input
              placeholder="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="Password"
              placeholder="password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Sign Up
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Already have an account?{" "}
            <Form.Link to={ROUTES.SIGN_IN}>Sign in now.</Form.Link>
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
