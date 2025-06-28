(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Get CSRF token from cookies
    function getCSRFToken() {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const [name, value] = cookies[i].split("=");
            if (name === "csrftoken") {
                return decodeURIComponent(value); // Decode the token if needed
            }
        }
        return null;
    }

    // Action button click event
    document.addEventListener("DOMContentLoaded", function () {
        const buttons = document.querySelectorAll(".action-button");

        const csrfToken = getCSRFToken();
        if (!csrfToken) {
            console.error("CSRF token not found!");
            return;
        }

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const bookingId = this.getAttribute("data-id");

                fetch(`/send-booking-email/${bookingId}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken // Use the dynamic CSRF token
                    },
                    body: JSON.stringify({ id: bookingId })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        alert(data.message); // Notify the user of success
                    })
                    .catch(error => {
                        alert(`An error occurred: ${error.message}`);
                        console.error("Error:", error);
                    });
            });
        });
    });
    
})(jQuery);

