import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Browse from "./pages/browse";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import { IsUserRedirect, ProtectedRoute } from "./helpers/route";
import useAuth from "./hooks/useAuth";

export default function App() {
  const user = useAuth();
  // console.log("user is", user);
  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_IN}
        >
          <SignIn />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
        >
          <SignUp />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
        >
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}

// return (
//   <Router>
//     <Route exact path={ROUTES.HOME} component={Home} />
//     <Route exact path={ROUTES.BROWSE} component={Browse} />
//     <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
//     <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
//   </Router>
// );
