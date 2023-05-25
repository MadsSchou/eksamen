import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import { useRouter } from "next/router";
import React from "react";
import styles from "./signUp.module.css";

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
    <div className={styles["content"]}>
      <div className={styles["grid_1-1"]}>
        <div className={styles["login_form"]}>
          <h1 className={styles["welcome"]}>Velkommen tilbage!</h1>
          <form onSubmit={(e) => handleLogIn(e)}>
            <div className={styles[["input-container"]]}>
              <label className={styles["white"]} htmlFor="email">
                Email
              </label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className={styles[["input-container"]]}>
              <label className={styles["white"]} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button className={styles["button"]} type="submit">
              Log ind
            </button>
          </form>
        </div>

        <div className={styles["signUp_form"]}>
          <form onSubmit={(e) => handleSignUp(e)}>
            <div className={styles["input-container"]}>
              <h1 className={styles[["make_user"]]}>Opret bruger</h1>
              <label htmlFor="name">Name: </label>
              <input type="text" id="name" name="name" placeholder="Navn" />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email: </label>
              <input type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password_confirmation">
                Password Confirmation:{" "}
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Gentag password"
              />
            </div>

            <input className={styles["button"]} type="submit" value={"opret"} />
          </form>
        </div>
      </div>
    </div>
  );
}
