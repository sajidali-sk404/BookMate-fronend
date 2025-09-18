// VerifyEmailPage.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmailPage({ autoSubmit = false }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");      // 6-digit code flow
  const [token, setToken] = useState("");    // token flow (longer secure token)
  const [verifying, setVerifying] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const COOLDOWN_SECONDS = 60;

  const navigate = useNavigate();
  const location = useLocation(); // read query params

  // Parse URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qEmail = params.get("email") ?? "";
    const qCode = params.get("code") ?? "";   // code param if using 6-digit codes
    const qToken = params.get("token") ?? ""; // token param if using link token

    if (qEmail) {
      setEmail(decodeURIComponent(qEmail).trim().toLowerCase());
    } else {
      const storedEmail = localStorage.getItem("pendingEmail");
      if (storedEmail) {
        setEmail(storedEmail.trim().toLowerCase());
      }
    }
    if (qCode) setCode(qCode.trim());
    if (qToken) setToken(qToken.trim());

    // Optionally auto-submit when link has both email + code/token
    if (autoSubmit && ((qEmail && (qCode || qToken)))) {
      // small delay so UI updates before auto-submit
      setTimeout(() => {
        // call verify handler below
        document.getElementById("verify-form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // basic email validator
  const validateEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const handleVerify = async (e) => {
    e?.preventDefault?.();
    const normalizedEmail = (email || "").trim().toLowerCase();
    // prefer token if present
    const payload = token ? { email: normalizedEmail, token } : { email: normalizedEmail, code: (code || "").trim() };

    if (!normalizedEmail) return toast.info("Please enter your email.");
    if (!validateEmail(normalizedEmail)) return toast.error("Please enter a valid email.");

    if (!token && !/^\d{6}$/.test((code || "").trim())) {
      return toast.error("Please enter the 6-digit verification code.");
    }

    setVerifying(true);
    try {
      const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/verify-email`, payload);
      toast.success(resp.data?.message ?? "Verified!");
      localStorage.removeItem("pendingEmail");
      // give toast a moment to display
      setTimeout(() => navigate("/login"), 400);
    } catch (err) {
      const serverMsg = err?.response?.data?.message ?? err?.response?.data?.message;
      toast.error(serverMsg || err.message || "Verification failed");
      console.error("verify error:", err);
    } finally {
      setVerifying(false);
    }
  };

  // Paste from clipboard and auto-extract 6-digit code
  const handlePasteCodeFromClipboard = useCallback(async () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported in this browser.");
      return;
    }
    try {
      const text = (await navigator.clipboard.readText()).trim();
      // look for first 6-digit group
      const match = text.match(/\b(\d{6})\b/);
      if (match) {
        setCode(match[1]);
        toast.success("Code pasted from clipboard");
      } else {
        toast.info("No 6-digit code found in clipboard.");
      }
    } catch (err) {
      console.error("clipboard read failed:", err);
      toast.error("Unable to read clipboard. Please paste manually.");
    }
  }, []);

  // Resend code handler (same as earlier)
  const handleResend = async (e) => {
    e?.preventDefault?.();
    if (!email) return toast.info("Please enter your email to resend the code.");
    if (!validateEmail(email.trim())) return toast.error("Please enter a valid email address.");
    if (resendLoading || cooldown > 0) return;

    try {
      setResendLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/resend-code`, { email: email.trim().toLowerCase() });
      setCooldown(COOLDOWN_SECONDS);
      toast.success("Verification code resent. Check your email.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend code.");
      console.error("resend error:", err);
    } finally {
      setResendLoading(false);
    }
  };

  // cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(t);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Email</h2>

        <form id="verify-form" onSubmit={handleVerify} className="space-y-4">
          <div className="my-5">
            <input
              type="email"
              value={email}
              readOnly
              className="p-3 w-full text-center text-2xl rounded-lg text-gray-800 cursor-not-allowed"
            />

          </div>
          {/* show either code input or token input depending on your flow */}
          {!token && (
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="p-3 w-full border rounded-lg"
                required
                maxLength={6}
                pattern="\d{6}"
              />
              <button
                type="button"
                onClick={handlePasteCodeFromClipboard}
                className="absolute right-2 top-2 bg-gray-200 px-3 py-1 rounded text-sm"
              >
                Paste
              </button>
            </div>
          )}

          {token && (
            <input
              type="text"
              placeholder="Token (from link)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-3 w-full border rounded-lg"
            />
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white ${verifying ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            disabled={resendLoading || cooldown > 0}
            className={`px-4 py-2 rounded-md font-medium shadow-sm transition ${resendLoading || cooldown > 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
          >
            {resendLoading ? "Resending..." : cooldown > 0 ? `Resend available in ${cooldown}s` : "Resend code"}
          </button>
        </div>

        <div className="mt-3 text-sm text-center text-gray-600">
          Didn't receive the email? Check spam, click the link in your email, or paste the code from your clipboard.
        </div>
      </div>
    </div>
  );
}
