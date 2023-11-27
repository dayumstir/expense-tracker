import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId, setUserName, setUserEmail } from "../../redux/userSlice";
import axios from "axios";

type Errors = {
  [key: string]: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const fields = ["Email", "Password"];
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.placeholder;
    const value = e.target.value;

    switch (type) {
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
    let formErrors = {
      email: "",
      password: "",
    };
    let valid = true;

    if (email === "") {
      formErrors = { ...formErrors, email: "Please enter your email" };
      valid = false;
    }
    if (password === "") {
      formErrors = { ...formErrors, password: "Please enter your password" };
      valid = false;
    }
    setErrors({
      ...formErrors,
    });

    if (valid) {
      try {
        const user = {
          email: email,
          password: password,
        };
        const response = await axios.post("http://localhost:8080/login", user);

        updateUserRedux({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        });
        navigate("/");
      } catch (error) {
        setErrors({
          email: "Username/password is incorrect!",
          password: "Username/password is incorrect!",
        });
        console.error("Login failed:", error);
      }
    }
  };

  const updateUserRedux = ({
    id,
    name,
    email,
  }: {
    id: number;
    name: string;
    email: string;
  }) => {
    dispatch(setUserId(id));
    dispatch(setUserName(name));
    dispatch(setUserEmail(email));
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
          Login
        </button>
      </form>
      <p className="mt-20 opacity-60">
        Don't have an account?{" "}
        <span
          className="cursor-pointer text-accent"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
