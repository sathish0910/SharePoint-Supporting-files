// Summary      : Adding top navigations, feedback buttons and footers to all pages in site
// Ceated by    : K Kiran Kumar Reddy
// Modified by  : E Sathish
// Modified     : 07-May-2020
// Comments     : Change in Logo and ribbon color
InjectScript = { vars: { InjectScript: [] }, fn: {} };
InjectScript.vars.allLinks = [];
InjectScript.vars.currentUserEmail = "";
InjectScript.vars.currentUserDisplayName = "";
InjectScript.vars.navBarHeight = 0;
document.getElementsByTagName('html')[0].className = 'loading';
InjectScript.fn.Init = function () {
    InjectScript.vars.webUrl = InjectScript.fn.getWebUrl();
    InjectScript.fn.loadFiles();
}
$(document).ready(function () {
    InjectScript.vars.currentUserId = _spPageContextInfo.userId;
    InjectScript.fn.GetSpData();
    InjectScript.fn.InjectScriptToMaster();
    InjectScript.fn.initilizeClickFunctions();
    InjectScript.fn.removeLoading();
});
InjectScript.fn.GetSpData = function () {
    InjectScript.fn.getLinks();
    InjectScript.fn.getCurrentUserDetails(InjectScript.vars.webUrl, InjectScript.vars.currentUserId, false).done(function(data){
        InjectScript.vars.currentUserEmail = data.d.Email;
        InjectScript.vars.currentUserDisplayName = data.d.Title;
    });
}
InjectScript.fn.getLinks = function () {
    InjectScript.vars.allLinks = [];
    var sessionKeyNavLinksCat = "navLinksCat";
    var allLinksCat = sessionStorage.getItem(sessionKeyNavLinksCat);
    if (allLinksCat) {
        var categories = JSON.parse(allLinksCat);
        $.each(categories, function (index, category) {
            InjectScript.vars.allLinks[category.Title] = JSON.parse(sessionStorage.getItem(category.Title));
        });
    } else {
        InjectScript.fn.getQuickLinks(InjectScript.vars.webUrl).done(function (data) {
            sessionStorage.setItem(sessionKeyNavLinksCat, JSON.stringify(data));
            data = InjectScript.fn.groupByAllLinks(data);
            InjectScript.vars.allLinks = data;
        });
    }
}
InjectScript.fn.groupByAllLinks = function (data) {
    var categoryWiseLinks = [];
    $.each(data, function (index, temp) {
        var tempData = {};
        InjectScript.fn.getQuickLinkChildrens(temp.Children.__deferred.uri).done(function (childrenData) {
            tempData = childrenData;
        });
        categoryWiseLinks[temp.Title] = tempData;
        sessionStorage.setItem(temp.Title, JSON.stringify(categoryWiseLinks[temp.Title]));
    });
    return categoryWiseLinks;
}
InjectScript.fn.getWebUrl = function () {
    var url = "";
    var locPath = window.location.href.split("/").splice(0, 5);
    url = locPath.join("/");
    return url;
}

// Summary : Function to load css files in global level
InjectScript.fn.loadFiles = function () {
    InjectScript.fn.LoadStyleSheet('/Resources/Common/CSS/bootstrap.css');
    InjectScript.fn.LoadStyleSheet('/Resources/Common/CSS/style.css');
    InjectScript.fn.LoadStyleSheet('/Resources/Common/CSS/headerfooter.css');
    //InjectScript.fn.LoadStyleSheet('/SiteAssets/TPAssets/Css/animate.css');
    //InjectScript.fn.LoadStyleSheet('/SiteAssets/TPAssets/Css/responsive.css');
    setTimeout(function () {
        InjectScript.fn.LoadScript('/Resources/Common/JS/SPCommon.js');
    }, 2000);
}
// Summary : Function to initilize click events
InjectScript.fn.initilizeClickFunctions = function () {
    InjectScript.fn.showHideNavEventHndler();
}

