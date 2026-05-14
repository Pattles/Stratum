// Handles password checking for gate overlay
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.querySelector('.gate-creds__enter');
    const enterInput = document.querySelector('.gate-creds__input');

    enterBtn.addEventListener('click', async () => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: enterInput.value })
        });

        const incorrectPass = document.querySelector('.gate-form__incorrect');

        if (response.ok) {
            incorrectPass.innerHTML = 'Password accepted, please wait..';
            incorrectPass.style.color = '#008000';
            incorrectPass.innerHTML = '&nbsp;';
            
            const gate = document.querySelector('.gate');
            gate.style.display = 'none';
            
            const log = document.querySelector('.log');
            log.style.display = 'flex';

            // Logs a song into the db
            const logSubmitBtn = document.querySelector('.log-submit__button-enter');

            logSubmitBtn.addEventListener('click', async () => {
                const logFormTitle = document.getElementById('log-form__title').value;
                const logFormArtist = document.getElementById('log-form__artist').value;
                const logFormYear = document.getElementById('log-form__year').value;
                const logFormTags = document.getElementById('log-form__tags').value.split(', ');

                if ([logFormTitle, logFormArtist, logFormYear, logFormTags].some(val => val.trim() === '')) {
                    alert("Please fill in all fields!");
                    return;
                }

                await addSong(logFormTitle, logFormArtist, logFormYear, logFormTags, enterInput.value);

                log.style.display = 'none';
                clearForm();

                const response = await fetch('/api/songs');
                const songs = await response.json();

                loadInitCards(songs);
            })
        } else if (response.status === 401) {

            incorrectPass.innerHTML = 'Incorrect password. Try again.'
            incorrectPass.style.color = '#b01e24';
        }
    });
});

// Handles closing addsong overlay
document.addEventListener('DOMContentLoaded', () => {
    logOverlay = document.querySelector('.log');

    const toprowClose = document.querySelector('.log-toprow__x');
    const logCancel = document.querySelector('.log-submit__button-cancel');

    toprowClose.addEventListener('click', () => {
        logOverlay.style.display = 'none';
        clearForm()
    });

    logCancel.addEventListener('click', () => {
        logOverlay.style.display = 'none';
        clearForm()
    });
});


// Clears the log-form values
function clearForm() {
    const logFormTitle = document.getElementById('log-form__title');
    logFormTitle.value = ''

    const logFormArtist = document.getElementById('log-form__artist');
    logFormArtist.value = ''

    const logFormYear = document.getElementById('log-form__year');
    logFormYear.value = ''

    const logFormTags = document.getElementById('log-form__tags');
    logFormTags.value = ''
    
    return
}

// Adds a Song to db
async function addSong(title, artist, year, tags, password) {
    const response = await fetch('/api/songs', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-admin-password': password
        },
        body: JSON.stringify({ title, artist, year, tags })
    });

    return response.ok;
}

// Copied from results.js, maybe optimize/standardize in the future?
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
    resultsLead.innerHTML = `${songs.length} songs matching all tags`;

    const cataloguedLead = document.querySelector('.topbar-searchrow__notes-catalogued');
    cataloguedLead.innerHTML = `${songs.length} songs catalogued`;

    /* 
    const songSchema = new mongoose.Schema({
        title: String,
        artist: String,
        year: Number,
        tags: [String]
    });
    */

    return;
}