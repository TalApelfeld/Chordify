import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface responseProps {
  status: string;
  token: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate for redirection

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        // Adjust the API endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
        body: JSON.stringify({ email, password }),
      });

      const data: responseProps = await response.json();
      console.log(data);

      if (data.status === "success") {
        setLoading(false);
        navigate("/home"); // Redirect to home page on success
      } else {
        throw new Error(data.status || "Failed to sign up");
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  return (
    <>
      <form className="login-page-container" onSubmit={handleLogin}>
        <div className="login-form">
          <h1 className="text-4xl pt-8">Discover your learning path</h1>

          {/* //* inputs container */}
          <div className="mt-9">
            {/* top input */}
            <div className="mb-6">
              <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="input-top w-7/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="jhon.doe@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* bottom input */}
            <div className="mb-6">
              <label className="block  text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-bottom w-7/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 input-bottom"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  className="input-bottom bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  Submit
                </button>
                <div className="mt-3">
                  <a href="signup" className="underline ">
                    signup
                  </a>
                </div>
              </>
            )}

            <div>
              <ul className={styles.set}>
                <li
                  className={`${styles.white} ${styles.b} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_A4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>A4</p>
                </li>

                <li
                  className={`${styles.black} ${styles.as} ${styles.li}`}
                ></li>

                <li
                  className={`${styles.white} ${styles.a} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_B4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>B4</p>
                </li>

                <li
                  className={`${styles.black} ${styles.gs} ${styles.li}`}
                ></li>

                <li
                  className={`${styles.white} ${styles.g} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_C4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>C4</p>
                </li>

                <li
                  className={`${styles.black} ${styles.fs} ${styles.li}`}
                ></li>

                <li
                  className={`${styles.white} ${styles.f} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_D4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>D4</p>
                </li>

                <li
                  className={`${styles.white} ${styles.e} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_E4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>E4</p>
                </li>

                <li
                  className={`${styles.black} ${styles.ds} ${styles.li}`}
                ></li>

                <li
                  className={`${styles.white} ${styles.d} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_F4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>F4</p>
                </li>

                <li
                  className={`${styles.black} ${styles.cs} ${styles.li}`}
                ></li>

                <li
                  className={`${styles.white} ${styles.c} ${styles.li}`}
                  onClick={() => {
                    const audio = new Audio(`/assets/piano-mp3_G4.mp3`);
                    audio.play();
                  }}
                >
                  <p className={styles.label}>G4</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
