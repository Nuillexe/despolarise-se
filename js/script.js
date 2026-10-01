const topicSelect = document.querySelector("#topic-select");
const poloSelect = document.querySelector("#polo-select");
const result = document.querySelector("#comparison-result");

async function updateComparison() {
    const selectedTopic = topicSelect.value;
    const selectedPolo = poloSelect.value;

    result.innerHTML = "";

    if (!selectedTopic || !selectedPolo) {
        result.innerHTML = `
            <p class="comparison-placeholder">
                Selecione um tópico e um polo para visualizar a comparação.
            </p>
        `;
        return;
    }

    try {
        // Busca o arquivo HTML correspondente na pasta modulos/
        const response = await fetch(`modulos/${selectedTopic}.html`);
        
        if (!response.ok) {
            throw new Error("Arquivo não encontrado");
        }

        const htmlText = await response.text();

        // Converte o texto recebido em elementos DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const selectedRow = doc.querySelector(`.comparison-row[data-topic="${selectedTopic}"]`);

        if (!selectedRow) {
            result.innerHTML = `<p class="comparison-placeholder">Tópico não encontrado no arquivo.</p>`;
            return;
        }

        const selectedColumn = selectedRow.querySelector(`.government-column[data-polo="${selectedPolo}"]`);

        if (!selectedColumn) {
            result.innerHTML = `<p class="comparison-placeholder">Polo não encontrado para este tópico.</p>`;
            return;
        }

        // Monta o cartão de resultado
        const card = document.createElement("article");
        card.classList.add("comparison-result-card");

        const topic = selectedRow.querySelector(".topic");
        if (topic) {
            card.appendChild(topic.cloneNode(true));
        }

        card.appendChild(selectedColumn.cloneNode(true));
        result.appendChild(card);

    } catch (error) {
        result.innerHTML = `
            <p class="comparison-placeholder">
                Não foi possível carregar os dados do tópico selecionado.
            </p>
        `;
    }
}

topicSelect.addEventListener("change", updateComparison);
poloSelect.addEventListener("change", updateComparison);