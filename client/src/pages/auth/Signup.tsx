import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Errors = {
  [key: string]: string;
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  const fields = ["Name", "Email", "Password"];
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.placeholder;
    const value = e.target.value;

    switch (type) {
      case "Name":
        setName(value.trim());
        setErrors({ ...errors, name: "" });
        break;
      case "Email":
        setEmail(value.trim());
        setErrors({ ...errors, email: "" });
        break;
      case "Password":
        setPassword(value.trim());
        setErrors({ ...errors, password: "" });
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,4})$/;
    let formErrors = {
      name: "",
      email: "",
      password: "",
    };
    let valid = true;

    if (name.length < 3) {
      formErrors = { ...formErrors, name: "Please enter a valid name" };
      valid = false;
    }
    if (!emailRegex.test(email)) {
      formErrors = {
        ...formErrors,
        email: "Please enter a valid email address",
      };
      valid = false;
    }
    if (password.length < 8) {
      formErrors = {
        ...formErrors,
        password: "Password should be at least 8 characters long",
      };
      valid = false;
    }
    setErrors({
      ...formErrors,
    });

    if (valid) {
      try {
        const user = {
          name: name,
          email: email,
          password: password,
        };
        const response = await axios.post("http://localhost:8080/signup", user);
        console.log("User signed up successfully!", response.data);
        navigate("/");
      } catch (error) {
        setErrors({
          ...errors,
          email: "An account with this email already exists!",
        });
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-left text-3xl font-bold">Expenda</h1>
      <form
        className="flex w-full max-w-xs flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        {fields.map((field) => {
          return (
            <div className="form-control w-full max-w-xs" key={field}>
              <label className="label">
                <span className="label-text">{field}</span>
              </label>
              <input
                type={field === "Password" ? "password" : "text"}
                placeholder={field}
                className={`input input-bordered w-full max-w-xs placeholder-white placeholder-opacity-30 ${
                  errors[field.toLowerCase()] && "input-error"
                }`}
                onChange={handleChange}
              />
              {errors[field.toLowerCase()] && (
                <p className="p-1 text-sm font-extralight text-error">
                  {errors[field.toLowerCase()]}
                </p>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="btn btn-accent mt-6 w-full normal-case"
        >
          Sign up
        </button>
      </form>
      <p className="mt-20 opacity-60">
        Already have an account?{" "}
        <span
          className="cursor-pointer text-accent"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
