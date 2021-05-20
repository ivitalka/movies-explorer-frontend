import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({Header, component: Component, ...props }) {
  return (
        <Route path={props.path}>
            {
                () => (props.isLogged ? <Component {...props}/> : <Redirect to="/signin"/>)
            }
        </Route>
  );
}

export default ProtectedRoute;
