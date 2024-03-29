import './styles/index.sass';
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import { router } from "./routing";
import { attachLogger } from 'effector-logger';
import { ToastContainer } from 'react-toastify';

attachLogger();

export const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};
