const activePage = window.location.href;
const navList = document.querySelectorAll('nav a').
    forEach(link => {
        if (link.href == activePage) {
            link.classList.add('active');
        }
    });

var i = 0;
var txt = 'Because we know your time is precious';
var speed = 50;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
window.onload = typeWriter();