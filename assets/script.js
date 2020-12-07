function getCountry() {
    fetch("http://ip-api.com/json")
        .then(res => res.json())
        .then(data => {
            let code = data.countryCode
            document.querySelector("html").lang = code.toLowerCase()
        })
}

window.addEventListener("load", function () {
    document.querySelectorAll('#loader')[0].classList.replace("hb-show", "hb-hide");
    document.querySelectorAll('#loader-wrap')[0].classList.replace("bg-white", "bg-transparent");
    document.querySelectorAll('#loader-wrap')[0].classList.replace("on-top", "on-bot");
})

window.addEventListener("DOMContentLoaded", function () {
    document.getElementsByTagName("html")[0].style.overflowY = "auto"
    let y = window.pageYOffset;
    if (y >= 75) {
        document.querySelectorAll('.home-button')[0].classList.replace("hb-hide", "hb-show")
    } else {
        document.querySelectorAll('.home-button')[0].classList.replace("hb-show", "hb-hide")
    }
    getCountry()
})


document.querySelectorAll('.navbar-nav>li>a')[0].addEventListener('click', hideNavbar)

window.addEventListener('scroll', function () {
    let y1 = window.pageYOffset;
    let scroller = document.getElementById("progress-bar")
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    let scrollerHeight = (y1 / totalHeight) * 100;
    scroller.style.height = scrollerHeight + "%";

    hideNavbar()
    if (y1 >= 75) {
        document.querySelectorAll('.home-button')[0].classList.replace("hb-hide", "hb-show")
    } else {
        document.querySelectorAll('.home-button')[0].classList.replace("hb-show", "hb-hide")
    }
})

document.querySelectorAll("button.navbar-toggler")[0].addEventListener("click", function () {
    var target = this.getAttribute("data-target")
    document.querySelectorAll(target)[0].classList.toggle('show')
});

function hideNavbar() {
    const target = document.querySelectorAll(".navbar-toggler")[0].getAttribute("data-target")
    document.querySelectorAll(target)[0].classList.remove('show')
}

let scrollToggle = document.querySelectorAll('.page-scroll');

function smoothScroll(anchor, duration) {
    // Calculate how far and how fast to scroll
    let startLocation = window.pageYOffset;
    let endLocation;
    let x = window.matchMedia("(max-width: 990px)").matches
    if (x) {
        if (endLocation !== 0) {
            if (endLocation >= 1350) {
                endLocation = 9999
            } else {
                endLocation = anchor.offsetTop - 175
            }
        } else {
            endLocation = anchor.offsetTop
        }
    } else {
        endLocation = anchor.offsetTop
    }
    let distance = endLocation - startLocation;
    let increments = distance / (duration / 16);
    let stopAnimation;
    // Scroll the page by an increment, and check if it's time to stop
    const animateScroll = function () {
        window.scrollBy(0, increments);
        stopAnimation();
    };
    // If scrolling down
    if (increments >= 0) {
        // Stop animation when you reach the anchor OR the bottom of the page
        stopAnimation = function () {
            let travelled = window.pageYOffset;
            if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
                clearInterval(runAnimation);
            }
        };
    } else {
        stopAnimation = function () {
            let travelled = window.pageYOffset;
            if (travelled <= 0) {
                clearInterval(runAnimation)
            }
        }
    }
    // Loop the animation function
    let runAnimation = setInterval(animateScroll, 16);
}

if("querySelector" in document && "addEventListener" in window && Array.prototype.forEach)
    {
    // For each smooth scroll link
    [].forEach.call(scrollToggle, function (toggle) {
        // When the smooth scroll link is clicked
        toggle.addEventListener('click', function (e) {
            // Prevent the default link behavior
            e.preventDefault();
            // Get anchor link and calculate distance from the top
            let dataID = toggle.getAttribute('href');
            let dataTarget = document.querySelector(dataID);
            // If the anchor exists
            if (dataTarget) {
                // Scroll to the anchor
                smoothScroll(dataTarget, 1200);
            }
        }, false);
    });
    }
