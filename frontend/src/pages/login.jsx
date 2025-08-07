import { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BASE_URL } from "@/utils/func";



const API_URL = BASE_URL;

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth()

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.msg || "Login failed");
      else {
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        login(data.token, data.user)
        // redirect as needed
        setTimeout(() => navigate("/settings"), 500);
      }
    } catch {
      toast.error("Server error")
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen  min-w-screen gap-2">

      <div className=" hidden md:flex md:flex-col pt-40  basis-1/2 px-4 ">
        <h1 className=" scroll-m-20  text-7xl font-extrabold tracking-tight text-balance mb-7">SocioHub</h1>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet non quibusdam itaque error eos? Sit dignissimos veniam, nostrum voluptates sunt iusto accusamus! Ea, eaque aperiam nostrum aspernatur itaque placeat repellendus.

        </p>
      </div>
      <div className="w-90 m-auto md:basis-1/2  flex flex-col items-center justify-center border-l-1 ">
        <h1 className=" md:hidden scroll-m-20  text-7xl font-extrabold tracking-tight text-balance self-start mb-10">SocioHub</h1>
        <Card className="w-full max-w-md ">
          <CardHeader>
            <h2>Sign In</h2>
            {/* <h2 className="text-2xl font-bold text-center">Sign In</h2> */}
          </CardHeader>
          <CardContent>


            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className={"mb-2"} htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={loading}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <Label className={"mb-2"} htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                  disabled={loading}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                />
              </div>
              <Button className="w-full mt-2" disabled={loading}>
                {loading ? (
                  <span className="animate-spin"> <LoaderCircle /> </span>

                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link className="underline text-blue-600" to="/register">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
