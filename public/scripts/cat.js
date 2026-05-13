// Responsible for handling the opening and closing of categories
// Updates .sidebar-cat__card open="true/false"
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sidebar-cat__card');

    cards.forEach(card => {
        const header = card.querySelector('.sidebar-cat__header');
        
        header.addEventListener('click', () => {            
            card.dataset.open = card.dataset.open === 'true' ? 'false' : 'true'
                    
        });
    });
});