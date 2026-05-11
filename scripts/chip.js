let activeTags = ['melodic house', 'techno']

// Responsible for deleting a chip on click
document.addEventListener('DOMContentLoaded', () => {
    const chipsRow = document.querySelector('.topbar-chipsrow');

    chipsRow.addEventListener('click', (e) => {
        const chip = e.target.closest('.topbar-chipsrow__chip');
        
        if (!chip) return; // clicked somewhere that isn't a chip
        
        const tagName = chip.querySelector('.topbar-chip__lead').textContent.trim();
        
        const index = activeTags.indexOf(tagName);
        if (index !== -1) {
            activeTags.splice(index, 1);
        }

        chip.remove();
    });
});

// Responsible for adding a new chip on tag press
document.addEventListener('DOMContentLoaded', () => {
    const subtags = document.querySelectorAll('.sidebar-subtag');
    const chipsRow = document.querySelector('.topbar-chipsrow');


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
        });
    });
})