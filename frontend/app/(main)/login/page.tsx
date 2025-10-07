"use client";
import React, { useState, useEffect } from "react";
import FeaturesComponent from "@/components/features-component";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { smartFetch } from "@/lib/fetcher";
import { LOGIN_EP } from "@/lib/endpoints";

interface LoginResponse {
  status?: number;
  message?: string;
}

function page() {
  // const [data, action, isPending] = useActionState(login, null);
  const [isPending, setIsPending] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [xError, setXError] = useState<{
    status?: number;
    message?: string;
  } | null>(null);
  const [hasInputChanged, setHasInputChanged] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasInputChanged) {
      setHasInputChanged(true);
    }
    const email = e.target.id === "email" ? e.target.value : watch("email", "");
    const password =
      e.target.id === "password" ? e.target.value : watch("password", "");
    const disableButton = !email || !password;
    setDisableButton(disableButton);
  };

  async function login(formData: any) {
    setHasInputChanged(false);
    setIsPending(true);
    const xData = {
      email: formData.email as string,
      password: formData.password as string,
    };

    try {
      const res: { status: number; message?: string } = await smartFetch(
        LOGIN_EP,
        {
          method: "POST",
          body: xData,
        }
      );
      console.log("Loginres34324324:", res);
      if (res && res.status === 200) {
        setXError({ status: res.status, message: "Login Successful" });
      } else if (res.status == 403) {
        setXError({
          status: res.status,
          message: res.message || "OTP Required",
        });
        setTimeout(() => {
          router.push("/otp");
        }, 2000);
      } else {
        setXError({
          status: res.status,
          message: res.message || "Login Failed",
        });
      }
    } catch (err) {
      console.error("Loginerror:", err);
      // return err;
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="flex items-center justify-center flex-1 bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Features section - hidden on mobile, visible on lg+ */}
          <div className="hidden lg:block">
            <FeaturesComponent />
          </div>
          {/* Login form */}
          <div className="bg-background rounded-lg px-8 py-10 mx-auto max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Log in to prepare, practice, and perform.
            </h2>
            {xError && !hasInputChanged ? (
              <div className="mb-6">
                {(xError as LoginResponse).status === 200 ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Login successful!
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {(xError as LoginResponse).message ||
                        "An error occurred. Please try again."}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  // name="email"
                  // required
                  {...register("email")}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  // name="password"
                  // required
                  {...register("password")}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-button-bg focus:ring-gray-400 dark:focus:ring-gray-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-button-bg hover:text-button-bg/80 dark:text-button-bg dark:hover:text-button-bg/80"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isPending || disableButton}
                  className={` ${
                    disableButton ? "opacity-60 cursor-not-allowed" : ""
                  } w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-button-bg hover:bg-button-bg/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg dark:focus:ring-offset-gray-900 transition-colors`}
                >
                  Sign in
                </button>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-button-bg hover:text-button-bg/80 dark:text-button-bg dark:hover:text-button-bg/80"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
