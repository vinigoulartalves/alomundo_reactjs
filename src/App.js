import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/mensagem")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar a mensagem");
        }
        return res.json();
      })
      .then((data) => {
        setMensagem(data.mensagem);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro: {error.message}</p>
      ) : (
        <h1>{mensagem}</h1>
      )}
    </div>
  );
}

export default App;
