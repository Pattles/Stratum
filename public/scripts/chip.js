let activeTags = []

// Responsible for deleting a chip on click
document.addEventListener('DOMContentLoaded', async () => {
    const chipsRow = document.querySelector('.topbar-chipsrow');

    const fetchedSongs = await loadSongs();

    chipsRow.addEventListener('click', (e) => {
        const chip = e.target.closest('.topbar-chipsrow__chip');
        
        if (!chip) return; // clicked somewhere that isn't a chip
        
        const tagName = chip.querySelector('.topbar-chip__lead').textContent.trim();
        
        const index = activeTags.indexOf(tagName);
        if (index !== -1) {
            activeTags.splice(index, 1);
        }

        chip.remove();

        renderCards(fetchedSongs, activeTags);
    });
});

// Responsible for adding a new chip on tag press
document.addEventListener('DOMContentLoaded', async () => {
    const subtags = document.querySelectorAll('.sidebar-subtag');
    const chipsRow = document.querySelector('.topbar-chipsrow');

    const fetchedSongs = await loadSongs();


    subtags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagName = tag.textContent.trim();

            if (activeTags.indexOf(tagName) != -1) return;

            activeTags.push(tagName);

            chipsRow.insertAdjacentHTML('beforeend', `
                <div class="topbar-chipsrow__chip">
                    <span class="topbar-chip__lead">${tag.textContent}</span>
                    <span class="topbar-chip__x">&#215;</span>
                </div>
            `);

            renderCards(fetchedSongs, activeTags);
        });
    });
})


// Renders resultsList, filtered with activeTags
function renderCards(fetchedSongs, activeTags) {
    const filteredSongs = fetchedSongs.filter(song => activeTags.every(tag => song.tags.includes(tag)));

    console.log(filteredSongs); //

    const resultsList = document.querySelector('.results-list');
    const resultsLead = document.querySelector('.results__lead');

    if (filteredSongs.length != 0) {
        resultsList.innerHTML = filteredSongs.map((song, index) => `
            <div class="results-card row">
                <p class="results-card__place">${String(index + 1).padStart(2, '0')}</p>
                <div class="results-card__track column">
                    <p class="results-card__track-title">${song.title}</p>
                    <p class="results-card__track-artist">${song.artist}</p>
                </div>
                <div class="results-card__taglist row">
                    ${song.tags.map(tag => {
                        const isSelected = activeTags.includes(tag);

                        return `<p class="results-card__tag" data-selected="${isSelected ? 'true' : 'false'}">${tag}</p>`
                            }).join('')}
                </div>
                <p class="results-card__year">${song.year}</p>
            </div>
        `).join('');

        resultsLead.innerHTML = `${filteredSongs.length} song${filteredSongs.length === 1 ? '' : 's'} matching selected tags`;
    } else {
        resultsList.innerHTML = `
            <div class="results-card row">
                <p class="results-card__place">0</p>
                <div class="results-card__track column">
                    <p class="results-card__track-title">No songs found</p>
                    <p class="results-card__track-artist">...</p>
                </div>
                <div class="results-card__taglist row">
                    ${activeTags.map(tag => `<p class="results-card__tag" data-selected="true">${tag}</p>`).join('')}
                </div>
                <p class="results-card__year">2026</p>
            </div>
        `;

        resultsLead.innerHTML = '0 songs matching selected tags';
    }

}


async function loadSongs() {
    const response = await fetch('/api/songs');
    const songs = await response.json();

    return songs;
}
