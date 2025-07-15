
import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, loading, errorAuth } = useAuthentication();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if(!email) {
        setError("Digite seu e-mail!");
        return;
    }

    if(!password) {
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
    <section className="container max-w-5xl m-auto flex h-[calc(100vh-150px)] mt-5">
      <div className="flex flex-col m-auto border rounded shadow p-6">
        <h1 className="text-2xl mb-4">Login</h1>
        <p className="mb-4">Entre com seus dados.</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="flex flex-col mb-2">
            <span className="text-xs">E-Mail:</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail."
              className="w-96 h-10 p-2 border shadow rounded"
            />
          </label>
          <label className="flex flex-col mb-2">
            <span className="text-xs">Senha:</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="w-96 h-10 p-2 border shadow rounded"
            />
          </label>
           {!loading ? (
            <button className="w-full bg-blue-500 text-white flex items-center justify-center h-12 shadow rounded">
              Entrar
            </button>
          ) : (
            <button className="w-full bg-gray-400 text-black flex items-center justify-center h-12 shadow rounded">
              Aguarde...
            </button>
          )}

          {error && (
            <div className="flex items-center justify-center h-12 w-full bg-red-600 text-white rounded shadow mt-2">
              {error}
            </div>
          )}

          {errorAuth && (
            <div className="flex items-center justify-center h-12 w-full bg-orange-500 text-white rounded shadow mt-2">
              {errorAuth}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Register;
