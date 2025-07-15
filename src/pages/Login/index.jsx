import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading, errorAuth } = useAuthentication();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError("Digite seu e-mail!");
      return;
    }

    if (!password) {
      setError("Digite sua senha!");
      return;
    }

    const user = {
      email,
      password,
    };

    const res = await login(user);
  }

  return (
    <main className="container m-auto flex h-[calc(100vh-180px)] mt-5">

      <section className="w-full max-w-96 flex flex-col m-auto border rounded shadow p-6">
        <h1 className="text-2xl mb-4">Login</h1>
        <p className="mb-4">Entre com seus dados.</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-2">
            <label
              for="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              E-mail:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="name@site.com"
              required
            />
          </div>
          <div className="mb-3">
            <label
              for="password"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Senha:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
              placeholder="**********"
            />
          </div>
          
          {!loading ? (
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Entrar
            </button>
          ) : (
            <button className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Aguarde...
            </button>
          )}

          {error && (
            <div
              className="p-4 mt-4 text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span class="font-medium">{error}</span>
            </div>
          )}

          {errorAuth && (
            <div
              className="p-4 mt-4 text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{errorAuth}</span>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default Register;
