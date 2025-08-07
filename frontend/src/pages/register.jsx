import { useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";


import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { BASE_URL } from "@/utils/func";

{/* <Button onClick={() => toast.error('Event has been created', {
                        description: 'Monday, January 3rd at 6:00pm',
                    })}>tesss</Button> */}


const API_URL = BASE_URL;




export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", firstName: "", lastName: "", email: "", password: "", bio: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatForm = () => {
      form.name = form.firstName.trim() + " " + form.lastName.trim()
      delete form.firstName;
      delete form.lastName;
      return JSON.stringify(form)
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formatForm(),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.msg || "Signup failed")

      }
      else {
        toast.success("Account created! Log in below.")
        setTimeout(() => navigate("/login"), 500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error")

    }

    setLoading(false);
  };


  return (


    <div className="md:flex md:flex-row flex-col items-center  min-h-screen  min-w-screen gap-2">
      <div className=" flex flex-col pt-10 basis-1/2 px-4   mb-7">
        <h1 className=" scroll-m-20  text-7xl font-extrabold tracking-tight text-balance mb-7">SocioHub</h1>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet non quibusdam itaque error eos? Sit dignissimos veniam, nostrum voluptates sunt iusto accusamus! Ea, eaque aperiam nostrum aspernatur itaque placeat repellendus.

        </p>
      </div>
      <div className="basis-1/2 flex items-center justify-center border-l-1 p-5 md:p-0">

        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          </CardHeader>
          <CardContent>


            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className={"mb-2"} htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  disabled={loading}
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                />
              </div>
              <div>
                <Label className={"mb-2"} htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  disabled={loading}
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                />
              </div>
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
                  minLength={6}
                  disabled={loading}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Choose a password"
                />
              </div>
              {/* <div>
              <Label htmlFor="bio">Bio</Label>
              <Input
                type="text"
                id="bio"
                name="bio"
                disabled={loading}
                value={form.bio}
                onChange={handleChange}
                placeholder="A short bio"
              />
            </div> */}
              <Button className="w-full mt-2" disabled={loading}>
                {loading ? (

                  <span className="animate-spin"> <LoaderCircle /> </span>


                ) : (
                  "Register"
                )}
              </Button>
            </form>
            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link className="underline text-blue-600" to="/login">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
