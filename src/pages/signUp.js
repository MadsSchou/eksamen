import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function signUp() {
  const { login, signUp } = useAuth();
  const router = useRouter();
  async function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.password_confirmation.value;
    const name = e.target.name.value;

    auth.createUserWithEmailAndPassword(email, password).then((e) => {
      console.log(e.user.uid);
      db.collection("users").doc(e.user.uid).set({
        name: name,
      });

      router.push("/dashboard");
    });
  }

  async function handleLogIn(e) {
    e.preventDefault();

    try {
      await login(e.target.email.value, e.target.password.value);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <div>
        <h1>Log ind</h1>
        <form onSubmit={(e) => handleLogIn(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Log ind</button>
        </form>
      </div>
      <div>
        <h1>Opret bruger</h1>

        <form onSubmit={(e) => handleSignUp(e)}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="password_confirmation">
              Password Confirmation:{" "}
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
            />
          </div>

          <input type="submit" value={"opret"} />
        </form>
      </div>
    </div>
  );
}
