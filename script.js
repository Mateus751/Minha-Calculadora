
const visor = document.querySelector("#visor");
const botoes = document.querySelectorAll("button");

let numeroAtual = "0";
let primeiroNumero = null;
let operador = null;
let esperandoSegundoNumero = false;

// Atualiza o visor
function atualizarVisor() {
    visor.value = numeroAtual;
}

// Digita números
function digitarNumero(numero) {
    if (esperandoSegundoNumero || numeroAtual === "Erro") {
        numeroAtual = numero;
        esperandoSegundoNumero = false;
    } else if (numeroAtual === "0") {
        numeroAtual = numero;
    } else {
        numeroAtual += numero;
    }

    atualizarVisor();
}

// Digita decimal
function digitarDecimal() {
    if (esperandoSegundoNumero || numeroAtual === "Erro") {
        numeroAtual = "0.";
        esperandoSegundoNumero = false;
    } else if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }

    atualizarVisor();
}

// Escolhe operação
function escolherOperador(op) {
    if (numeroAtual === "Erro") {
        return;
    }

    primeiroNumero = Number(numeroAtual);
    operador = op;
    esperandoSegundoNumero = true;
}

// Calcula
function calcular() {
    if (
        operador === null ||
        esperandoSegundoNumero ||
        numeroAtual === "Erro"
    ) {
        return;
    }

    const segundoNumero = Number(numeroAtual);
    let resultado;

    switch (operador) {
        case "+":
            resultado = primeiroNumero + segundoNumero;
            break;

        case "-":
            resultado = primeiroNumero - segundoNumero;
            break;

        case "*":
            resultado = primeiroNumero * segundoNumero;
            break;

        case "/":
            if (segundoNumero === 0) {
                numeroAtual = "Erro";
                atualizarVisor();
                limparEstado();
                return;
            }

            resultado = primeiroNumero / segundoNumero;
            break;
    }

    numeroAtual = String(
        Number(resultado.toPrecision(12))
    );

    limparEstado();
    esperandoSegundoNumero = true;

    atualizarVisor();
}

// Limpa os dados da operação
function limparEstado() {
    primeiroNumero = null;
    operador = null;
}

// Limpa a calculadora
function limpar() {
    numeroAtual = "0";
    limparEstado();
    esperandoSegundoNumero = false;

    atualizarVisor();
}

// Apaga último caractere
function apagar() {
    if (esperandoSegundoNumero || numeroAtual === "Erro") {
        return;
    }

    if (numeroAtual.length > 1) {
        numeroAtual = numeroAtual.slice(0, -1);
    } else {
        numeroAtual = "0";
    }

    atualizarVisor();
}

// Executa comandos
function executarComando(tecla) {
    if (/^[0-9]$/.test(tecla)) {
        digitarNumero(tecla);
    } else if (tecla === ".") {
        digitarDecimal();
    } else if (["+", "-", "*", "/"].includes(tecla)) {
        escolherOperador(tecla);
    } else if (tecla === "=" || tecla === "Enter") {
        calcular();
    } else if (tecla === "C" || tecla === "Escape") {
        limpar();
    } else if (tecla === "Backspace") {
        apagar();
    }
}

// Clique nos botões
botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        executarComando(botao.dataset.key);
    });
});

// Teclado do computador
document.addEventListener("keydown", function(event) {
    const tecla = event.key;

    if (
        /^[0-9]$/.test(tecla) ||
        ["+", "-", "*", "/", ".", "Enter",
         "Backspace", "Escape"].includes(tecla)
    ) {
        event.preventDefault();
        executarComando(tecla);
    }
});