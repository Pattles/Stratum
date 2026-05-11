// Responsible for handling the opening and closing of subtags (e.g. rock -> dad rock)
// Updates .sidebar-tag open="true/false"
document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.sidebar-tag');

    tags.forEach(specificTag => {
        const header = specificTag.querySelector('.sidebar-tags__header');

        header.addEventListener('click', () => {
            specificTag.dataset.open = specificTag.dataset.open === 'true' ? 'false' : 'true';
        })
    })
})
