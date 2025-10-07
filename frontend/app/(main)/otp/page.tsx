"use client";
import React, { useState, useEffect } from "react";
import FeaturesComponent from "@/components/features-component";
import { OTP_EP } from "@/lib/endpoints";
import { smartFetch } from "@/lib/fetcher";
import { CheckCircle, AlertCircle, RotateCcw } from "lucide-react";

function page() {
  const [xError, setXError] = useState<{
    status?: number;
    message?: string;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // seconds left

  // OPTIONAL: align loop with input names (otp-1..otp-6)
  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setXError(null);
    const formData = new FormData(e.target as HTMLFormElement);
    const otpValues: string[] = [];
    for (let i = 1; i <= 6; i++) {
      const val = formData.get(`otp-${i}`) as string | null;
      otpValues.push(val || "");
    }
    const otp = otpValues.join("");
    console.log("OTPtoverify:", otp);

    try {
      const res: { status: number; message?: string } = await smartFetch(
        OTP_EP,
        {
          method: "POST",
          body: { otp },
        }
      );
      console.log("OTPverifyres:", res);
      if (res && res.status === 200) {
        setXError({ status: res.status, message: "OTP Verified Successfully" });
      } else {
        setXError({
          status: res.status,
          message: res.message || "OTP Verification Failed",
        });
      }
    } catch (err) {
      console.error("OTPverifyerror:", err);
      // return err;
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;
    setIsResending(true);
    setXError(null);
  };

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(
      () => setResendTimer((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(t);
  }, [resendTimer]);

  return (
    <main className="flex items-center justify-center flex-1 bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Features section - hidden on mobile, visible on lg+ */}
          <div className="hidden lg:block">
            <FeaturesComponent />
          </div>
          {/* otp section */}
          <div className="bg-background rounded-lg px-8 py-10 mx-auto max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Enter the OTP sent to your email.
            </h2>

            <form onSubmit={verifyOtp} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="space-y-4">
                {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  Verification Code
                </label> */}
                {xError ? (
                  <div className="mb-6">
                    {xError.status === 200 ? (
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
                          {xError.message ||
                            "An error occurred. Please try again."}
                        </p>
                      </div>
                    )}
                  </div>
                ) : null}
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`} // FormData will collect these
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-semibold rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent transition-colors"
                      onInput={(e) => {
                        setXError(null);
                        const target = e.target as HTMLInputElement;
                        if (target.value && target.nextElementSibling) {
                          (
                            target.nextElementSibling as HTMLInputElement
                          ).focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (
                          e.key === "Backspace" &&
                          !target.value &&
                          target.previousElementSibling
                        ) {
                          (
                            target.previousElementSibling as HTMLInputElement
                          ).focus();
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-button-bg hover:bg-button-bg/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg dark:focus:ring-offset-gray-900 transition-colors disabled:opacity-50"
              >
                {isPending ? "Verifying..." : "Verify OTP"}
              </button>

              {/* Resend OTP UI */}
              <div className="text-center flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <span>Didn't get the code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0 || isPending || isResending}
                  className="ml-2 inline-flex items-center gap-1 font-medium text-button-bg hover:text-button-bg/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  {isResending
                    ? "Sending..."
                    : resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : "Resend OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
