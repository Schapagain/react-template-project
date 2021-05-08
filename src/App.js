import React from "react";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Navigator from "./components/Navigator";
import NotificationContextProvider from "./contexts/NotificationContext";

export default function App() {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <div className="w-full min-h-screen bg-page">
            <Navigator />
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </NotificationContextProvider>
  );
}
