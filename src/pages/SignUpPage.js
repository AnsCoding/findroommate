import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export default function SignUpPage({ showLoader }) {
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  useEffect(() => {
    showLoader(false);
  }, [showLoader]);

  function handleSignUp(event) {
    event.preventDefault();
    const email = event.target.mail.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        let code = error.code;
        code = code.replaceAll("-", " ");
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  return (
    <section className="page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input type="email" name="mail" placeholder="Type your mail" />
        <input
          type="password"
          name="password"
          placeholder="Type your password"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Sign Up</button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </section>
  );
}
