document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded');
});
//

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sidebar-cat__card');

    cards.forEach(card => {
        const header = card.querySelector('.sidebar-cat__header');
        
        header.addEventListener('click', () => {            
            card.dataset.open = card.dataset.open === 'true' ? 'false' : 'true'
                    
        });
    });
});


/*
const cards = document.querySelectorAll('.sidebar-cat__card');

cards.forEach(card => {
    const header = card.querySelector('.sidebar-cat__header');
    
    header.addEventListener('click', () => {
        card.dataset.open = card.dataset.open === 'true' ? 'false' : 'true';
    });
    console.log('clicked');
});
*/