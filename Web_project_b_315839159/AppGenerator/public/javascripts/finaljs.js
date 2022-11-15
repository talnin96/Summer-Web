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

// function typeWriter() {
//     if (i < txt.length) {
//         document.getElementById("demo").innerHTML += txt.charAt(i);
//         i++;
//         setTimeout(typeWriter, speed);
//     }
// }
// window.onload = typeWriter();

var lngPage = document.getElementById("lng");
var latPage = document.getElementById("lat");
function getLoaction() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lngPage.setAttribute("value",position.coords.latitude);
  latPage.setAttribute("value",position.coords.longitude);
  
}