// Summary : Function to initilize click events
InjectScript.fn.showHideNavEventHndler = function () {
    $(".shownav").click(function () {
        if ($("#suiteBarDelta").css("display") === "block") {
            $('#suiteBarDelta').hide();
            $("#s4-ribbonrow").hide();
            $("#suiteBarDelta").css("margin-top", "35px");
            $("#s4-workspace").css("top", '123px');
        } else {
            $('#suiteBarDelta').show();
            $("#s4-ribbonrow").show();
            $("#suiteBarDelta").css("margin-top", "73px");
            $("#s4-workspace").css("top", '207px');
        }
    });
}
//Summary : Function to load stylesheet and primary step to avoid user seeing OOB styles
InjectScript.fn.LoadStyleSheet = function (srcUrl) {
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
        InjectScript.fn.throwCaughtException(err);
    }
};

//Summary : Function to load scripts
InjectScript.fn.LoadScript = function (sourceUrl) {
    try {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        jqTag.src = InjectScript.vars.webUrl + sourceUrl;
        headTag.appendChild(jqTag);
    } catch (err) {
        InjectScript.fn.throwCaughtException(err);
    }
};

//Summary : Function to handle caught exception
InjectScript.fn.throwCaughtException = function (err) {
    console.log("error in loading");
};

//Summary : This function is called to adjust s4-workspace height and remove loading symbol.
//          The loading icon is only removed after office 365 ribbon is drawn
InjectScript.fn.removeLoading = function () {
    if ($("html").hasClass("loading")) {
        //hide after office 365 ribbon is drawn
        if ($("#suiteBarTop").children().length > 0 || window.location.href.toString().toLowerCase().indexOf("isdlg") > -1 || InjectScript.vars.isMobile) {
            InjectScript.fn.hideTopRibbon();
            InjectScript.fn.addPadding();
            InjectScript.fn.adjustViewPort();
            setTimeout(function () { $("html").removeClass("loading"); }, 2000);
        } else {
            setTimeout(InjectScript.fn.removeLoading, 1000);
        }
    }
}
//Summary : Function to hide top ribbon
InjectScript.fn.hideTopRibbon = function () {
    if ($("#ms-designer-ribbon").length > 0) {
        $("#ms-designer-ribbon").hide();
    } else {
        $("#suiteBarDelta").hide();
        $("#s4-ribbonrow").hide();
    }
}

