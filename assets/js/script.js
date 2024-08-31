
document.addEventListener("DOMContentLoaded", function () {
    $(function () {
        // Load header and footer
        $("#header").load("header.html");
        $("#footer").load("footer.html");
    
        // Set active header
        const url_name = window.location.href;
        {
            let header_elem; // Initialized down below

            if (url_name.includes("games")) {
                header_elem = $("#header-games");
            }
            else if (url_name.includes("minecraft-maps")) {
                header_elem = $("#header-minecraft-maps");
            }
            else if (url_name.includes("about")) {
                header_elem = $("#header-about");
            }
            else if (url_name.includes("contact-us")) {
                header_elem = $("#header-contact-us");
            }
            else {
                header_elem = $("#header-home");
            }
            header_elem.classList.add("active");
            header_elem.setAttribute("aria-current", "page");
        }
    });
});


// Animate background
const tl = new TimelineMax({ repeat: -1 });

tl.fromTo(
    "#bubble5",
    { y: "100vh", opacity: 1 },
    {
        y: "-25vh", opacity: 1,
        duration: 3
    })
    .fromTo(
        "#bubble1",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 5
        }, "-=3.5")
    .fromTo(
        "#bubble4",
        { y: "100vh", opacity: 1 },
        {
            y: "-30vh", opacity: 1,
            duration: 7
        }, "-=2.5")
    .fromTo(
        "#bubble8",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 5
        }, "-=6.5")
    .fromTo(
        "#bubble9",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 3
        }, "-=4.5")
    .fromTo(
        "#bubble2",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 3
        }, "-=2.5")
    .fromTo(
        "#bubble6",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 3
        }, "-=4.5")
    .fromTo(
        "#bubble7",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 5
        }, "-=2.5")
    .fromTo(
        "#bubble3",
        { y: "100vh", opacity: 1 },
        {
            y: "-25vh", opacity: 1,
            duration: 3
        }, "-=2.5");