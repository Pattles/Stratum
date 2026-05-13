// Responsible for opening/closing the gate overlay
document.addEventListener('DOMContentLoaded', () => {
    const gate = document.querySelector('.gate');
    
    const suggest = document.querySelector('.topbar-searchrow__notes-suggest');
    const gateClose = document.querySelector('.gate-toprow__x');

    console.log(gate);

    suggest.addEventListener('click', () => {
        gate.style.display = 'flex';
    });

    gateClose.addEventListener('click', () => {
        gate.style.display = 'none';

        const incorrectPass = document.querySelector('.gate-content__incorrect');

        incorrectPass.innerHTML = '&nbsp;'
    });
});

