import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "./pages/home";
import MyPosts from "./pages/settings";
import { Toaster } from "@/components/ui/sonner"
//import CheckLoggedin from "./components/util/redirect";

import { AuthProvider } from "./context/AuthContext";
import { CheckLoggedin, ReDirectHome } from "./components/util/redirect";
import UserProfile from "./pages/user-profile";


export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster
          richColors
          position="top-center"
        />
        <BrowserRouter>

          <Routes>
            <Route index path="/" element={
              <CheckLoggedin>
                <HomePage />
              </CheckLoggedin>
            }></Route>
            <Route path="/login" element={
              <ReDirectHome>
                <LoginPage />
              </ReDirectHome>
            } />
            <Route path="/register" element={
              <ReDirectHome>
                <RegisterPage />
              </ReDirectHome>
            } />
            <Route path="/settings" element={
              <CheckLoggedin>
                <MyPosts />
              </CheckLoggedin>
            } />
            <Route path="/user/:id" element={
              <CheckLoggedin>
                <UserProfile/>
              </CheckLoggedin>
            } />
            {/* You can add routes for Feed, Profile, etc., here */}
            <Route path="*" element={<h1>404</h1>} />
          </Routes>

        </BrowserRouter>

      </ThemeProvider>
    </AuthProvider>
  );
}
