import { db, app, auth } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  singOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

//CADASTRAR USUARIO

const emailCadastroInput = document.getElementById("emailCadastro");
const senhaCaastroInput = document.getElementById("senhaCadastro");
const btnCadastro = document.getElementById("btnCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");

async function cadastrarUsuario(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    return userCredential.user;
  } catch (error) {
    console.error("erro ao cadastrar:", error.code, error.message);
    let mensagemErro = "Ocorreu um erro ao cadastrar. tente novamente.";
    switch (error.code) {
      case "auth/email-already-in-use":
        mensagemErro = "este email já esta em uso";
        break;
      case "auth/invalid-email":
        mensagemErro = "Formato de email invalido";
        break;
      case "auth/wait-password":
        mensagemErro = "a senha deve ter pelo menos 6 caracteres";
        break;
    }
    throw { message: mensagemErro };
  }
}
if (btnCadastro) {
  btnCadastro.addEventListener("click", async function() {
    const email = emailCadastroInput.value;
    const senha = senhaCadastroInput.value;
    mensagemCadastro.textContent = "";

    if (!email || !senha) {
      mensagemCadastro.textContent = "Por favor , preencha todos os campos.";
      return;
    }
    try {
      const user = await cadastrarUsuario(email, senha);
      console.log("Usuario cadastrado:", user);
      mensagemCadastro.textContent = "Cadastro realizado com sucesso!";
      setTimeout(function () {
        window.location.href = "../index.html";
      }, 3000);
    } catch (error) {
      mensagemCadastro.textContent = "erro no cadastro: ${error.message} ";
    }
  });
}
