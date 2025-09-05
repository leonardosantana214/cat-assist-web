import React from "react";
import "./style.css";
import { FaStar } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../services/firebase/firebase";

const Avaliacao = () => {
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false); // Para saber se foi enviado

  const location = useLocation();
  const navigate = useNavigate();

  // Função que lida com a avaliação
  const handleRating = (star) => {
    setRating(star);
  };

  var user = auth.currentUser;

  // Função que lida com o envio da avaliação para o Firebase
  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação de 1 a 5.");
      return;
    }

    try {
      // Envia os dados para o Firestore
      await addDoc(collection(db, "rate"), {
        rating, // Valor da avaliação
        suggestion, // Sugestão do usuário
        timestamp: new Date(),
        name: user.displayName,
      });

      setSubmitted(true);

      alert("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a avaliação: ", error);
      alert("Erro ao enviar a avaliação.");
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      // Limpa o timeout quando o componente for desmontado
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  return (
    <div>
      <div className="container-fluid" id="container-rating">
        <div className="left-container">
          <img
            src={require("../../assets/avaliacao-images/background-rating.jpg")}
            alt="Alanzoka"
            className="left-img"
          />
          <div className="redfilter"></div>
        </div>

        {/* Verifica se a avaliação foi enviada */}
        {!submitted ? (
          <div className="right-container">
            <h3>
              Em uma escala de 1 a 5, o quanto você apreciou o nosso serviço?
            </h3>
            <div className="starsContainer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaStar
                    size={40}
                    color={star <= rating ? "#FFD700" : "#D3D3D3"}
                    style={{ transition: "color 0.2s" }}
                  />
                </button>
              ))}
            </div>

            <h5 className="text-suggestion mt-4">
              Alguma sugestão para melhorarmos nosso serviço?
            </h5>
            <textarea
              className="mt-4"
              placeholder="Nos dê alguma dica"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            ></textarea>

            <button className="mt-4" onClick={handleSubmit}>
              Enviar
            </button>
          </div>
        ) : (
          <div className="right-container" id="thanks-message">
            <p>Avaliação enviada! Obrigado pelo feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avaliacao;
