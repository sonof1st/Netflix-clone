import React from "react";
import { Picture, LockBody, ReleaseBody, Spinner } from "./styles/loading";

export default function Loading({ src, ...rest }) {
  return (
    <Spinner {...rest}>
      <LockBody />
      <Picture src={`/images/users/${src}.png`} />
    </Spinner>
  );
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <ReleaseBody />;
};
