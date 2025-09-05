import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitora o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = () => {
    console.log("signed out")
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao sair: ", error);
      });
  };

  if (!user) {
    return null; // Exibe nada enquanto o estado de autenticação é carregado
  }

  return (
    <div className="perfil-fullscreen" id="perfil">
      <div className="dark-background"></div>

      {/* dados do usuario */}
      <div className="perfil-container">
        <div className="perfil-info">
          <div className="perfil-header">
            <img
              className="perfil-image"
              src={user.photoURL}
              alt={user.displayName}
            />
          </div>
          <div className="perfil-row">
            <p className="perfil-label">Nome: </p>
            <p className="perfil-value">{user.displayName}</p>
          </div>
          <div className="perfil-row">
            <p className="perfil-label">Email: </p>
            <p className="perfil-value">{user.email}</p>
          </div>
          <button
            type="button"
            className="perfil-button"
            disabled={false}
            onClick={() => handleSignOut()}
          >
            Sair da conta
          </button>
        </div>
      </div>

    </div>
  );
};

export default Perfil;
