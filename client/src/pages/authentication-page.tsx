import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import { Toaster } from "@/components/ui/sonner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";

const AuthenticationPage = () => {
  const { type } = useParams<{ type: string }>();
  const [showForm, setShowForm] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    if (type !== "login" && type !== "register") {
      toast.error("Invalid authentication type.");
      setShowForm(null);
    } else {
      setShowForm(type);
    }
  }, [type]);

  const isLogin = showForm === "login";
  const isRegister = showForm === "register";

  return (
    <div
      className={clsx("flex min-h-svh transition-all duration-300", {
        "flex-row": isLogin,
        "flex-row-reverse": isRegister,
      })}
    >
      <div className="w-full lg:w-1/2 flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs transition-all duration-300">
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
            <Toaster />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block w-1/2 bg-muted transition-all duration-300">
        <img
          src="/public/image.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthenticationPage;
