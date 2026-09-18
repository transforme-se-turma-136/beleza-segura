function mostrarView(idView) {
    // Pega todas as seções com a classe "view"
    const views = document.querySelectorAll(".view");

    // Remove a classe "active" de todas (esconde todas as telas)
    views.forEach((view) => view.classList.remove("active"));

    // Adiciona a classe "active" somente na tela desejada (mostra ela)
    const viewAlvo = document.getElementById(idView);
    if (viewAlvo) {
        viewAlvo.classList.add("active");
    } else {
        console.error(`Tela com id "${idView}" não foi encontrada.`);
    }
}

// Espera o HTML carregar completamente antes de "ligar" os botões
document.addEventListener("DOMContentLoaded", () => {
    // Botão "Entrar" (tela de boas-vindas -> vai para o Login)
    const btnIrLogin = document.getElementById("btn-ir-login");
    if (btnIrLogin) {
        btnIrLogin.addEventListener("click", () => mostrarView("view-login"));
    }

    // Botão "Cadastrar" (tela de boas-vindas -> vai para o Cadastro)
    const btnIrCadastro = document.getElementById("btn-ir-cadastro");
    if (btnIrCadastro) {
        btnIrCadastro.addEventListener("click", () => mostrarView("view-register"));
    }

    // Botão "VOLTAR" da tela de Login -> volta para Boas-vindas
    const btnVoltarLogin = document.getElementById("btn-voltar-login");
    if (btnVoltarLogin) {
        btnVoltarLogin.addEventListener("click", () => mostrarView("view-welcome"));
    }

    // Botão "VOLTAR" da tela de Cadastro -> volta para Boas-vindas
    const btnVoltarCadastro = document.getElementById("btn-voltar-cadastro");
    if (btnVoltarCadastro) {
        btnVoltarCadastro.addEventListener("click", () => mostrarView("view-welcome"));
    }
});

// Função de cadastro
function Cadastrar(event) {
    event.preventDefault();

    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value.trim();

    if (email === "" || senha === "") {
        alert("Atenção: O e-mail e a senha precisam ser preenchidos!");
        return;
    }

    // Salva os dados no localStorage
    const novoUsuario = { email: email, senha: senha };
    localStorage.setItem("usuarioCadastrado", JSON.stringify(novoUsuario));

    // Preenche automaticamente os campos de login com o que acabou de cadastrar
    const inputEmailLogin = document.getElementById("emailLogin");
    const inputSenhaLogin = document.getElementById("SenhaLogin");

    if (inputEmailLogin) inputEmailLogin.value = email;
    if (inputSenhaLogin) inputSenhaLogin.value = senha;

    alert("Cadastro efetuado com sucesso! Seus dados foram preenchidos automaticamente no login.");
    
    // Direciona para a tela de login já com os campos preenchidos
    mostrarView("view-login"); 
}

// Função de Login (com redirecionamento para landpage.html)
function Login(event) {
    event.preventDefault();

    const emailLogin = document.getElementById("emailLogin").value.trim();
    const senhaLogin = document.getElementById("SenhaLogin").value.trim();

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    if (emailLogin === "" || senhaLogin === "") {
        alert("Por favor, preencha todos os campos do login.");
        return;
    }

    if (!usuarioSalvo) {
        alert("Erro: Nenhum usuário cadastrado no sistema. Realize o cadastro primeiro!");
    } else if (
        emailLogin === usuarioSalvo.email &&
        senhaLogin === usuarioSalvo.senha
    ) {
        alert("Login realizado com sucesso!");
        
        // ** REDIRECIONA PARA A LANDPAGE **
        window.location.href = "landpage.html";
        
    } else {
        alert("Erro: Email ou senha incorretos.");
    }
}