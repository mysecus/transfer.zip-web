import React, { useState } from "react";
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import './ubuntu.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ApplicationProvider } from './providers/ApplicationProvider';
import { FileTransferProvider } from './providers/FileTransferProvider';
import { AuthProvider } from './providers/AuthProvider';
import TransfersPage from './pages/app/TransfersPage';
import AccountPage from './pages/app/AccountPage';
import TransferInfoPage from "./pages/app/TransferInfoPage";
import DownloadPage from "./pages/app/DownloadPage";
import StatisticsPage from "./pages/app/StatisticsPage";
import FilesPage from "./pages/app/FilesPage";
import QuickSharePage from "./pages/app/quick-share/QuickSharePage";
import QuickShareNew from "./pages/app/quick-share/QuickShareNew";
import EmptyPage from "./pages/app/EmptyPage";
import QuickShareProgress from "./pages/app/quick-share/QuickShareProgress";
import { QuickShareProvider } from "./providers/QuickShareProvider";
import Login from "./pages/app/Login";
import SignUp from "./pages/app/SignUp";
import Site from "./pages/site/Site";
import AboutPage from "./pages/site/AboutPage";
import HomePage from "./pages/app/HomePage";
import PrivacyPolicyPage from "./pages/site/legal/PrivacyPolicyPage";
import TermsOfConditionsPage from "./pages/site/legal/TermsOfConditionsPage";
import ResetPasswordRequest from "./pages/app/PasswordResetRequest";
import ChangePassword from "./pages/app/ChangePassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/transfer/:secretCode" element={<DownloadPage />} />
      <Route path="/about" element={<Site />}>
        <Route path="/about" element={<AboutPage />} />
        <Route path="legal/privacy-policy" element={<PrivacyPolicyPage/>}/>
        <Route path="legal/terms-and-conditions" element={<TermsOfConditionsPage/>}/>
        <Route path="*" element={<Navigate to={"/about"} replace={true}/>} />
      </Route>
      <Route element={<ApplicationProvider />}>
        <Route element={<AuthProvider />}>
          <Route element={<App />}>
            <Route element={<QuickShareProvider />}>
              <Route path="/quick-share" element={<QuickSharePage />}>
                <Route path="/quick-share" element={<QuickShareNew />} />
                <Route path="progress" element={<QuickShareProgress />} />
                {/* <Route path="progress" element={<TransfersPage />} /> */}
                {/* <Route path=":id" element={<TransferInfoPage />} /> */}
              </Route>
            </Route>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/transfers">
              <Route path="/transfers" element={<TransfersPage />} />
              <Route path=":id" element={<TransferInfoPage />} />
            </Route>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/files" element={<FilesPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPasswordRequest />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<EmptyPage />} />
        </Route>
      </Route>
    </Route >
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);