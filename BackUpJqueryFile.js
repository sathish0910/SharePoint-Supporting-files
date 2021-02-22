// Summary      : Adding top navigations and footers to all pages in site
// Ceated by    : K Kiran Kumar Reddy
// Modified by  : K Kiran Kumar Reddy
// Modified     : 27-Jan-2020
InjectHTML = { vars: { InjectHTML: [] }, fn: {} };
document.getElementsByTagName('html')[0].className = 'loading';
InjectHTML.fn.Init = function () {
    InjectHTML.fn.loadFiles();
    InjectHTML.vars.ownerGroup = "SME";
    InjectHTML.vars.isHeSMEMember = false;
}
// Summary : On load function
$(document).ready(function () {
    InjectHTML.vars.webUrl = _spPageContextInfo.webAbsoluteUrl;
    InjectHTML.vars.currentUserId = _spPageContextInfo.userId;
    InjectHTML.fn.usersGroups = [];
    InjectHTML.fn.adminAccessCheck();
    InjectHTML.fn.checkvalidation();
    InjectHTML.fn.bindSupportIcon();
    InjectHTML.fn.showHideNavEventHndler();
    setTimeout(function(){
        InjectHTML.fn.removeLoading();
    }, 1000);
});
InjectHTML.fn.adminAccessCheck = function () {
    InjectHTML.fn.isAdmin(InjectHTML.vars.webUrl, InjectHTML.vars.ownerGroup, InjectHTML.vars.currentUserId).done(function (data) {
        InjectHTML.fn.usersGroups = data;
        $.each(InjectHTML.fn.usersGroups, function (index, val) {
            if (val.Title === "SME") {
                $('.ownerAccess').show();
            }
        });
    });
}
InjectHTML.fn.showHideNavEventHndler = function () {
    $('#suiteBarDelta').hide();
    $("#s4-ribbonrow").hide();
    $(".ownerAccess").click(function () {
        if ($("#suiteBarDelta").css("display") === "block" || $("#suiteBarDelta").css("display") === "table-row") {
            $('#suiteBarDelta').hide();
            $("#s4-ribbonrow").hide();
            $(".header-scrolled").css('margin-top', '0px');
        } else {
            $('#suiteBarDelta').show();
            $("#s4-ribbonrow").show();
            $(".header-scrolled").css('margin-top', '85px');
        }
    });
    $("#RibbonContainer .ms-cui-ct-ul").click(function () {
    	$(".header-scrolled").css('margin-top', [$(".ms-cui-tabContainer-db").height()-21]+'px');
    });
}
//Summary : This function is called to adjust s4-workspace height and remove loading symbol.
//          The loading icon is only removed after office 365 ribbon is drawn
InjectHTML.fn.removeLoading = function () {
    if ($("html").hasClass("loading")) {
        //hide after office 365 ribbon is drawn
        if ($("#suiteBarDelta").children().length > 0 || window.location.href.toString().toLowerCase().indexOf("isdlg") > -1 || InjectHTML.vars.isMobile) {
            InjectHTML.fn.adjustViewPort();
            $("html").removeClass("loading");
        } else {
            setTimeout(InjectHTML.fn.removeLoading, 1000);
        }
    }
}
//Summary : Function to adjust the view of the page
InjectHTML.fn.adjustViewPort = function () {
    var windowHeight = $(window).height();
    $("#s4-workspace").height(windowHeight);//adjust viewport heights
    $("#s4-bodyContainer").css('margin-top', '50px');
}
InjectHTML.fn.checkvalidation = function () {
    var newFormUrl = document.location.pathname.indexOf("/NewForm.aspx");
    var editFormUrl = document.location.pathname.indexOf("/EditForm.aspx");
    var viewFormUrl = document.location.pathname.indexOf("/DispForm.aspx");
    var MyRequestsFormUrl = document.location.pathname.indexOf("/MyRequests.aspx");
    var TrackRequestsFormUrl = document.location.pathname.indexOf("/TrackRequests.aspx");
    InjectHTML.vars.homeFormUrl = document.location.pathname.indexOf("/Welcome.aspx");
    if (newFormUrl === -1 && editFormUrl === -1 && viewFormUrl === -1 && MyRequestsFormUrl === -1 && TrackRequestsFormUrl === -1) {

    } else {
        InjectHTML.fn.loadFormsFiles();
        $('#contentRow').css('padding-top', '47px');
    }
}
InjectHTML.fn.bindSupportIcon = function () {
    $('#s4-workspace').prepend('<div style="z-index: 15;position: absolute;top: 30%;right: 0%;margin: -100px 0 0 -150px;cursor: pointer;border-radius: 50%;" onclick="InjectHTML.fn.OpenSupportPopUp();"><img width="100" height="100" src="/sites/uinsharepoint/Resources/Common/Images/11872011.jpg"></div>');
    $('#gnb').after('<header id="header" class="header-scrolled">\
        <div class="container-fluid">\
            <div id="logo" class="pull-left">\
                <h1><a href="/sites/uinsharepoint/SitePages/Welcome.aspx" class="scrollto" style="font-size: 20px !important;">BT - Technology - UIN Portal</a></h1>\
                <!-- Uncomment below if you prefer to use an image logo -->\
                <a href="/sites/uinsharepoint/SitePages/Welcome.aspx"><img width="80px" height="80px" src="https://office4.bt.com/sites/uinsharepoint/Resources/Common/Images/BT_Logo_Indigo_RGB.png" alt="" title="" /></a>\
            </div>\
            <nav id="nav-menu-container">\
                <ul class="nav-menu sf-js-enabled sf-arrows" style="touch-action: pan-y;">\
                    <li class=""><a href="/sites/uinsharepoint/SitePages/Welcome.aspx">Home</a></li>\
                    <li class=""><a href="https://office4.bt.com/sites/uinsharepoint/Lists/NewJoiner/NewForm.aspx">New Joiner</a></li>\
                    <li><a href="https://office4.bt.com/sites/uinsharepoint/Lists/Extention/NewForm.aspx">Extension</a></li>\
                    <li><a href="https://office4.bt.com/sites/uinsharepoint/Lists/Reactivation/NewForm.aspx">Reactivation</a></li>\
                    <li><a href="https://office4.bt.com/sites/uinsharepoint/Lists/Realignment/NewForm.aspx">Realignment</a></li>\
                    <li><a href="https://office4.bt.com/sites/uinsharepoint/Lists/Termination/NewForm.aspx">Termination</a></li>\
                    <li><a href="https://office4.bt.com/sites/uinsharepoint/SitePages/MyRequests.aspx">My Requests</a></li>\
                    <li><a href="https://office4.bt.com/sites/uinsharepoint/SitePages/TrackRequests.aspx">Track Requests</a></li>\
                    <!-- <li class="menu-has-children"><a href="" class="sf-with-ul">Drop Down</a>\
                        <ul style="display: none;">\
                        <li><a href="#">Drop Down 1</a></li>\
                        <li><a href="#">Drop Down 3</a></li>\
                        <li><a href="#">Drop Down 4</a></li>\
                        <li><a href="#">Drop Down 5</a></li>\
                        </ul>\
                    </li> -->\
                </ul>\
            </nav><!-- #nav-menu-container -->\
        </div>\
        <div class="ownerAccess">Show/Hide</div>\
    </header>');
}
InjectHTML.fn.OpenSupportPopUp = function () {
    var title = "UIN Support";
    var ctnt = "<button type='button' class='btn btn-success'>Issue with UIN Portal – Technical Issue ?</button>";
    InjectHTML.fn.confirmationdialog(title, ctnt);
}
InjectHTML.fn.loadFormsFiles = function () {
    InjectHTML.fn.LoadStyleSheet('/Resources/Common/CSS/bootstrap.min.css');
    InjectHTML.fn.LoadScript("/Resources/Common/JS/bootstrap.min.js");
}
InjectHTML.fn.loadFiles = function () {
    InjectHTML.fn.LoadScript("/Resources/Common/JS/jquery-confirm.min.js");
    InjectHTML.fn.LoadStyleSheet("/Resources/Common/CSS/jquery-confirm.min.css");
    InjectHTML.fn.LoadStyleSheet("/Resources/UIN/Home/CSS/style.css");
}
//Summary : Function to load stylesheet and primary step to avoid user seeing OOB styles

