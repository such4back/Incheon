
$(function() {

    var body = $("body");

    // 고정 배너 닫기
    $("#close").on("click", function() {
        $(this).parent("#fixed_banner").hide().next("#nav").css("top", "0");
    });

    // 현재 날짜
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (day < 10)
        day = "0" + day;

    if (month < 10)
        month = "0" + month;

    today = year + ". " + month + ". " + day;
    $("#date").text(today);

    // 글자 크기
    var fontSize = 19;

    $("#size > button").eq(0).on("click", function() {
        // 확대
        if (fontSize == 19) {
            body.css("font-size", "20px");
            fontSize = 20;
        }

        else if (fontSize == 20) {
            body.css("font-size", "21px");
            fontSize = 21;
        }

        else if (fontSize == 21)
            return false;

    }).end().eq(1).on("click", function() {
        // 축소
        if (fontSize == 21) {
            body.css("font-size", "20px");
            fontSize = 20;
        }

        else if (fontSize == 20) {
            body.css("font-size", "19px");
            fontSize = 19;
        }

        else if (fontSize == 19)
            return false;

    }).end().eq(2).on("click", function() {
        // 초기화
        if (fontSize == 19)
            return false;

        else {
            body.css("font-size", "19px");
            fontSize = 19;
        }
    });

    // 서브 메뉴
    var $gnb = $("#gnb");
    var $sub_back = $gnb.next("#sub_back");

    $gnb.on("click", function(e) {

        e.preventDefault();

        if ($sub_back.is(":hidden"))
            $sub_back.show();

        else $sub_back.hide();

    });

    $("#nav").on("mouseleave", function() {
        $sub_back.css("display", "none");
    });
 

    // 배너 슬라이드
    var $slide = $("#slide_img");
    var $slide_button = $("#slide_button > li");
    var delay = 4000;
    var duration = 800;
    var slidingID;

    slidingID = window.setInterval(sliding, delay);

    function sliding() {

        $slide.animate({ marginLeft: "-100%" }, duration, function() {
            $slide.css("margin-left", "0").children(":first").appendTo(this);
        });
    
    };
    
    $slide_button.eq(0).on("click", function() {
        // 이전 버튼
        // window.clearInterval(slidingID);
        $slide.css("margin-left", "-100%").children(":last").prependTo($slide);
        $slide.animate({ marginLeft: 0 }, duration, function() {
            // slidingID = window.setInterval(sliding, delay);
        });

    }).end().eq(1).on("click", function() {

        // 정지 버튼
        var slidingB = $slide_button.find("img").data("sliding");

        if (slidingB) {
            window.clearInterval(slidingID);
            $slide_button.find("img").attr("src", "images/play.png").data("sliding", false);
        }

        else {
            slidingID = window.setInterval(sliding, delay);
            $slide_button.find("img").attr("src", "images/stop.png").data("sliding", true);
        }

    }).end().eq(2).on("click", function() {

        // 다음 버튼
        // window.clearInterval(slidingID);    
        $slide.stop(true, false).animate({ marginLeft: "-100%" }, duration, function() {
            $slide.children(":first").appendTo(this).end().end().css("margin-left", "0");
            // slidingID = window.setInterval(sliding, delay);
        });

    });

    // 컨텐츠 버튼
    var $content_button = $("#content_button > li > a");
    var $content_div = $("#content_2 > div");

    $content_button.on("click", function(e) {
        e.preventDefault();

        if ($(this).parent().is(".button_on"))
            return false;

        $content_button.parent().removeClass("button_on");
        $(this).parent().addClass("button_on");
    
        if ($content_button.eq(0).parent().is(".button_on")) {
            $content_div.hide();
            $content_div.eq(0).show();
        }
    
        else if ($content_button.eq(1).parent().is(".button_on")) {
            $content_div.hide();
            $content_div.eq(1).show();
        }
    
        else if ($content_button.eq(2).parent().is(".button_on")) {
            $content_div.hide();
            $content_div.eq(2).show();
        }
    });

    // 새소식
    var $notice = $("#notice > ul > li");

    $notice.on("click", function(e) {
        e.preventDefault();

        if ($(this).is(".notice_on"))
            return false;

        $notice.siblings(".notice_on").removeClass("notice_on").end().children("ul").removeClass("notice_content_on");
        $(this).addClass("notice_on").children("ul").addClass("notice_content_on");
    });

    // 분야별 정보
    var $tailor = $("#tailor li > a");
    $("#tailor > ul > li > a").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).parent("li").is(".tailor_on"))
            return false;

        $tailor.parent("li").removeClass("tailor_on");
        $(this).parent("li").addClass("tailor_on");
        $tailor.next("ul").hide();
        $(this).next("ul").show();
    });

    // sidebar
    var $sidebar = $("#sidebar > ul > li > a");

    $sidebar.on("click", function(e) {
        e.preventDefault();

        if ($(this).parent("li").is(".fold")) {
            $(this).parent("li").removeClass("fold");
            return false;
        }

        $sidebar.parent("li").removeClass("fold");
        $(this).parent("li").addClass("fold").next("ul").show();
    });

    // 페이지 숫자
    var $pageNum = $("#page > li > a");
    $pageNum.on("click", function(e) {
        e.preventDefault();

        if ($(this).is(".page_on"))
            return false;

        $pageNum.removeClass("page_on");
        $(this).addClass("page_on");
    });

    // 핸드폰 메뉴
    var $mediaMenu = $("#media_menu");
    var $container = $("#container");

    $("#menu_nav").on("click", function() {
        $mediaMenu.css({
            "transition": "0.5s",
            "transform": "translateX(0%)"
        });

        window.setTimeout(function() {
            $container.hide();
        }, 500);
    });

    $("#menu_close").on("click", function() {
        $mediaMenu.css("transform", "translateX(-100%)");
    
        $container.show();
    });

    $mediaMenu.children("#media_menu_list").children("li").children("a").on("click", function() {
        if ($(this).is(".menu_on"))
            $(this).removeClass("menu_on").next(".media_menu_sub").slideUp();

        else {
            $mediaMenu.children("#media_menu_list").children("li").children("a").removeClass("menu_on")
            .next(".media_menu_sub").slideUp();
            $(this).addClass("menu_on").next(".media_menu_sub").slideDown();
        }
    });

    // 핸드폰 검색
    $("#search_nav").on("click", function() {
        if ($(this).siblings("#media_search").is(":visible"))
            $(this).siblings("#media_search").slideUp(200);

        else
            $(this).siblings("#media_search").slideDown(200);
    });


    // footer 더보기
    $("#footer > ul > li:last-child > a").on("click", function(e) {
        e.preventDefault();

        if ($(this).siblings("#other").is(":hidden")) {
            $(this).siblings("#other").css("display", "block")
            .end().children("#footer_plus").css("transform", "rotate( 45deg )");
        }

        else    
            $(this).siblings("#other").css("display", "none")
            .end().children("#footer_plus").css("transform", "rotate( 0deg )");
    });

}); // document.onready