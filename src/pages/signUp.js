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
        <div className={styles["login_col"]}>
          <h1 className={styles["welcome"]}>Velkommen tilbage!</h1>
          <form
            className={styles["login_form"]}
            onSubmit={(e) => handleLogIn(e)}
          >
            <div className={styles[["input-container"]]}>
              <label className={styles["white"]} htmlFor="email">
                Email
              </label>
              <input
                className={styles["input_field"]}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className={styles[["input-container"]]}>
              <label className={styles["white"]} htmlFor="password">
                Password
              </label>
              <input
                className={styles["input_field"]}
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

        <div className={styles["signup_col"]}>
          <h1 className={styles[["make_user"]]}>Opret bruger</h1>
          <form
            className={styles["signUp_form"]}
            onSubmit={(e) => handleSignUp(e)}
          >
            <div className={styles["input-container"]}>
              <label htmlFor="name">Name: </label>
              <input
                className={styles["input_field"]}
                type="text"
                id="name"
                name="name"
                placeholder="Navn"
              />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email: </label>
              <input
                className={styles["input_field"]}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password">Password: </label>
              <input
                className={styles["input_field"]}
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
                className={styles["input_field"]}
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Gentag password"
              />
            </div>

            <button className={styles["button"]} type="submit">
              Opret
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
