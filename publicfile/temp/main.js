if (typeof ga === 'undefined') {
    ga = function () {
        // Dummy function.
    }
}

if (path === "") {
    $('#nav-link-home').addClass('active');
} else if (path === '/youtube-downloader-for-android') {
    $('#nav-link-android').addClass('active');
} else if (path === '/video-downloader-for-pc') {
    $('#nav-link-desktop').addClass('active');
}
// else if (path === '/online-video-downloader') {
//     $('#nav-link-online').addClass('active');
// }

// Scroll on clicking scroll button
$('#header-scroll-hint').on('click', function () {
    if ($(window).width() >= 768) {
        $('html, body').animate({
            scrollTop: 610
        }, 500);
    } else {
        $('html, body').animate({
            scrollTop: 500
        }, 500);
    }

});

// search
var $searchForm = $('#search-form');
var $searchInput = $('#search-input');
var $searchIcon = $('#search-icon');

function performSearch(e) {
    if (barredRegion === 'true') {
        e.preventDefault();
        // alert('Download and search from Youtube is not supported anymore.')
        $youtubeMessage = $('#no-youtube-support-message');
        if ($youtubeMessage && $youtubeMessage.is(":hidden")) {
            $youtubeMessage.show();
            $youtubeMessage.addClass('slidedown');
            setTimeout(()=> {
                $youtubeMessage.addClass('slideup');
                setTimeout(()=> {
                    $youtubeMessage.hide();
                    $youtubeMessage.removeClass('slidedown');
                    $youtubeMessage.removeClass('slideup');
                }, 200);
            }, 5000)

        }

    } else {
        var searchedQuery = $searchInput.val();
        var matched = /(?:(?:https?:\/\/)?)(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com(?!\/user)(?!\/shared)(?!\/channel)\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['\"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi.exec(searchedQuery);
        if (matched && matched.length > 1) {
            var videoId = matched[1];
            window.location = '/video?v=' + videoId;
        } else {
            ga('send', 'event', 'Search', $searchInput.val());
            window.location = '/search/results?query=' + $searchInput.val();
        }
        return false;
    }
}

$searchIcon.on('click', performSearch);
$searchForm.on('submit', performSearch);

// Navbar scrolling
var oldScrollTop = $(window).scrollTop();
$(window).on('scroll', function (e) {
    if ($(window).width() >= 768) {
        if ($(window).scrollTop() > 85) {

            if (path !== '/download/' && path !== '/download/videoder-for-android' && path !== '/download/videoder-for-pc' && path !== '/steps-to-download-videoder-on-pc') {
                $('#scrolled-nav-desktop:hidden').slideDown(500);
            }
        } else if ($(window).scrollTop() <= 85 && oldScrollTop > 85) {
            $('#scrolled-nav-desktop:visible').hide();
        }
    } else {
        if ($(window).scrollTop() > 300) {
            if (path !== '/download/' && path !== '/download/videoder-for-android' && path !== '/download/videoder-for-pc' && path !== '/steps-to-download-videoder-on-pc') {
                $('#scrolled-nav-mobile:hidden').slideDown(500);
            }
        } else if ($(window).scrollTop() <= 300 && oldScrollTop > 300) {
            $('#scrolled-nav-mobile:visible').hide();
        }
    }
    oldScrollTop = $(window).scrollTop();
});

// Subscription Form
var subscriptionCallRunning = false;
$('.subscription-form').submit(function (e) {
    e.preventDefault();
    var $subscriptionForm = $(this);
    if (!subscriptionCallRunning) {
        subscriptionCallRunning = true;
        var submitText = $subscriptionForm.find("input[name='Subscribe']").prop('value');
        var inputEmail = $subscriptionForm.find("input[name='email']").val();
        var inputName = $subscriptionForm.find("input[name='name']").val();
        $subscriptionForm.find("input[name='Subscribe']").prop('value', "...");
        $.post('/mailinglist/subscribe', {
            email: inputEmail,
            firstName: inputName,
            listName: "Videoder Website",
            sendThankyouMail: true
        }, function (data) {
            subscriptionCallRunning = false;
            $subscriptionForm.find("input[name='Subscribe']").prop('value', submitText);
            if (data.status) {
                $subscriptionForm.find('.form-inputs').hide();
                $subscriptionForm.find('.success-message-container > .email').text(inputEmail);
                $subscriptionForm.find('.success-message-container').show();
            } else {
                $subscriptionForm.find('.form-inputs > .message').text(data.message);
            }
        }).fail(() => {
            subscriptionCallRunning = false;
            $subscriptionForm.find("input[name='Subscribe']").val('value', submitText);
        })
    }
});

// Add slideDown animation to Bootstrap dropdown when expanding.
var $dropDown = $('.dropdown');
$dropDown.on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
});

