import React, { useState } from "react";

interface CreateAcountParams {
  username: string;
  phone: string;
}

interface SignInParams {
  phone: string;
}

interface LoginProps {
  show: boolean;
  setAuth: (auth: any) => void;
}

interface FormProps {
  setAuth: (auth: any) => void;
}

async function createAccount({ username, phone }: CreateAcountParams) {
  try {
    const url = "http://localhost:8080/users/create";
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, phone }),
    });

    return result.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

async function signIn({ phone }: SignInParams) {
  try {
    const url = "http://localhost:8080/users/phone/" + phone;
    let result = await fetch(url);
    return result.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

const Login = ({ show, setAuth }: LoginProps) => {
  const [isShowSignIn, setIsShowSignIn] = useState(false);
  const toggleIsShowSignIn = () => {
    setIsShowSignIn((prev) => !prev);
  };

  const FormCreateUsername = ({ setAuth }: FormProps) => {
    const onCreateUsername = async (e: any) => {
      e.preventDefault();
      let username = e.target.username.value;
      let phone = e.target.phone.value;
      if (username === "" || phone === "") {
        return;
      }
      let result = await createAccount({ username, phone });
      if (result === null) {
        alert("Failed to register your new account");
        return;
      }

      setAuth(result);
    };

    return (
      <form action="" className="mt-4 space-y-2" onSubmit={onCreateUsername}>
        <div>
          <label className="text-sm font-light">Username</label>
          <input
            required
            type="text"
            name="username"
            placeholder="John Doe"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="text-sm font-light">Phone</label>
          <input
            required
            type="text"
            name="phone"
            placeholder="+1111..."
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-baseline justify-between">
          <button
            type="submit"
            className="px-6 py-2 mt-4 text-white bg-violet-600 rounded-lg hover:bg-violet-700 w-full"
          >
            Submit
          </button>
        </div>
        <div className="pt-2 space-y-2 text-center">
          <p className="text-base text-gray-700">
            Already have a username?{" "}
            <button
              onClick={toggleIsShowSignIn}
              className="text-violet-700 font-light"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    );
  };

  const FormSignIn = ({ setAuth }: FormProps) => {
    const onSignIn = async (e: any) => {
      e.preventDefault();
      let phone = e.target.phone.value;
      if (phone === "") {
        return;
      }
      let result = await signIn({ phone });
      if (result === null) {
        alert("Failed to sign in");
        return;
      }
      if (!result.id) {
        alert(`Phone number not found ${phone}`);
        return;
      }

      setAuth(result);
    };

    return (
      <form action="" className="mt-4 space-y-2" onSubmit={onSignIn}>
        <div>
          <label className="text-sm font-light">Phone</label>
          <input
            required
            type="text"
            name="phone"
            placeholder="+1111..."
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-baseline justify-between">
          <button
            type="submit"
            className="px-6 py-2 mt-4 text-white bg-violet-600 rounded-lg hover:bg-violet-700 w-full"
          >
            Submit
          </button>
        </div>
        <div className="pt-2 space-y-2 text-center">
          <p className="text-base text-gray-700">
            Don't have username?{" "}
            <button
              onClick={toggleIsShowSignIn}
              className="text-violet-700 font-light"
            >
              Create
            </button>
          </p>
        </div>
      </form>
    );
  };

  return (
    <div
      className={`${
        show ? "" : "hidden"
      } bg-gradient-to-b from-orange-400 to-rose-400`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left bg-white  max-w-[400px] w-full rounded-xl shadow-lg">
          <h3 className="text-xl text-slate-800 font-semibold">
            {isShowSignIn ? "Log in with your phone." : "Create your account."}
          </h3>
          {isShowSignIn ? (
            <FormSignIn setAuth={setAuth} />
          ) : (
            <FormCreateUsername setAuth={setAuth} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
