import React from "react";
import FeaturesComponent from "@/components/features-component";

function page() {
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
            <form className="space-y-6">
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
                  name="email"
                  required
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
                  name="password"
                  required
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
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-button-bg hover:bg-button-bg/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg dark:focus:ring-offset-gray-900 transition-colors"
                >
                  Sign in
                </button>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
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
