import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/clientes/login", {
        email,
        password,
      });
      alert(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Credenciais inválidas");
      } else {
        setError("Erro ao tentar fazer login");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email">Endereço de email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-danger">{error}</div>}
              <div className="my-3">
                <p>
                  Novo aqui? <Link to="/register" className="text-decoration-underline text-info">Cadastrar</Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
