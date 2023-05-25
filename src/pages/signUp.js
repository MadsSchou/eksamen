import { auth, db } from "@/firebase";
import React from "react";

export default function signUp() {
  function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.password_confirmation.value;
    const name = e.target.name.value;

    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred);
      db.collection("users").doc(cred.user.uid).set({
        name: name,
      });
    });
    console.log(email);
  }
  return (
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
          <label htmlFor="password_confirmation">Password Confirmation: </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
          />
        </div>

        <input type="submit" value={"opret"} />
      </form>
    </div>
  );
}
