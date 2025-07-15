import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { MdPhoneEnabled } from "react-icons/md";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const { createUser, loading, errorAuth } = useAuthentication();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await createUser(user);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="container m-auto flex flex-col mt-5">

      <div className="w-full max-w-96 flex flex-col m-auto border rounded shadow p-6">
        <h1 className="text-2xl mb-4">Nova Conta</h1>
        <p className="mb-4">Todos os campos são obrigatório.</p>

        <form className="w-full">
          <div className="mb-2">
            <label
              for="displayName"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Nome:
            </label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              id="displayName"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Digite seu nome."
              required
            />
          </div>
          <div className="mb-2">
            <label
              for="email"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              E-Mail:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@site.com"
              required
            />
          </div>
          <div className="mb-2">
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
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="**********"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirme a senha:
            </label>
            <input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              id="repeat-password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="**********"
              required
            />
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                checked={isChecked}
                onChange={handleCheckboxChange}
                id="terms"
                type="checkbox"
                value="yes"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label
              className="terms"
              class="ms-2 text-sm font-medium text-gray-900"
            >
              Concordo com os{" "}
              <Link
                to="#"
                className="text-blue-600 hover:underline"
              >
                termos e condições.
              </Link>
            </label>
          </div>

          {!loading ? (
            <button
              disabled={!isChecked}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Criar Nova Conta
            </button>
          ) : (
            <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Aguarde...
            </button>
          )}

          {error && (
            <div
              className="p-4 mt-4 text-center text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{error}</span>
            </div>
          )}

          {errorAuth && (
            <div
              className="p-4 mt-4 text-center text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">{errorAuth}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Register;