// Add slideUp animation to Bootstrap dropdown when collapsing.
$dropDown.on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);
});

// Tracking
var eventCategories = {
    ANDROID_DOWNLOAD_BUTTON: "Android Download Button",
    MAC_DOWNLOAD_BUTTON: "Mac Download Button",
    WINDOWS_DOWNLOAD_BUTTON: "Windows Download Button",
    RESTART_DOWNLOAD: "Restart Download",
    PREVIEW_DOWNLOAD_PAGE: "Preview Download Page",
    TOP_NAVBAR: "Top Navbar",
    PAGES: "Pages"
};

$(".android-download-btn").on("click", function () {
    if ($(this).hasClass('header-button')) {
        ga('send', 'event', eventCategories.ANDROID_DOWNLOAD_BUTTON, "Header", locale);
    } else if ($(this).hasClass('content-button')) {
        ga('send', 'event', eventCategories.ANDROID_DOWNLOAD_BUTTON, "Content", locale);
    } else if ($(this).hasClass('footer-button')) {
        ga('send', 'event', eventCategories.ANDROID_DOWNLOAD_BUTTON, "Footer", locale);
    } else if ($(this).hasClass('overlay-button')) {
        ga('send', 'event', eventCategories.ANDROID_DOWNLOAD_BUTTON, "Overlay", locale);
    }
});

$(".mac-download-btn").on("click", function () {
    if ($(this).hasClass('header-button')) {
        ga('send', 'event', eventCategories.MAC_DOWNLOAD_BUTTON, "Header", locale);
    } else if ($(this).hasClass('content-button')) {
        ga('send', 'event', eventCategories.MAC_DOWNLOAD_BUTTON, "Content", locale);
    } else if ($(this).hasClass('footer-button')) {
        ga('send', 'event', eventCategories.MAC_DOWNLOAD_BUTTON, "Footer", locale);
    }
});

$(".windows-download-btn").on("click", function () {
    if ($(this).hasClass('header-button')) {
        ga('send', 'event', eventCategories.WINDOWS_DOWNLOAD_BUTTON, "Header", locale);
    } else if ($(this).hasClass('content-button')) {
        ga('send', 'event', eventCategories.WINDOWS_DOWNLOAD_BUTTON, "Content", locale);
    } else if ($(this).hasClass('footer-button')) {
        ga('send', 'event', eventCategories.WINDOWS_DOWNLOAD_BUTTON, "Footer", locale);
    }
});


$("#restart-download-button").on('click', function () {
    if ($(this).hasClass('android')) {
        ga('send', 'event', eventCategories.RESTART_DOWNLOAD, "Android");
    } else if ($(this).hasClass('windows')) {
        ga('send', 'event', eventCategories.RESTART_DOWNLOAD, "Windows");
    } else if ($(this).hasClass('mac')) {
        ga('send', 'event', eventCategories.RESTART_DOWNLOAD, "Mac");
    } else {
        ga('send', 'event', eventCategories.RESTART_DOWNLOAD);
    }
});

$(".preview-download-page").on("click", function () {
    var location = path;
    if (location === "") {
        location = '/';
    }
    if ($(this).hasClass('header-button')) {
        ga('send', 'event', eventCategories.PREVIEW_DOWNLOAD_PAGE, location, 'Header');
    } else if ($(this).hasClass('overlay-button')) {
        ga('send', 'event', eventCategories.PREVIEW_DOWNLOAD_PAGE, location, 'Overlay');
    } else if ($(this).hasClass('footer-button')) {
        ga('send', 'event', eventCategories.PREVIEW_DOWNLOAD_PAGE, location, 'Footer');
    } else if ($(this).hasClass('content-button')) {
        ga('send', 'event', eventCategories.PREVIEW_DOWNLOAD_PAGE, location, 'Content');
    }
});

$(".top-navbar-link").on("click", function () {
    var location = path;
    if (location === "") {
        location = "/";
    }
    if ($(this).attr('id') === 'nav-link-home') {
        ga('send', 'event', eventCategories.TOP_NAVBAR, 'Home', location)
    } else if ($(this).attr('id') === 'nav-link-desktop') {
        ga('send', 'event', eventCategories.TOP_NAVBAR, 'Desktop', location)
    } else if ($(this).attr('id') === 'nav-link-android') {
        ga('send', 'event', eventCategories.TOP_NAVBAR, 'Android', location)
    } else if ($(this).attr('id') === 'nav-link-online') {
        ga('send', 'event', eventCategories.TOP_NAVBAR, 'Online', location)
    }
});

$(document).ready(function () {
    var location = path;
    if (location === "") {
        location = "/";
    }
    ga('send', 'event', eventCategories.PAGES, location.split("?")[0], locale);
});