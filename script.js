const Api_Url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const input= document.getElementById("input")


/* fetch word data */
async function fetchWord(word) {
    try {
        const response = await fetch(`${Api_Url}${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();

        console.log("Fetched data:", data);

        // ✅ Get pronunciation audio (if available)
        let audio = data[0].phonetics.find(p => p.audio)?.audio || "";

        // ✅ Get synonyms (if available)
        let synonyms = data[0].meanings[0].synonyms;
        let synonymText = synonyms.length > 0 ? synonyms.join(", ") : "No synonyms";

        result.innerHTML = `
            <h3>${data[0].word}</h3>
            
            <p><strong>Meaning:</strong> ${data[0].meanings[0].definitions[0].definition}</p>

            <p><strong>Synonyms:</strong> ${synonymText}</p>

            ${
                audio 
                ? `<button onclick="playSound('${audio}')">🔊 Play Pronunciation</button>`
                : "<p>No pronunciation available</p>"
            }
        `;
        
    } catch (error) {
        console.log("Error:", error);
        result.innerHTML = "<p>Word not found</p>";
    }
}

// ✅ Function to play audio
function playSound(url) {
    let sound = new Audio(url);
    sound.play();
}
btn.addEventListener("click", () => {
    let inpWord = input.value.trim(); // use the variable
    if (inpWord) {
        fetchWord(inpWord);
    }

});