//Summary : Function to enable top ribbon
InjectScript.fn.openTopRibbon = function () {

}
//Summary : Function to adjust all alignments of top ribbon
InjectScript.fn.addPadding = function () {
    var currentUrl = window.location.href.toLowerCase();
    InjectScript.vars.navBarHeight = $("#globalNavBox").height();
    $("#suiteBarDelta").css("margin-top", InjectScript.vars.navBarHeight + "px");
    $(".navbar").css("margin-top", $('#gnb_inner').height() + "px");
    // if (currentUrl.indexOf("/sitepages/") == -1) {
    //     $("#s4-workspace").css("margin-left", "10px");
    //     InjectScript.vars.navBarHeight += 20;
    // }
    $("#s4-workspace").css({"top": (InjectScript.vars.navBarHeight + ($('#suiteBarDelta').height() - 12) + $("#globalNavBox").height() + 15) + "px", "position": "fixed", "z-index" : "1"});
    // $("#s4-workspace").css({"position": "fixed"}, {"z-index" : "1"});
};
//Summary : Function to adjust the view of the page
InjectScript.fn.adjustViewPort = function () {
    var windowHeight = $(window).height();
    $("#s4-workspace").height(windowHeight);//adjust viewport heights
}
//Summary : Function to prepare topnav with full DOM and binding to site
InjectScript.fn.InjectScriptToMaster = function () {
    var subLinks = InjectScript.fn.AppendData_Nav(InjectScript.vars.allLinks);
    //Header HTML
    var TOP_NAV = '<div class="header"><nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top"><div class="d-flex w-50 order-0 p-2">' +
        '<div class="navbar-brand mr-1"><img onclick="InjectScript.fn.goToHome();" src="/sites/QCPortal/Resources/Common/Images/BT_Logo.png" style="height:3.2vw"class="d-inline-block align-middle" alt="" data-themekey="#">' +
        '<span class="d-inline-block logo-txt" onclick="InjectScript.fn.goToHome();">Quality Center Portal</span></div></div><div style="display:none !important;" class="navbar-collapse collapse justify-content-center order-2" id="collapsingNavbar">' +
        '<ul class="navbar-nav ml-auto main-nav"><li class="nav-item"><a class="nav-link scroll-link p-3" href="#home">Home</a>' +
        '</li><li class="nav-item"><a class="nav-link scroll-link p-3" href="#team">Team</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#coe">COE</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#innovation">Innovation</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#news">News</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#process">Process</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#library">Library</a></li></ul></div>' +
        '<div class="navbar-collapse w-50 order-1 order-md-last otherlinks"><div class="topRibbon-show-hide shownav" onclick="InjectScript.fn.openTopRibbon();"><span>Show/Hide</span></div><ul class="navbar-nav ml-auto horz">' + subLinks + '</ul>' +
        '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">' +
        '<span class="navbar-toggler-icon"></span></button></div></nav><div class="clearfix"></div></div>';
    //Header HTML
    var TOP_NAV_MOBILE =
        '<div class="header-mobile"><nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top"><div class="d-flex w-50 p-2">' +
        '<a class="navbar-brand mr-1 pl-2" href="#"><img src="' + InjectScript.vars.webUrl + '/SiteAssets/TPAssets/Images/logo.png" width="30" height="30" class="d-inline-block align-middle" alt="" data-themekey="#">' +
        '<span class="d-inline-block logo-txt">Talent Procurement</span></a></div><div class="sidenav" id="collapsingNavbar">' +
        '<ul class="navbar-nav ml-auto main-nav"><li class="nav-item"><a class="nav-link scroll-link p-3" href="#home">Home</a>' +
        '</li><li class="nav-item"><a class="nav-link scroll-link p-3" href="#team">Team</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#coe">COE</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#innovation">Innovation</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#news">News</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#process">Process</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" href="#library">Library</a></li>' +
        '<li class="nav-item"><a class="nav-link scroll-link p-3" onclick="InjectScript.fn.openSubNav()">Quick Links</a></li></ul></div>' +
        '<button class="" type="button" data-toggle="" data-target="#collapsingNavbar" id="hamburgerButton" onclick="InjectScript.fn.openNav()">' +
        '<span class="navbar-toggler-icon"></span></button>' +
        '<button class="nav-close-button close" type="button" data-target="#collapsingNavbar" aria-label="Close" id="closeButton" onclick="InjectScript.fn.closeNav()">' +
        '<span class="closebtn text-white ml-5">&times</span></button>' +
        '<div class="subnav"><div class="subnav-header p-4"><div onclick="InjectScript.fn.closeSubNav()"><<span class="p-1 border-bottom"> Quick Links</span></div>' +
        '<ul class="nav horz-mobile pt-1" role="tablist">' + subLinks + '</ul></div><div class="horz-mobile-tab tab-content"></div></div>' +
        '</nav><div class="clearfix"></div></div>';
    if (InjectScript.vars.isMobile) {
        TOP_NAV = TOP_NAV_MOBILE;
    }

    //$("#s4-bodyContainer").prepend(TOP_NAV_MOBILE);
    $('#suiteBarDelta').before(TOP_NAV);
}
//Summary : Function to get get uniqe categories and prepare topnav
InjectScript.fn.AppendData_Nav = function (data) {
    var categories = _.keys(data);
    return TopNav_headers = InjectScript.fn.AppendData_Cat(categories, data);
}

//Summary : Function to prepare topnav using _.map
InjectScript.fn.AppendData_Cat = function (Categories, data) {
    return innerHTML = _.map(Categories, function (val, index) {
        var subLinksInnerHTML = _.map(data[val], function (sb_Temp, subLinkIndex) {
            return '<a class="dropdown-item" href="' + sb_Temp.Url + '">' + sb_Temp.Title + '</a>';
        }).join('');
        return '<li class="nav-item dropdown"><a style="padding-top: 0px !important;" class="nav-link dropdown-toggle other-Links" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + Categories[index] + '<span class="dropdown-icons mr"><img src="' + InjectScript.vars.webUrl + '/Resources/Common/Images/Header_dropdown.png" data-themekey="#"></span></a><div class="dropdown-menu ' + Categories[index].replace(/\s/g, '') + '" aria-labelledby="navbarDropdown">' + subLinksInnerHTML + '</div>';
    }).join('');
}

//Summary : Function to goback to home
InjectScript.fn.goToHome = function () {
    window.location.replace('' + InjectScript.vars.webUrl + '/SitePages/Homepage.aspx');
}

