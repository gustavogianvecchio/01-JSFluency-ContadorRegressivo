/* O DOM (Document Object Model) é uma interface que representa como os 
documentos HTML e XML são lidos pelo seu browser. Após o browser ler seu 
documento HTML, ele cria um objeto que faz uma representação estruturada do seu 
documento e define meios de como essa estrutura pode ser acessada. */

/* Obtendo as informações, que estão na index, usando o DOM.
- aqui estamos obtendo os valores que precisamos de cada elemento através do seu ID
e armazenando-os em uma constante */
const secondsContainer = document.querySelector('#seconds')
const minutesContainer = document.querySelector('#minutes')
const hoursContainer = document.querySelector('#hours')
const daysContainer = document.querySelector('#days')
const nextYearContainer = document.querySelector('#year')
const spinnerLoading = document.querySelector('#loading')
const countdownContainer = document.querySelector('#countdown')

/* Usando o Método de Date - getFullYear - para pegar o ano atual e somando 1 a ele para
determinar o próximo ano. */
const nextYear = new Date().getFullYear() + 1 

// Indicando o momento de virada do ano, inserindo o ano dinamicamente
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`)

/* Template Literal ou Template String permite uma interpolção simplificada.
(se caracteriza pela String sempre entre crases (backticks ``)) */
// Exemplo do execício: `January 01 ${nextYear} 00:00:00`

/* A interpolação de strings é uma característica que permite injectar variáveis,
chamadas de funções, e expressões aritméticas (através de espaço reservado
(usando dollar sign + brackets ${})) directamente numa string sem utilizar
caracteres de concatenação ou de fuga para strings de várias linhas ou ainda
de escape \ no uso de apóstrofo como em haven\´t. */

/* Dica Atalho: quando seleciono um item, como a aspas de abertura da String,
e pressiono Ctrl + D, automaticamente eu seleciono as aspas do final e posso mudar
as duas ao mesmo tempo */

console.log(newYearTime)

/* O operador new cria uma instancia de um tipo de objeto definido pelo usuário
ou de um dos tipos nativos (built-in) que possuem uma função construtora. */

/* Date é um Objeto Construtor para trabalharmos com data no JS, esse Objeto possuí
vários Métodos, como o getFullYear usado acima na obtenção do ano atual. */

// console.log(newYearTime)

/* Dica INSPECIONAR: é possível vermos os métodos do construtor, clicando em Sources,
inserindo um breakpoint na declaração da const, clicando em F5 para atualizar a página e
em F10 para o passo seguinte no debbug. Depois ao pausarmos o mouse sobre a const no console.log,
veremos que a função é um Object Prototype, e conseguiremos ver os
Métodos e Propriedades que ele herda. */

/* O JavaScript é frequentemente descrito como uma linguagem baseada em protótipos —
para fornecer herança, os objetos podem ter um objeto de protótipo, que atua como um
objeto de modelo do qual herda métodos e propriedades.
https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/Object_prototypes */


/* Dicas Atalho:
- Shift+alt+DownArrow - para replicar a linha selecinada abaixo. (Shift+alt+DownUp, seta acima)
- Ctrl+: - para comentar/descomentar uma linha
- Shift+Alt+A - para comentar/descomentar um bloco */

/* Atribuo o próximo ano obtido na constante nextYear, através do Método de Date,
à variável, e assim devolvo para o elemento da DOM, associado à Constante, o valor obtido. */
nextYearContainer.textContent = nextYear



// Criando uma função com um operador ternário para otimizar o código de inserção em tela, insertCountdownValues...
const getTimeUnit = unit => unit < 10 ? '0' + unit : unit
// ... Separando a parte que está inserindo os valores dos contadores em tela; ...
const insertCountdownValues = ({ seconds, minutes, hours, days }) => {
    secondsContainer.textContent = getTimeUnit(seconds) // devolvendo o valor atualizado para o elemento da DOM associado à Constante
    minutesContainer.textContent = getTimeUnit(minutes)
    hoursContainer.textContent = getTimeUnit(hours)
    daysContainer.textContent = getTimeUnit(days)
}
// ... daquela que está gerando os valores.
const updateCountdown = () => {
    const currentTime = new Date() // pegando a data atual
    const difference = newYearTime - currentTime // quando subritraio uma data de outra recebo o valor do resultado em milisegundos
    // A função Math.floor(x) retorna o menor número inteiro dentre o número "x".
    const days = Math.floor(difference / 1000 / 60 / 60 / 24) // para obter a quantidade de dias que falta para o ano acabar
    const hours = Math.floor(difference / 1000 / 60 / 60) % 24 // com o modulo 24, obtenho de RESTO a quantidade de horas que falta para o dia acabar
    const minutes = Math.floor(difference / 1000 / 60) % 60 // aqui com o modulo 60, a quantidade de minutos para a hora atual acabar
    const seconds = Math.floor(difference / 1000) % 60 // aqui com o modulo 60, a quantidade de segundos para o minuto atual acabar

    insertCountdownValues({ seconds, minutes, hours, days }) // chamando a função de inserção em tela
}
/* #### REFATORADA acima A FUNÇÃO DO updateCountdown ####
const updateCountdown = () => {
    const currentTime = new Date()
    const difference = newYearTime - currentTime
    const days = Math.floor(difference / 1000 / 60 / 60 / 24) // para obter a quantidade de dias que falta para o ano acabar
    const hours = Math.floor(difference / 1000 / 60 / 60) % 24 // com o modulo 24, obtenho de resto a quantidade de horas que falta para o dia acabar
    const minutes = Math.floor(difference / 1000 / 60) % 60 // aqui com o modulo 60, a quantidade de minutos para a hora atual acabar
    const seconds = Math.floor(difference / 1000) % 60 // aqui com o modulo 60, a quantidade de segundos para o minuto atual acabar

    //console.log(days, hours, minutes, seconds)

    secondsContainer.textContent = seconds < 10 ? '0' + seconds : seconds
    minutesContainer.textContent = minutes < 10 ? '0' + minutes : minutes
    hoursContainer.textContent = hours < 10 ? '0' + hours : hours
    daysContainer.textContent = days < 10 ? '0' + days : days
} */ 



// GLOSSÁRIO: em informática o termo HANDLE significa processar.
/* então nesse refatoramento eu processei o DISPLAY DO COUNTDOWN:
- removendo o spinner (demonstrativo de carregamento); e
- alterando o estilo no css de none para flex... */
const handleCountdownDisplay = () => {
    spinnerLoading.remove() // removo o spinner que carrega aparente
    countdownContainer.style.display = 'flex' // mostro o container do contador que carrega oculto
}
/* ... e em seguida chamei a função de processamento do DISPLAY DO COUNTDOWN
como parâmentro da função setTimeout, e passei um segundo parâmetro de tempo
em milissegundos para indicar quando deve ser executada após o carregamento. */
setTimeout(handleCountdownDisplay, 1000)

/* #### REFATORADA acima A FUNÇÃO DO setTimeout ####
setTimeout(() => {
    spinnerLoading.remove()
    countdownContainer.style.display = 'flex'
}, 1000) */



/* Defino o intervalo de execução da Função de Update dos valores de dias, horas, minutos e segundos
para atualizar os valores a cada 1 segundo. */
setInterval(updateCountdown, 1000)