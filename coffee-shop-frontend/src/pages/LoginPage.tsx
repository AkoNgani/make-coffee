import { useState } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { getUserFromGoogleOAuthAPI } from "@/service/googleOAuth";
import Title1 from "@/components/shared/typo/Title1";
import { useAuth } from "@/hooks/useAuth";
import { AuthUser } from "@/types";

export default function LoginPage() {
  // Auth Provider
  const { login: loginToApp } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [fbBtnClick, setFbBtnClick] = useState(false);

  const handleGLoginSuccess = async (tokenResponse: TokenResponse) => {
    console.log("Google OAuth Token Response:", tokenResponse);
    try {
      setLoading(true);
      const { access_token } = tokenResponse;

      if (!access_token) {
        throw new Error("Access token is missing.");
      }

      console.log("Google Access Token:", access_token);
      const res = await getUserFromGoogleOAuthAPI(access_token);
      console.log("Google API Response:", res);

      if (!res || !res.email) {
        throw new Error("Failed to fetch user details.");
      }

      const loggedInUser: AuthUser = {
        id: res.id,
        name: res.name,
        email: res.email,
        image: res.picture,
      };

      console.log("User Data for Login:", loggedInUser);
      loginToApp(loggedInUser, "/");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGLoginFail = (err: any) => {
    console.error("Google Login Fail:", err);
    alert("Google login failed. Please try again.");
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGLoginSuccess,
    onError: handleGLoginFail,
  });

  const handleFaceBookLoginClick = () => {
    setFbBtnClick(true);
    setTimeout(() => {
      setFbBtnClick(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-primary p-4">
        <div className="flex flex-col w-full max-w-md bg-gray-100 rounded-3xl p-10 mx-auto">
          <div className="flex items-center gap-3 mb-10 mx-auto">
            <img
              src="/images/app-logo.svg"
              alt="App Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-primary">
              <span className="block text-xl font-thin">Make</span>
              <span className="block text-2xl font-semibold">Coffee</span>
            </p>
          </div>
          <Title1 className="text-primary">Login</Title1>
          <p className="text-gray-500 font-medium mt-2">
            Sign in to continue your coffee journey
          </p>
          <div className="space-y-4 mt-12">
            <button
              onClick={() => handleGoogleLogin()}
              type="button"
              className="inline-flex items-center justify-center gap-2 w-full bg-white text-gray-800 text-sm font-medium border rounded-lg px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <svg
                className="w-5 h-5"
                viewBox="-3 0 262 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
              </svg>
              Sign in with Google
            </button>
            <hr />
            <button
              type="button"
              onClick={handleFaceBookLoginClick}
              className="inline-flex items-center justify-center gap-2 w-full bg-[#3b5998] hover:bg-[#3b5998]/90 text-white text-sm font-medium border rounded-lg px-5 py-2.5 focus:outline-none focus:ring-2 focus:[#3b5998]/50"
            >
              Sign in with Facebook
            </button>
            {fbBtnClick && (
              <p className="text-red-600 text-sm font-medium text-center">
                This feature is not implemented yet!
              </p>
            )}
          </div>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
    </>
  );
}
