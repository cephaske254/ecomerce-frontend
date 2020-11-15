import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import routes from "../../routes";

class Routes extends React.Component {
  render() {
    return (
      <>
        {routes.map(({ title, component: Component, url, exact, suspense }) => {
          {
            suspense ? (
              <Suspense fallback={<div>Loading</div>}>
                <Route
                  key={url}
                  path={url}
                  exact={exact}
                  render={(compProps) => (
                    <Component {...compProps} title={title} />
                  )}
                />
              </Suspense>
            ) : ()=>(
              <Route
                key={url}
                path={url}
                exact={exact}
                render={(compProps) => (
                  <Component {...compProps} title={title} />
                )}
              />
            );
          }
        })}
      </>
    );
  }
}
export default Routes;
