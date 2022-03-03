// var $window = $(window);
// var $elem = $("#scroll-item")

// check if visible :

    function isScrolledIntoView($elem, $window) {
        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

// execute these when visible:

// $(document).on("scroll", function () {
//     if (isScrolledIntoView($elem, $window)) {
//       $elem.text('asdlkfjalsdkf');
//     }
// });
