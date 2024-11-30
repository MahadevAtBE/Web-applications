let inp = document.querySelector(".inp");
let btn = document.querySelector(".btn");
let box = document.querySelector(".box");
let play = document.querySelector(".play");
// let sound = null;

btn.addEventListener("click", () => {
    main();
})
inp.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        main();
    }
})

const main = async () => {
    try {
        let responce = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp.value}`);
        let data = await responce.json();
        disection(data);

    } catch (error) {
        console.log("error occurd", error);
        box.innerHTML = `<h2 class="error">No Such Word Found</h2>`;
    }
}

function disection(data) {
    let partOfSpeech = "";
    let antonyms = "";
    let synonyms = "";
    let definition = "";
    let example = "";

    data.forEach(a => {
        a.meanings.forEach(b => {
            partOfSpeech = b.partOfSpeech;
            if ((b.antonyms) != undefined && (b.antonyms) != "") {
                antonyms = antonyms + `<li> ${(b.antonyms)}</li>`;
            }

            if (((b.synonyms) != undefined && (b.synonyms) != "")) {
                synonyms = synonyms + `<li> ${(b.synonyms)}</li>`;
            }

            b.definitions.forEach(element => {
                definition = definition + `<li> ${(element.definition)}</li>`;
                if (((element.example) != undefined && (element.example) != "")) {
                    example = example + `<li> ${(element.example)}</li>`;
                }
            });

        });
    });
    printData(partOfSpeech, definition, example, antonyms, synonyms)
}

function printData(partOfSpeech, definition, example, antonyms, synonyms) {

    box.innerHTML = ` <div class="defination">
                            <p class="partOfSpeech"><i>${partOfSpeech}</i></p>
                            <h2>Defination:-</h2>
                            <ol>${definition}</ol>
                        </div>
                        <div class="example">
                            <h2>Example:-</h2>
                            <ol>${example}</ol>
                        </div>
                        <div class="antonyms">
                            <h2>Antonyms:-</h2>
                            <ol>${antonyms}</ol>
                        </div>
                        <div class="synonyms">
                            <h2>Synonyms:-</h2>
                            <ol>${synonyms}</ol>
                        </div>`
}
