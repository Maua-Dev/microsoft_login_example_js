import React from "react";
import Login from "./Login";
import "./App.css";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";


const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: "https://login.microsoftonline.com/" + process.env.REACT_APP_TENANT,
        redirectUri: window.location.origin + "/",
    }
};

export default function App() {

    const msalInstance = new PublicClientApplication(msalConfig);

    return (
        <MsalProvider instance={msalInstance}>
            <Login />
        </MsalProvider>
    );
}