// Spinner.js
import React from "react";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";

const spinnerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-h-screen;
`;

const Spinner = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div css={spinnerStyles}>
        <SyncLoader size={20} color={"#4A90E2"} loading={true} />
      </div>
    </div>
  );
};

export default Spinner;
