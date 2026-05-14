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

            const logSubmitBtn = document.querySelector('.log-submit__button-enter');

            logSubmitBtn.addEventListener('click', async () => {
                const logFormTitle = document.getElementById('log-form__title').value;
                const logFormArtist = document.getElementById('log-form__artist').value;
                const logFormYear = document.getElementById('log-form__year').value;
                const logFormTags = document.getElementById('log-form__tags').value.split(', ');

                await addSong(logFormTitle, logFormArtist, logFormYear, logFormTags, enterInput.value);
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

// Handles submitting a song to db after clicking 'add song' button on overlay
/*
document.addEventListener('DOMContentLoaded', () => {
    const logSubmitBtn = document.querySelector('.log-submit__button-enter');

    logSubmitBtn.addEventListener('click', async () => {
        const passInput = document.querySelector('.gate-creds__input');

        const logFormTitle = document.getElementById('log-form__title').value;
        const logFormArtist = document.getElementById('log-form__artist').value;
        const logFormYear = document.getElementById('log-form__year').value;
        const logFormTags = document.getElementById('log-form__tags').value.split(', ');

        await addSong(logFormTitle, logFormArtist, logFormYear, logFormTags, passInput);
    })
})
*/

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

    console.log(password)
    return response.ok;
}