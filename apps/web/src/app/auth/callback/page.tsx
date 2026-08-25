"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useAuth } from "@/contexts/auth-context";
import { getCurrentUser } from "@/http/endpoints";

/**
 * OIDC/login callback landing page.
 *
 * Auth cookies are set httpOnly by the API (via the Next.js proxy).
 * Tokens in the query string are intentionally ignored — never write JWTs
 * into document.cookie (XSS-readable).
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setIsAuthenticated, setIsAdmin } = useAuth();
  const t = useTranslations();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      let errorMessage = "Authentication failed";

      switch (error) {
        case "oauth_error":
          errorMessage = "OAuth authentication failed";
          break;
        case "missing_parameters":
          errorMessage = "Missing authentication parameters";
          break;
        case "registration_disabled":
          errorMessage = "Registration is disabled for this provider";
          break;
        case "provider_disabled":
          errorMessage = "This authentication provider is disabled";
          break;
        case "state_expired":
          errorMessage = "Authentication session expired";
          break;
        case "account_inactive":
          errorMessage = "Your account is inactive";
          break;
        default:
          errorMessage = "Authentication failed";
      }

      toast.error(errorMessage);
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        if (response?.data?.user) {
          const { isAdmin, ...userData } = response.data.user;
          setUser(userData);
          setIsAdmin(isAdmin);
          setIsAuthenticated(true);
          toast.success(t("auth.successfullyAuthenticated"));
          router.push("/dashboard");
        } else {
          throw new Error("No user data received");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error(t("auth.authenticationFailed"));
        router.push("/login");
      }
    };

    fetchUserData();
  }, [router, searchParams, setUser, setIsAuthenticated, setIsAdmin, t]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Processing authentication...</p>
      </div>
    </div>
  );
}
