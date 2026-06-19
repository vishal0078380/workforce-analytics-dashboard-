import React from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard from "./pages/Dashboard";

function AppContent() {
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    return <Dashboard user = { user }
    signOut = { signOut }
    />;
}

function App() {
    return ( <
        Authenticator hideSignUp = { true } >
        <
        AppContent / >
        <
        /Authenticator>
    );
}

export default App;