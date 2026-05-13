// Handles password checking for add/submit/contribute overlay
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.querySelector('.gate-creds__enter');
    const enterInput = document.querySelector('.gate-creds__input');

    enterBtn.addEventListener('click', async () => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: enterInput.value })
        });

        if (response.ok) {
            // show the add song modal
            console.log('True')
        } else if (response.status === 401) {
            const incorrectPass = document.querySelector('.gate-content__incorrect');

            incorrectPass.innerHTML = 'Incorrect password. Try again.'
        }
    });
});