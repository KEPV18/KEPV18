// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AOS library for animations
AOS.init();

// Lightbox gallery
const lightbox = new SimpleLightbox('.gallery a', {
    /* options here */
});

// Dynamic content loading
window.addEventListener('DOMContentLoaded', function() {
    // Load dynamic content here
});

// Responsive design adjustments
window.addEventListener('resize', function() {
    // Adjustments for responsive design
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'YOUR_TRACKING_ID', 'auto');
ga('send', 'pageview');

// Page control systems
document.getElementById('toggleButton').addEventListener('click', function() {
    // Toggle functionality here
});
