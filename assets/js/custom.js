function copy(e, t) {
    setTimeout(function() {
        $("#copy").remove()
    }, 1e3), $(t).append("<div class='tip' id='copy'>Copied!</div>");
    var o = document.createElement("input");
    o.setAttribute("value", e), document.body.appendChild(o), o.select();
    var i = document.execCommand("copy");
    return document.body.removeChild(o), i
}
document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll(".dropdown-menu").forEach(function(e) {
            e.addEventListener("click", function(e) {
                e.stopPropagation()
            })
        })
    }), document.addEventListener("DOMContentLoaded", function() {
        window.addEventListener("scroll", function() {
            window.scrollY > 240 ? (document.getElementById("fixed").classList.add("fixed-top"), navbar_height = document.querySelector(".navbar").offsetHeight, document.body.style.paddingTop = navbar_height + "px") : (document.getElementById("fixed").classList.remove("fixed-top"), document.body.style.paddingTop = "0")
        })
    }),
    function(e) {
        "use strict";
        e(".js-fullheight").css("height", e(window).height()), e(window).resize(function() {
            e(".js-fullheight").css("height", e(window).height())
        }), e(".slider"), e(".slider").owlCarousel({
            animateOut: "fadeOut",
            center: !1,
            items: 1,
            loop: !0,
            stagePadding: 0,
            margin: 0,
            smartSpeed: 2e3,
            autoplay: !0,
            dots: !1,
            nav: !0,
            navText: [""]
        })
    }(jQuery);
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')),
    popoverList = popoverTriggerList.map(function(e) {
        return new bootstrap.Popover(e)
    });