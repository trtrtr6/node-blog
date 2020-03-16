/**
 * Created by xyy on 2017/10/6.
 */
$('.ui.accordion').accordion({
    selector: {}
});

$(".ui.dropdown").dropdown({
    allowCategorySelection: true,
    transition: "fade up"
});


var isMobile = window.matchMedia("only screen and (max-width: 768px)");

if (isMobile.matches) {
    $("body")
        .getNiceScroll()
        .remove();
    $(".sidebar")
        .getNiceScroll()
        .remove();

    $(".computer.only").toggleClass("displaynone");
    $(".colhidden").toggleClass("displaynone");
} else {
    $("body").niceScroll({
        cursorcolor: "#3d3b3b",
        cursorwidth: 5,
        cursorborderradius: 0,
        cursorborder: 0,
        scrollspeed: 50,
        autohidemode: true,
        zindex: 9999999
    });
    $(".sidebar").niceScroll({
        cursorcolor: "#3d3b3b",
        cursorwidth: 2,
        cursorborderradius: 0,
        cursorborder: 0,
        scrollspeed: 50,
        autohidemode: true,
        zindex: 9999999
    });
}