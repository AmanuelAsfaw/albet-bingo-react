import { Link } from "react-router-dom";
import React, { FC, Fragment } from "react";

import { RouteConstants } from "../../../router/Constants";
import { InternalServerErrorPropType } from "./InternalServerError.utils";

const InternalServerError: FC<InternalServerErrorPropType> = ({
  message,
  children,
}) => {
  return (
    <Fragment>
      <section className="content">
        <div className="error-page">
          <h2 className="headline text-danger">500</h2>
          <div className="error-content">
            <h3>
              <i className="fas fa-exclamation-triangle text-danger"></i>
              Oops! Something went wrong.
            </h3>
            {message ? (
              { message }
            ) : (
              <p>
                We will work on fixing that right away. Meanwhile, you may{" "}
                <Link to={RouteConstants.DASHBOARDS}>return to dashboard</Link>{" "}
                or try using the search form.
              </p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default InternalServerError;
