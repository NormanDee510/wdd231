const menuButton = document.getElementById('menuButton');
const navList = document.getElementById('navList');

menuButton.addEventListener('click', () => {
    navList.classList.toggle('active');
});