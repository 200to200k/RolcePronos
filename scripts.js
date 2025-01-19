function toggleTheme() {
    let body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
}

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
});
