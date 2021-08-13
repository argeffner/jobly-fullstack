import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup }) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );
// Set homepage first, next login and signup
return (
    <div className='routes'>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginForm login={login} cantFind="/drinks" />
          </Route>
          <Route exact path="/signup">
			      <SignupForm signup={signup} />
			    </Route>
          {/* All the Routes below need currentUser*/}
          <PrivateRoute exact path="/companies">
            <CompanyList />
          </PrivateRoute>
          <PrivateRoute exact path="/companies/:handle">
            <CompanyDetail />
          </PrivateRoute>
          <PrivateRoute exact path="/jobs">
            <JobList />
          </PrivateRoute>
          <PrivateRoute  path="/profile">
			      <ProfileForm />
			    </PrivateRoute>
          
          <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default Routes;