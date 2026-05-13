document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/songs');
    const songs = await response.json();
    
    loadInitCards(songs);
});

function loadInitCards(songs) {
    const resultsList = document.querySelector('.results-list');

    resultsList.innerHTML = songs.map((song, index) => `
        <div class="results-card row">
            <p class="results-card__place">${String(index + 1).padStart(2, '0')}</p>
            <div class="results-card__track column">
                <p class="results-card__track-title">${song.title}</p>
                <p class="results-card__track-artist">${song.artist}</p>
            </div>
            <div class="results-card__taglist row">
                ${song.tags.map(tag => 
                    `<p class="results-card__tag" data-selected="false">${tag}</p>`
                ).join('')}
            </div>
            <p class="results-card__year">${song.year}</p>
        </div>
    `).join('');

    const resultsLead = document.querySelector('.results__lead');

    resultsLead.innerHTML = `
        ${songs.length} songs matching all tags
    `

    /* 
    const songSchema = new mongoose.Schema({
        title: String,
        artist: String,
        year: Number,
        tags: [String]
    });
    */

    console.log(resultsList);

    return;
}