/**************************************************************************/
/// Function name: getQuickLinks
/// Summary:  To get navigations from current site
/**************************************************************************/
InjectScript.fn.getQuickLinks = function (url) {
    var dfd = $.Deferred();
    $.ajax({
        url: url + "/_api/web/Navigation/QuickLaunch",
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            dfd.resolve(data.d.results);
        },
        error: function (data) {
            dfd.reject(JSON.stringify(data));
        }
    });
    return dfd.promise();
}
/**************************************************************************/
/// Function name: getQuickLinkChildrens
/// Summary:  To get navigations from current site
/**************************************************************************/
InjectScript.fn.getQuickLinkChildrens = function (url) {
    var dfd = $.Deferred();
    $.ajax({
        url: url,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            dfd.resolve(data.d.results);
        },
        error: function (data) {
            dfd.reject(JSON.stringify(data));
        }
    });
    return dfd.promise();
}
/**************************************************************************/
/// Function name: getListItems
/// Summary:  To get list items by REST using filter query
/**************************************************************************/
InjectScript.getListItems = function (url, listname, query, sync) {
    var dfd = $.Deferred();

    $.ajax({
        url: url + "/_api/web/lists/getbytitle('" + listname + "')/items" + query,
        async: !sync,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            dfd.resolve(data.d.results);
        },
        error: function (data) {
            dfd.reject(JSON.stringify(data));
        }
    });
    return dfd.promise();
};

/**************************************************************************/
/// Function name: updateListItem
/// Summary:  To update list item by id
/**************************************************************************/
InjectScript.updateListItem = function (url, listname, listItemId, restBody, listType, sync) {
    var dfd = $.Deferred();
    !listType ? InjectScript.getListItemType(url, listname, true).done(function (result) { listType = result.d.ListItemEntityTypeFullName }) : "";
    // Prepping our update
    var item = $.extend({
        "__metadata": { "type": listType }
    }, restBody);

    // Executing our add
    $.ajax({
        url: url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + listItemId + ")",
        async: !sync,
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "MERGE",
            "If-Match": "*"
        },
        success: function (data) {
            dfd.resolve(data);
        },
        error: function (data) {
            dfd.reject(JSON.stringify(data));
        }
    });

    return dfd.promise();
};
/**************************************************************************/
/// Function name: getListItemType
/// Summary:  To get list itemtype using listname
/**************************************************************************/
/*InjectScript.getListItemType = function (name) {return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";};*/
InjectScript.getListItemType = function (url, listName, sync) {
    var dfd = $.Deferred();
    $.ajax({
        url: url + "/_api/web/lists/getbytitle('" + listName + "')/ListItemEntityTypeFullName",
        async: !sync,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            dfd.resolve(data);
        },
        error: function (data) {
            dfd.reject(JSON.stringify(data));
        }
    });
    return dfd.promise();
};

// Summary : Function to send an email
InjectScript.fn.sendAnEmail = function (to, cc, body, subject) {
    var dfd = $.Deferred();
   $.ajax({
       contentType: 'application/json',
       url: InjectScript.vars.webUrl + "/_api/SP.Utilities.Utility.SendEmail",
       type: "POST",
       async: true,
       data: JSON.stringify({
           'properties': {
               '__metadata': {
                   'type': 'SP.Utilities.EmailProperties'
               },
               'To': {
                  'results': to
               },
               'CC':{
                   'results':cc
               },
               'Body': body,
               'Subject': subject
           }
       }),
       headers: {
          "Accept": "application/json;odata=verbose",
           "content-type": "application/json;odata=verbose",
           "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
      },
       success: function (data) {
           dfd.resolve(data.value);
       },
       error: function (err) {
           dfd.resolve([]);
           alert('Error in sending Email: ' + JSON.stringify(err));
       }
   });
   return dfd.promise();
}

InjectScript.fn.getCurrentUserDetails = function(url, userID, sync){
    var dfd = $.Deferred();
    $.ajax({
        url: url + "/_api/web/getuserbyid("+userID+")",
        async: !sync,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            dfd.resolve(data);
        },
        error: function (data) {
            dfd.reject(JSON.stringify(data));
        }
    });
    return dfd.promise();
}
InjectScript.fn.toDataURL = function (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}
InjectScript.fn.Init();