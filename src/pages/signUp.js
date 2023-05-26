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
            <div className={styles["field"]}>
              <label htmlFor="email">Email</label>
              <div className={styles[["input-container"]]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="darkgrey"
                  class="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className={styles["field"]}>
              <label className={styles["white"]} htmlFor="password">
                Password
              </label>
              <div className={styles[["input-container"]]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="darkgrey"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
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
            <div className={styles["field"]}>
              <label htmlFor="name">Name: </label>
              <div className={styles["input-container"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="darkgrey"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <input type="text" id="name" name="name" placeholder="Navn" />
              </div>
            </div>
            <div className={styles["field"]}>
              <label htmlFor="email">Email: </label>
              <div className={styles["input-container"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="darkgrey"
                  class="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className={styles["field"]}>
              <label htmlFor="password">Password: </label>
              <div className={styles["input-container"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="darkgrey"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className={styles["field"]}>
              <label htmlFor="password_confirmation">Confirm password: </label>
              <div className={styles["input-container"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="darkgrey"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Gentag password"
                />
              </div>
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
