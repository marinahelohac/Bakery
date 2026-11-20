// 1. Pega o elemento <time> pelo id que criamos no HTML
const elementoData = document.getElementById("data-hoje");

// Cria a data atual do computador/celular
const hoje = new Date();

// Formata para o padrão brasileiro (ex: 19 de novembro de 2026)
const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
});

// Coloca a data formatada dentro da tag <time>
if (elementoData) {
    elementoData.textContent = dataFormatada;
    elementoData.setAttribute("datetime", hoje.toISOString().split("T")[0]);
}

// 2. Captura o envio do formulário e gera o arquivo .txt
const formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
        // Impede a página de recarregar
        event.preventDefault();

        // Pega os valores de todos os campos do HTML
        const nome = document.getElementById("nome").value;
        const endereco = document.getElementById("endereco").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const cargo = document.getElementById("cargo").value;
        const salario = document.getElementById("salario").value;

        // Pega o turno selecionado no Radio Button
        const turnoSelecionado = document.querySelector('input[name="turno"]:checked');
        const turno = turnoSelecionado ? turnoSelecionado.value : "Não informado";

        // Monta o texto que vai dentro do arquivo .txt
        const conteudoTexto =
            `=== CADASTRO MYSTIC BAKERY 🦇✨ ===
Nome Completo: ${nome}
Endereço: ${endereco}
E-mail: ${email}
Telefone: ${telefone}
Cargo: ${cargo}
Salário: R$ ${salario}
Turno de Trabalho: ${turno}
Data do Cadastro: ${dataFormatada}
====================================`;

        // Cria o arquivo virtual (Blob) e dispara o download
        const blob = new Blob([conteudoTexto], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = `cadastro_${nome || "funcionario"}.txt`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Limpa o formulário após salvar
        formCadastro.reset();
    });
}
