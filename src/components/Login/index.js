import React, { useState } from "react";
import Footer from "../Templates/Footer";
import IntersectionObserverComponent from "../animation/useIntersectionObserver.js";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";

import { db, auth, provider } from "../../services/firebase/firebase.js";

import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  deleteDoc,
  getDocs,
  doc
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { v4 as uuidv4 } from "uuid";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Login e Cadastro

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const photoURL = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";

  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const toggleAuthMode = () => {
    setLoading(true);
    setIsLogin(!isLogin);

    // Desativa o loading após 2 segundos
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const updateEmployees = async () => {
    const employeesQuery = query(collection(db, "employee"));

    onSnapshot(employeesQuery, async (snapshot) => {
      const employeesArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        Id: doc.id,
      }));

      const currentUserId = auth.currentUser.uid;
      const currentUserName = auth.currentUser.displayName;
      const currentUserEmail = auth.currentUser.email;

      const chatsQuery = query(collection(db, "chats"));
      const chatsSnapshot = await getDocs(chatsQuery);

      const chatsArray = chatsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const validEmployeeIds = employeesArray.map((employee) => employee.employeeId);

      employeesArray.forEach(async (employee) => {
        if (employee.employeeId !== currentUserId) {
          const existingChat = chatsArray.find((chat) => {
            const userIds = chat.users.map((user) => user.id);
            return (
              userIds.includes(currentUserId) &&
              userIds.includes(employee.employeeId) &&
              userIds.length === 2
            );
          });

          if (!existingChat) {
            const chatData = {
              id: uuidv4(),
              users: [
                {
                  name: currentUserName,
                  email: currentUserEmail,
                  id: currentUserId,
                },
                {
                  name: employee.name,
                  email: employee.email,
                  id: employee.employeeId,
                },
              ],
            };

            await addDoc(collection(db, "chats"), chatData);
          }
        }
      });
    });
  };

  const logIn = () => {

    console.log("evento numero 1");

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredentials) => {
        const user = userCredentials.user;

        updateEmployees();

        navigate("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            seterrorMessage(
              "Usuário não encontrado. Verifique seu email e tente novamente."
            );
            break;
          case "auth/invalid-credential":
            seterrorMessage(
              "Usuário não encontrado. Verifique seu email e tente novamente."
            );
            break;
          case "auth/wrong-password":
            seterrorMessage(
              "Senha incorreta. Verifique sua senha e tente novamente."
            );
            break;
          case "auth/invalid-email":
            seterrorMessage(
              "Email incorreto. Verifique seu email e tente novamente."
            );
            break;
          default:
            seterrorMessage(
              `Ocorreu um erro inesperado. Tente novamente mais tarde`
            );
            break;
        }
      });
  };

  const register = () => {
    console.log(
      `email = ${email}, password = ${senha}, confPassword = ${confSenha} `
    );
    console.log("evento numero 2");

    if (senha != confSenha) {
      seterrorMessage("As senhas não se coincidem.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: photoURL
        })

        setusername("");
        setEmail("");
        setSenha("");
        setConfSenha("");

        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        switch (error.code) {
          case "auth/email-already-in-use":
            seterrorMessage(
              "Este email já está em uso. Por favor, use outro email."
            );
            break;
          case "auth/invalid-email":
            seterrorMessage(
              "Formato de email inválido. Por favor, insira um email válido."
            );
            break;
          case "auth/operation-not-allowed":
            seterrorMessage(
              "O registro de usuários está desativado. Por favor, entre em contato com o suporte."
            );
            break;
          case "auth/weak-password":
            seterrorMessage(
              "A senha é muito curta. Por favor, insira uma senha com pelo menos 6 caracteres."
            );
            break;
          default:
            seterrorMessage(
              "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
            );
            break;
        }
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosUsuario = { email, senha };
    console.log(dadosUsuario);
    setEmail("");
    setSenha(""); // Limpa o formulário após o envio
    setConfSenha(""); // Limpa o formulário após o envio
  };

  function playAnim() {
    var si = document.getElementById("anim");

    // Remove the class briefly to reset the animation
    si.classList.remove("anim");

    setIsLogin(!isLogin);

    // Use a short timeout to allow the browser to register the class removal
    setTimeout(() => {
      si.classList.add("anim"); // Add the class back to restart the animation
    }, 50); // A short delay (e.g., 50ms) to let the class removal take effect

    // Remove the class again after 3 seconds to stop the animation
    setTimeout(() => {
      si.classList.remove("anim");
    }, 5000);
  }

  return (
    // Container Geral
    <main className="auth-container" id="login">
      <section className="pos-rel"></section>
      <section
        id="anim"
        className={`auth-left-section ${isLogin ? "" : "cadastro-mode"} animate__animated animate__fadeInLeftBig`}
      >
        <img
          height="50%"
          src={
            isLogin
              ? require("../../assets/login-cadastro-images/bolabasquete.png")
              : require("../../assets/login-cadastro-images/bolafutebol.png")
          }
          width="auto"
          alt={isLogin ? "Bola de basquete" : "Bola de futebol"}
          className={`bola ${isLogin ? "fade-in" : "fade-out"} animate__animated animate__fadeInLeftBig`}
        />
      </section>
      <section className={`auth-right-section ${loading ? "loading" : ""} animate__animated animate__fadeIn animate__slower`}>
        {loading ? (
          <div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
          </div>
        ) : (
          <>
            <h1 className="title">
              {isLogin ? "Faça seu Login" : "Faça seu Cadastro"}
            </h1>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    id="username-input-2"
                    className="form-control"
                    placeholder="Nome de usuário:"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                
                <input
                  type="text"
                  id="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email:"
                  required
                />
              </div>

              <div className="form-group">
                
                <input
                  type="password"
                  id="password-input"
                  className="form-control"
                  placeholder="Senha:"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  
                  <input
                    type="password"
                    id="password-input-2"
                    className="form-control"
                    placeholder="Confirmar senha:"
                    value={confSenha}
                    onChange={(e) => setConfSenha(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="error-message">
                <p style={{ color: "red" }}>{errorMessage}</p>
              </div>

              <button className="button-submit-login" type="submit" onClick={() => { isLogin ? logIn() : register() }} disabled={loading}>
                {isLogin ? "Entrar" : "Cadastrar"}
              </button>
            </form>

            <div className="EntrarComRedesSociais">
              <button
                type="button"
                onClick={() => signInWithPopup(auth, provider).then(async (e) => {
                  var res = await auth.currentUser

                  await updateEmployees();

                  navigate("/")
                }).catch()}
                className="google"
              >
                <i className="bi bi-google"></i> <span>Entrar com Google</span>
              </button>
            </div>

            <p>
              {isLogin ? (
                <>
                  Não tem cadastro?{" "}
                  <a
                    href="#"
                    onClick={() => {
                      toggleAuthMode();
                      playAnim();
                    }}
                  >
                    Crie uma conta
                  </a>
                </>
              ) : (
                <>
                  Já tem conta?{" "}
                  <a
                    href="#"
                    onClick={() => {
                      toggleAuthMode();
                      playAnim();
                    }}
                  >
                    Faça login
                  </a>
                </>
              )}
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default Auth;
