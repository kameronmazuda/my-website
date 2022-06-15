const uiUx = document.getElementById("pop-up-ui-ux");
const backend = document.getElementById("pop-up-backend");
const toggle = document.getElementById("toggle");
const popUpCloseBtn = document.querySelectorAll(".pop-up__close-btn");
const popUpOpenBtn = document.querySelectorAll(".pop-up__open-btn");
const navSide = document.getElementById("nav-side");
const sideNavLink = document.querySelectorAll(".nav-side__a");

const home = document.getElementById("home");
const about = document.getElementById("about");
const services = document.getElementById("service");
const portfolio = document.getElementById("portfolio");
const contact = document.getElementById("contact");



// ### EVENTS ### 
window.addEventListener('scroll', changeActiveLink);
toggle.addEventListener('click', openSide);
popUpCloseBtn.forEach((btn) => {
    btn.addEventListener('click', closePopUp);
});
popUpOpenBtn.forEach((btn) => {
    btn.addEventListener('click', openPopUp)
});
sideNavLink.forEach((link) => {
    link.addEventListener('click', sideNavLinkAction)
})
// ### FUNCTIONS ### 
function openSide(ev) {
    navSide.classList.toggle("nav-side--hidden");
    // .nav-side--hidden
}

function openPopUp(ev) {
    ev.preventDefault();
    const popUp = ev.currentTarget.nextElementSibling;
    console.log(popUp)
    popUp.classList.add("pop-up--show")
}

function closePopUp(ev) {
    ev.preventDefault();
    const popUp = ev.currentTarget.parentElement;
    popUp.classList.remove("pop-up--show")
}

function sideNavLinkAction(ev) {
    sideNavLink.forEach(link => {
        link.classList.remove("nav-side__a--active");
    });
    ev.currentTarget.classList.add("nav-side__a--active");
    navSide.classList.add("nav-side--hidden");

}

function changeActiveLink() {
    if (window.pageYOffset > home.offsetTop && window.pageYOffset < about.offsetTop) {
        console.log("1")
    } else if (window.pageYOffset > about.offsetTop && window.pageYOffset < services.offsetTop) {
        console.log("2")
    } else if (window.pageYOffset > services.offsetTop && window.pageYOffset > portfolio.offsetTop) {
        console.log("3")
    } else if (window.pageYOffset > services.offsetTop) {
        console.log("4")
    }
}

console.log(window.pageYOffset)