InjectHTML.fn.LoadStyleSheet = function (srcUrl) {
    try {
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        var urlPath = window.location.pathname;
        var firstSlash = urlPath.indexOf('/');
        var secSlash = urlPath.indexOf('/', firstSlash + 1); var tSlash = urlPath.indexOf('/', secSlash + 1);
        var currentSitePath = urlPath.substring(0, tSlash);
        if (tSlash < 0) {
            currentSitePath = urlPath;
        }
        style.href = currentSitePath + srcUrl;
        document.getElementsByTagName('head')[0].appendChild(style);
    } catch (err) {
        InjectHTML.fn.throwCaughtException(err);
    }
};

//Summary : Function to load scripts
InjectHTML.fn.LoadScript = function (sourceUrl) {
    try {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        var urlPath = window.location.pathname;
        var firstSlash = urlPath.indexOf('/');
        var secSlash = urlPath.indexOf('/', firstSlash + 1); var tSlash = urlPath.indexOf('/', secSlash + 1);
        var currentSitePath = urlPath.substring(0, tSlash);
        jqTag.src = currentSitePath + sourceUrl;
        headTag.appendChild(jqTag);
    } catch (err) {
        InjectHTML.fn.throwCaughtException(err);
    }
};
InjectHTML.fn.throwCaughtException = function (err) {
    console.log(err);
}

//Summary : Function to check if Current User is a User or Owner
InjectHTML.fn.isAdmin = function (url, groupName, userId) {
    var dfd = $.Deferred();
    $.ajax({
        url: url + "/_api/web/GetUserById(" + userId + ")/Groups",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            dfd.resolve(data.d.results);
        },
        error: function (data) {
            dfd.resolve([]);
        }
    });
    return dfd.promise();
}
InjectHTML.fn.confirmationdialog = function (title, cntnt, type, typeAnimate, cactionbtnText, requestID) {
    $.confirm({
        title: title,
        content: cntnt,
        buttons: {
            close: function () {
                // lets the user close the modal.
            }
        },
        onOpen: function () {
            var that = this;
            this.$content.find('button').click(function () {
                window.location.href = 'mailto:automation.controltower@bt.com?subject=UIN sharePoint related issue';
            });
        },
    });
}
InjectHTML.fn.Init();