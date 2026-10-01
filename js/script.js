const topicSelect = document.querySelector("#topic-select");
const poloSelect = document.querySelector("#polo-select");
const result = document.querySelector("#comparison-result");

const rows = document.querySelectorAll(".comparison-row");


function updateComparison() {

    const selectedTopic = topicSelect.value;
    const selectedPolo = poloSelect.value;


    // Limpa o resultado anterior
    result.innerHTML = "";


    // Se ainda não escolheu os dois
    if (!selectedTopic || !selectedPolo) {

        result.innerHTML = `
            <p class="comparison-placeholder">
                Selecione um tópico e um polo para visualizar a comparação.
            </p>
        `;

        return;
    }


    // Procura o tópico escolhido
    const selectedRow = document.querySelector(
        `.comparison-row[data-topic="${selectedTopic}"]`
    );


    // Caso o tópico não exista
    if (!selectedRow) {

        result.innerHTML = `
            <p class="comparison-placeholder">
                Não foi possível encontrar esse tópico.
            </p>
        `;

        return;
    }


    // Procura o polo escolhido dentro do tópico
    const selectedColumn = selectedRow.querySelector(
        `.government-column[data-polo="${selectedPolo}"]`
    );


    // Caso o polo não exista
    if (!selectedColumn) {

        result.innerHTML = `
            <p class="comparison-placeholder">
                Não foi possível encontrar esse polo.
            </p>
        `;

        return;
    }


    // Cria o cartão que será exibido
    const card = document.createElement("article");

    card.classList.add("comparison-result-card");


    // Copia o título do tópico
    const topic = selectedRow.querySelector(".topic");

    if (topic) {

        const topicCopy = topic.cloneNode(true);

        card.appendChild(topicCopy);
    }


    // Copia o conteúdo do polo escolhido
    const columnCopy = selectedColumn.cloneNode(true);

    card.appendChild(columnCopy);


    // Coloca o cartão na tela
    result.appendChild(card);
}


// Atualiza quando o tópico mudar
topicSelect.addEventListener("change", updateComparison);


// Atualiza quando o polo mudar
poloSelect.addEventListener("change", updateComparison);