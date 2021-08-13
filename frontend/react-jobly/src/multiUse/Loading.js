import React from "react";
import { Spinner } from 'reactstrap';

function Loading() {
    return (
        <div>
          <h1>Loading</h1>
          <Spinner color="primary" />
        </div>
    );
  }

export default Loading;