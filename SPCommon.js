/* 
Copyright (C) 2017  Ramees A K
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation
*/

(function () {
    'use strict';
    Type.registerNamespace('SPCommon');
    window.mobileAndTabletcheck = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    /// Summary:  Global Variables
    /**************************************************************************/
    SPCommon.userid = _spPageContextInfo.userId;
    SPCommon.siteUrl = _spPageContextInfo.webAbsoluteUrl;
    SPCommon.siteLayoutsUrl = SPCommon.siteUrl + "/_layouts/15/";
    SPCommon.userProfileServiceUrl = SPCommon.siteUrl + '/_vti_bin/UserProfileService.asmx';
    SPCommon.waitDialog = null;

    SPCommon.notifyId = null;
    SPCommon.notificationTypes = ['error', 'success', 'warning', 'notice'];

    /**************************************************************************/
    /// Function name: getParameterByName
    /// Summary:  To get querystring parameters by name/key
    /**************************************************************************/
    SPCommon.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]").toLowerCase();
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search.toLowerCase());
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    /**************************************************************************/
    /// Function name: bindOptionsFromArray
    /// Summary:  To bind select options from Array
    /**************************************************************************/
    SPCommon.bindOptionsFromArray = function (optionsArray, ddlControlId, textKey, valueKey) {
        var isSingleDimesionalArray = (textKey == '' || valueKey == '') ? true : false;
        var objDropDown = $("#" + ddlControlId);
        objDropDown.empty();
        //objDropDown.append($("<option></option>").val("").html(""));
        $.each(optionsArray, function (i, item) {
            if (String(item) !== '') {
                objDropDown.append($("<option></option>").val(isSingleDimesionalArray ? String(item) : String(item[valueKey])).html(isSingleDimesionalArray ? String(item) : String(item[textKey])));
            }
        });
        objDropDown.prop('selectedIndex', 0);
    };

    SPCommon.bindOptionsFromTermstore = function (termstoreId, ddlControlId, isChild) {
        var dfd = $.Deferred();
        $("#" + ddlControlId).empty();
        //Current Context
        var context = new SP.ClientContext.get_current();
        //Current Taxonomy Session
        var taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
        //Term Stores
        var termStores = taxSession.get_termStores();
        //Name of the Term Store from which to get the Terms.
        var termStore = termStores.getByName("Connection to: Managed Metadata Service Application");
        //GUID of Term Set from which to get the Terms.
        var termSet = null;
        var terms = null;
        if (!isChild) {
            termSet = termStore.getTermSet(termstoreId);
            terms = termSet.get_terms();
        } else {
            termSet = termStore.getTerm(termstoreId);
            terms = termSet.get_terms();
        }
        context.load(terms);
        context.executeQueryAsync(function () {
            var termEnumerator = terms.getEnumerator();
            var cats = "<option value='Select'>Select</option>";
            var taxonomyData = [];
            while (termEnumerator.moveNext()) {
                var currentTerm = termEnumerator.get_current();
                cats += "<option value='" + currentTerm.get_id() + "'>" + currentTerm.get_name() + "</option>";
                taxonomyData.push({ ID: currentTerm.get_id(), Value: currentTerm.get_name() });
            }

            $("#" + ddlControlId).append(cats);
            dfd.resolve(taxonomyData);
        },
            function (sender, args) {
                dfd.reject(args.get_message());
            });

        return dfd.promise();
    };

    SPCommon.getOptionsFromTermstore = function (termstoreId, isChild) {
        var dfd = $.Deferred();

        //Current Context
        var context = new SP.ClientContext.get_current();
        //Current Taxonomy Session
        var taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
        //Term Stores
        var termStores = taxSession.get_termStores();
        //Name of the Term Store from which to get the Terms.
        var termStore = termStores.getByName("Connection to: Managed Metadata Service Application");
        //GUID of Term Set from which to get the Terms.
        var termSet = null;
        var terms = null;
        if (!isChild) {
            termSet = termStore.getTermSet(termstoreId);
            terms = termSet.getAllTerms();
        } else {
            termSet = termStore.getTerm(termstoreId);
            terms = termSet.get_terms();
        }

        context.load(terms);
        context.executeQueryAsync(function () {
            var termEnumerator = terms.getEnumerator();
            var taxonomyData = [];
            while (termEnumerator.moveNext()) {
                var currentTerm = termEnumerator.get_current();
                taxonomyData.push({ ID: currentTerm.get_id(), Value: currentTerm.get_name() });
            }
            dfd.resolve(taxonomyData);
        },
            function (sender, args) {
                dfd.reject(args.get_message());
            });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: validateFieldValue
    /// Summary:  To do null value check for the field value
    /**************************************************************************/
    SPCommon.validateFieldValue = function (fieldVal) {
        var strFieldVal = fieldVal != null ? fieldVal : '';
        return strFieldVal;
    };

    /**************************************************************************/
    /// Function name: getArrayItemValueBykey
    /// Summary:  To get items from Multidimensional Array by the key, value pair
    /**************************************************************************/
    SPCommon.getArrayItemValueBykey = function (arrayVal, key, value) {
        var strResult = '';
        var result = $.grep(arrayVal, function (e) {
            return e[key] == value;
        });
        if (result.length > 0) {
            strResult = result[0].Value != null ? result[0].Value : '';
        }
        return strResult;
    };
    /**************************************************************************/
    /// Function name: mobileAndTabletcheck
    /// Summary:  To check wheather site running in which device
    /**************************************************************************/
    SPCommon.mobileAndTabletcheck = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    /**************************************************************************/
    /// Function name: getArrayItemValueByKeyValuePair
    /// Summary:  To get items from Multidimensional Array by the key, value pair
    /**************************************************************************/
    SPCommon.getArrayItemValueByKeyValuePair = function (arrayVal, key, value) {
        var keys = Object.keys(arrayVal),
            i = 0,
            item = [];
        for (var i = 0; i < keys.length; i++) {
            if (arrayVal[keys[i]][key] === value) {
                item.push(arrayVal[keys[i]]);
            }
        }
        return item
    };

    SPCommon.DoSoapAjax = function (url, methodName, soapXml, resposeAsArray) {
        var dfd = $.Deferred();
        $.ajax({
            url: url,
            beforeSend: function (xhr) { xhr.setRequestHeader("SOAPAction", "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/" + methodName); },
            type: "POST",
            dataType: "xml",
            data: soapXml,
            contentType: "text/xml; charset=\"utf-8\"",
            success: function (dataXml, textStatus) {
                var response;
                if (resposeAsArray) {
                    response = [];
                    $(dataXml).find('GetUserLinksResult').find('QuickLinkData').each(function () {
                        response.push({ ID: $(this).find('ID').text(), Name: $(this).find('Name').text(), Group: $(this).find('Group').text(), Url: $(this).find('Url').text(), Privacy: $(this).find('Privacy').text() });
                    });
                } else {
                    response = dataXml;
                }

                dfd.resolve(response);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                dfd.reject(JSON.stringify(errorThrown));
            }
        });
        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: getSPSiteQuickLunchLinks
    /// Summary:  To get navigations from current site
    /**************************************************************************/
    SPCommon.getSPSiteQuickLunchLinks = function () {
        var dfd = $.Deferred();
        $.ajax({
            url: SPCommon.siteUrl + "/_api/web/Navigation/QuickLaunch",
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
    }
    /**************************************************************************/
    /// Function name: getSPSiteQuickLunchChildLinks
    /// Summary:  To get child navigations from inheritance from current site
    /**************************************************************************/
    SPCommon.getSPSiteQuickLunchChildLinks = function (url) {
        var dfd = $.Deferred();
        $.ajax({
            url: url,
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
    }
    /**************************************************************************/
    /// Function name: getUserProfilePropertyFor
    /// Summary:  To get user details by email
    /**************************************************************************/
    SPCommon.getUserProfilePropertyFor = function (accountName, profilePropertyName) {
        var dfd = $.Deferred();

        //Current Context
        var context = new SP.ClientContext.get_current();
        var peopleManager = new SP.UserProfiles.PeopleManager(context);
        var userProfileProperty = peopleManager.getUserProfilePropertyFor(accountName, profilePropertyName);
        context.executeQueryAsync(function () {
            var returnVal = userProfileProperty.get_value();
            dfd.resolve(returnVal);
        },
            function (sender, args) {
                dfd.reject(args.get_message());
            });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: getUserDetails
    /// Summary:  To get user details by user id
    /**************************************************************************/
    SPCommon.getUserDetails = function (url, userid) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/getuserbyid(" + userid + ")",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: getUserAcountDetails
    /// Summary:  To get user account details by user accountname
    /**************************************************************************/
    SPCommon.getUserAcountDetails = function (url, accountName) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(accountName) + "'",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d.UserProfileProperties.results);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: getUserIdByAccountName
    /// Summary:  To get user id in sharepoint site by user accountname
    /**************************************************************************/
    SPCommon.getUserIdByAccountName = function (url, accountName) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/siteusers(@v)?@v='" + encodeURIComponent(accountName) + "'",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d.Id);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: addListItem
    /// Summary:  To add new list item
    /**************************************************************************/
    SPCommon.addListItem = function (url, listname, restBody, listType, sync) {
        var dfd = $.Deferred();
        !listType ? SPCommon.getListItemType(url, listname, true).done(function (result) { listType = result.d.ListItemEntityTypeFullName }) : "";
        // Prepping our update
        var item = $.extend({
            "__metadata": { "type": listType }
        }, restBody);

        // Executing our add
        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listname + "')/items",
            type: "POST",
            async: !sync,
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                dfd.resolve(data.d);
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
    SPCommon.updateListItem = function (url, listname, listItemId, restBody, listType, sync) {
        var dfd = $.Deferred();
        !listType ? SPCommon.getListItemType(url, listname, true).done(function (result) { listType = result.d.ListItemEntityTypeFullName }) : "";
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
    /// Function name: getFileBuffer
    /// Summary:  To get file byte array
    /**************************************************************************/
    SPCommon.getFileBuffer = function (file) {
        var deferred = $.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        };
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        };
        reader.readAsArrayBuffer(file);
        return deferred.promise();
    };

    /**************************************************************************/
    /// Function name: addFileAsListAttachment
    /// Summary:  To add file as list item attachment
    /**************************************************************************/
    SPCommon.addFileAsListAttachment = function (url, listName, itemId, fileName, arrayBuffer) {

        return $.ajax({
            url: url + "/_api/web/lists/GetByTitle('" + listName + "')/items(" + itemId + ")/AttachmentFiles/add(FileName='" + fileName + "')",
            type: "POST",
            async: false,
            data: arrayBuffer,
            processData: false,
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        });
    };

    /**************************************************************************/
    /// Function name: getListItemType
    /// Summary:  To get list itemtype using listname
    /**************************************************************************/
    /*SPCommon.getListItemType = function (name) {return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";};*/
    SPCommon.getListItemType = function (url, listName, sync) {
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
    /**************************************************************************/
    /// Function name: deleteListItem
    /// Summary:  To delete list item by id
    /**************************************************************************/
    SPCommon.deleteListItem = function (url, listName, itemId) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-Http-Method": "DELETE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "If-Match": "*"
            },
            success: function (data) {
                dfd.resolve(true);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: deleteFolderByUrl
    /// Summary:  To delete folder by folderRelativeUrl
    /**************************************************************************/
    SPCommon.deleteFolderByRelativeUrl = function (url, folderRelativeUrl) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/GetFolderByServerRelativeUrl('" + folderRelativeUrl + "')",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-Http-Method": "DELETE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "If-Match": "*"
            },
            success: function (data) {
                dfd.resolve(true);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };
    /**************************************************************************/
    /// Function name: getListItems
    /// Summary:  To get list items by REST using filter query
    /**************************************************************************/
    SPCommon.getListDropDownFeildValues = function (listname, fieldName, sync) {
        var dfd = $.Deferred();
        $.ajax({
            url: SPCommon.siteUrl +"/_api/web/lists/GetByTitle('" + listname + "')/fields/getbytitle('"+fieldName+"')",
            async: !sync,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d.Choices.results);
            },
            error: function (error) {
                dfd.reject(JSON.stringify(data));
            }
        });
        return dfd.promise();
    };
    /**************************************************************************/
    /// Function name: getListItems
    /// Summary:  To get list items by REST using filter query
    /**************************************************************************/
    SPCommon.getListItems = function (url, listname, query, sync) {
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
    /// Function name: getFileProperties
    /// Summary:  To get File Properties by REST using filter query
    /**************************************************************************/
    SPCommon.getFileProperties = function (url,sync) {
        var dfd = $.Deferred();
        $.ajax({
            url: url,
            async: !sync,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });
        return dfd.promise();
    };

    /// Function name: getListItems
    /// Summary:  To get list items by REST using filter query
    /**************************************************************************/
    SPCommon.getFolders = function (url, sync) {
        var dfd = $.Deferred();
        $.ajax({
            url: url,
            async: !sync,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });
        return dfd.promise();
    };
    /**************************************************************************/
    /// Function name: getListItemById
    /// Summary:  To get list items by REST using ID
    /**************************************************************************/
    SPCommon.getListItemById = function (url, listname, id, sync) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + id + ")",
            async: !sync,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                dfd.resolve(data.d);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: getListItemsByCAML
    /// Summary:  To get list items  by REST using CAML query
    /**************************************************************************/
    SPCommon.getListItemsByCAML = function (url, listname, camlquery) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listname + "')/GetItems(query=@v1)?@v1={\"ViewXml\":\"" + camlquery + "\"}",
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
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
    /// Function name: getListItemAttachments
    /// Summary:  To get list item ttachments by REST
    /**************************************************************************/
    SPCommon.getListItemAttachments = function (url, listname, itemId) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listname + "')/items(" + itemId + ")/AttachmentFiles",
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
    /// Function name: getListItemAttachments
    /// Summary:  To get list item attachments by REST
    /**************************************************************************/
    SPCommon.deleteListItemAttachment = function (url, listName, itemId, fileName) {
        var dfd = $.Deferred();

        $.ajax({
            url: url + "/_api/web/lists/getbytitle('" + listName + "')/getItemById(" + itemId + ")/AttachmentFiles/getByFileName('" + fileName + "')",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-Http-Method": "DELETE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "If-Match": "*"
            },
            success: function (data) {
                dfd.resolve(true);
            },
            error: function (data) {
                dfd.reject(JSON.stringify(data));
            }
        });

        return dfd.promise();
    };

    //selectProperties = SMNameOWSTEXT,SMDescriptionOWSMTXT,ListitemId
    /**************************************************************************/
    /// Function name: getFullSearchResults
    /// Summary:  To get all results using search api based on the query input
    /**************************************************************************/
    SPCommon.getFullSearchResults = function (webUrl, queryText, selectProperties, sortOrder, rowLimit, startRow, allResults) {
        var allResults = allResults || [];
        var url = webUrl + "/_api/search/query?querytext='" + queryText + "'" + sortOrder + "&selectproperties='" + selectProperties + "'&rowlimit=" + rowLimit + "&startrow=" + startRow;

        return $.ajax({
            url: url,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        }).then(function (data) {
            var relevantResults = data.d.query.PrimaryQueryResult.RelevantResults;
            var currentResults = relevantResults.Table.Rows.results;
            var tempResults = [];
            for (var i = 0; i < relevantResults.RowCount; i++) {
                var fieldResults = currentResults[i].Cells.results;
                //var tempDeletedObj = $.grep(SPCommon.deletedMeetingsObject, function (element, index) {
                //    return (element == SMLocator);
                //});
                //if (tempDeletedObj.length <= 0) {
                tempResults.push({
                    TechnologyName: fieldResults[2].Value,
                    Description: SPCommon.validateFieldValue(fieldResults[3].Value),
                    TechnologyCategory: fieldResults[4].Value,
                    Theme: fieldResults[5].Value,
                    Scenario: SPCommon.validateFieldValue(fieldResults[6].Value),
                    SubScenario: SPCommon.validateFieldValue(fieldResults[7].Value),
                    TechnicalSpecifications: SPCommon.validateFieldValue(fieldResults[8].Value),
                    TechnicalThumbnail: fieldResults[9].Value,
                    Capabilities: SPCommon.validateFieldValue(fieldResults[10].Value),
                    TechnologyId: fieldResults[11].Value
                });
                //}
            }
            allResults = $.merge(allResults, tempResults);
            if (relevantResults.TotalRows > startRow + relevantResults.RowCount) {
                return SPCommon.getFullSearchResults(webUrl, queryText, sortOrder, rowLimit, startRow + relevantResults.RowCount, allResults);
            }
            return allResults;
        });
    };

    /**************************************************************************/
    /// Function name: getFilterResults
    /// Summary:  To get filter results using search api based on the query input
    /**************************************************************************/
    SPCommon.getFilterResults = function (webUrl, queryText, selectProperties, rowLimit, startRow) {
        var allResults = [];
        //'Title,ListItemID'
        var url = webUrl + "/_api/search/query?querytext='" + queryText + "'&sortlist='Created:descending'&selectproperties='" + selectProperties + "'&rowlimit=" + rowLimit + "&startrow=" + startRow;

        return $.ajax({
            url: url,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        }).then(function (data) {
            var relevantResults = data.d.query.PrimaryQueryResult.RelevantResults;
            var currentResults = relevantResults.Table.Rows.results;
            for (var i = 0; i < relevantResults.RowCount; i++) {
                var fieldResults = currentResults[i].Cells.results;
                allResults.push({ label: fieldResults[2].Value, value: fieldResults[2].Value, itemid: fieldResults[3].Value });
            }
            return allResults;
        });
    };

    /**************************************************************************/
    /// Function name: checkForUserMemberOfGroup
    /// Summary:  To check whether the user is a member of a group by group name
    /**************************************************************************/
    SPCommon.checkForUserMemberOfGroup = function (groupName, userId, OnComplete) {
        var dfd = $.Deferred();
        $.ajax({
            url: SPCommon.siteUrl + "/_api/web/sitegroups/getByName('" + groupName + "')/Users?$filter=Id eq " + userId,
            contentType: "application/json;odata=verbose",
            headers: { "accept": "application/json; odata=verbose" },
            success: function (data) {
                var userInGroup = (data.d != null && data.d.results != null && data.d.results.length > 0) ? true : false;
                dfd.resolve(userInGroup);
                //OnComplete(userInGroup);
            },
            error: function (error) {
                console.log("Group check failed, " + error.textStatus);
                dfd.reject(JSON.stringify(data));
                //OnComplete(false);
            }
        });
        return dfd.promise();
    };

    /**************************************************************************/
    /// Function name: isUserMemberOfGroup
    /// Summary:  To check whether the user is amember of a group
    /**************************************************************************/
    SPCommon.isUserMemberOfGroup = function (groupId, userId, OnComplete) {
        var currentContext = new SP.ClientContext.get_current();
        var currentWeb = currentContext.get_web();
        var allGroups = currentWeb.get_siteGroups();
        var group = allGroups.getById(groupId);
        currentContext.load(group, 'Users');

        currentContext.executeQueryAsync(OnSuccess, OnFailure);

        function OnSuccess(sender, args) {
            var userInGroup = false;
            var groupUserEnumerator = group.get_users().getEnumerator();
            while (groupUserEnumerator.moveNext()) {
                var groupUser = groupUserEnumerator.get_current();
                if (groupUser.get_id() === userId) {
                    userInGroup = true;
                    break;
                }
            }
            OnComplete(userInGroup);
        }

        function OnFailure(sender, args) {
            OnComplete(false);
        }
    };
    /**************************************************************************/
    /// Function name: isAdmin
    /// Summary:  Function to check if Current User is a Developer or Owner
    /**************************************************************************/
    SPCommon.isCurrentUserAdmin = function (url, groupName, userId, sync) {
        var dfd = $.Deferred();
        $.ajax({
            url: url + "/_api/web/sitegroups/getByName('" + groupName + "')/Users?$filter=Id eq " + userId,
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
    }

    /**************************************************************************/
    /// Function name: isAdmin
    /// Summary:  Function to check if Current User is a Developer or Owner
    /**************************************************************************/
    SPCommon.getUsersFromSPGroup = function (url, groupName, sync) {
        var dfd = $.Deferred();
        $.ajax({
            url: url + "/_api/web/sitegroups/getByName('"+groupName+"')/users",
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
    }
    /**************************************************************************/
    /// Function name: ShowWaitDialog
    /// Summary:  To show OOB SP wait dialog
    /**************************************************************************/
    SPCommon.ShowWaitDialog = function (title, message) {
        if (SPCommon.waitDialog === null) {
            SPCommon.waitDialog = (typeof (title) !== "undefined" && title !== '') ? SP.UI.ModalDialog.showWaitScreenWithNoClose(title, message) :
                SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
        }
    };

    /**************************************************************************/
    /// Function name: HideWaitDialog
    /// Summary:  To hide OOB SP wait dialog
    /**************************************************************************/
    SPCommon.HideWaitDialog = function () {
        if (SPCommon.waitDialog !== null) {
            SPCommon.waitDialog.close(SP.UI.DialogResult.OK);
            SPCommon.waitDialog = null;
        }
    };

    SPCommon.showNotification = function (notificationText, notificationType) {
        if (SPCommon.notifyId != null && SPCommon.notifyId != '') {
            SPCommon.clearNotification();
        }
        var notificationContent = '';
        var closeButtonHtml = '<a href="javascript:void(0)" class="alert_close" title="close">X</a><input id="txtAlert" type="text" style="background-color:transparent;border:none;width:10px;cursor:pointer;" readonly />';
        switch (notificationType) {
            case "error":
                notificationContent = '<div class="alert-box error">' + notificationText + closeButtonHtml + '</div>';
                break;
            case "success":
                notificationContent = '<div class="alert-box success">' + notificationText + closeButtonHtml + '</div>';
                break;
            case "warning":
                notificationContent = '<div class="alert-box warning">' + notificationText + closeButtonHtml + '</div>';
                break;
            default:
                notificationContent = '<div class="alert-box notice">' + notificationText + closeButtonHtml + '</div>';
                break;

        }
        SPCommon.notifyId = SP.UI.Notify.addNotification(notificationContent, true);
        $('#txtAlert').focus();
        $(".alert_close").off().on('click', SPCommon.clearNotification);
    };

    SPCommon.clearNotification = function () {
        if (SPCommon.notifyId != null && SPCommon.notifyId != '') {
            SP.UI.Notify.removeNotification(SPCommon.notifyId);
            SPCommon.notifyId = '';
        }
    };

    SPCommon.showCustomNotification = function (notificationText, notificationType) {
        SPCommon.clearCustomNotification();
        var notificationContent = '';
        var closeButtonHtml = '<a href="javascript:void(0)" class="alert_close" title="close">X</a><input id="txtAlert" type="text" style="background-color:transparent;border:none;width:10px;cursor:pointer;" readonly />';
        switch (notificationType) {
            case "error":
                notificationContent = '<div class="alert-box error">' + notificationText + closeButtonHtml + '</div>';
                break;
            case "success":
                notificationContent = '<div class="alert-box success">' + notificationText + closeButtonHtml + '</div>';
                break;
            case "warning":
                notificationContent = '<div class="alert-box warning">' + notificationText + closeButtonHtml + '</div>';
                break;
            default:
                notificationContent = '<div class="alert-box notice">' + notificationText + closeButtonHtml + '</div>';
                break;

        }
        $('#div-messages').html(notificationContent);
        $('#div-messages').show(100);
        $('#txtAlert').focus();
        $(".alert_close").off().on('click', SPCommon.clearCustomNotification);
    };

    SPCommon.clearCustomNotification = function () {
        $('#div-messages').hide(100);
        $('#div-messages').empty();
    };

    /**************************************************************************/
    /// Function name: HideWaitDialog
    /// Summary:  To hide OOB SP wait dialog
    /**************************************************************************/
    SPCommon.getCurentFileName = function () {
        var pagePathName = window.location.pathname;
        return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    };

    /**************************************************************************/
    /// Function name: generateRandomNumber
    /// Summary:  To generate random key element
    /**************************************************************************/
    SPCommon.generateRandomNumber = function () {
        var previous = 0;
        var date = Date.now();
        if (date <= previous) {
            date = ++previous;
        } else {
            previous = date;
        }

        return String(date);
    };

    SPCommon.setDropdownOptionByText = function (dropdownId, optionText) {
        if (typeof optionText != "undefined" && optionText != "") {
            $("#" + dropdownId + " option").filter(function () {
                return this.text == optionText;
            }).attr('selected', true);
        }
    };

    SPCommon.setDropdownOptionByValue = function (dropdownId, optionValue) {
        $("#" + dropdownId).val(optionValue);
    };

    SPCommon.GetLookupInfo = function (userInfo) {
        var Users = "";
        if (typeof userInfo === "undefined" || userInfo == null) {
            Users = "";
        }
        else {
            if (typeof userInfo.length != "undefined") {
                for (var i = 0; i < userInfo.length; i++) {
                    var userValue = String(userInfo[i].get_lookupValue());
                    var userValueArray = userValue.split('|');
                    userValue = userValueArray[userValueArray.length - 1];
                    Users = Users != "" ? Users + " ; " + userValue : userValue;
                }
            }
            else {
                var userValue = String(userInfo.get_lookupValue());
                var userValueArray = userValue.split('|');
                userValue = userValueArray[userValueArray.length - 1];
                Users = userValue;;
            }
        }
        return Users;
    };

    SPCommon.convertToUTC12Hrs = function (yourDateTime, isDateOnly) {
        if (typeof yourDateTime === 'undefined' || yourDateTime == null) {
            yourDateTime = new Date();
        }
        var myDate = new Date(yourDateTime);
        var dtObject = new Object();
        var monthsCollection = { 0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December" };
        dtObject.year = myDate.getUTCFullYear();
        dtObject.month = monthsCollection[myDate.getUTCMonth()];
        dtObject.day = (myDate.getUTCDate() < 10) ? "0" + myDate.getUTCDate() : myDate.getUTCDate();
        dtObject.minutes = (myDate.getUTCMinutes() < 10) ? "0" + myDate.getUTCMinutes() : myDate.getUTCMinutes();
        dtObject.seconds = (myDate.getUTCSeconds() < 10) ? "0" + myDate.getUTCSeconds() : myDate.getUTCSeconds();
        // Check if hours are greater than 12? Its PM
        var utcHours = myDate.getUTCHours();
        dtObject.ampmSwitch = (utcHours > 12) ? "PM" : "AM";
        // Convert the hours
        dtObject.hour = (utcHours > 12) ? utcHours - 12 : utcHours;
        // Add the 0 as prefix if its less than 10
        dtObject.hour = (dtObject.hour < 10) ? "0" + dtObject.hour : dtObject.hour;
        // Format back the string as it was or return the dtObject object or however you like. I am returning the object here
        if (isDateOnly) {
            return (dtObject.day + '-' + dtObject.month + '-' + dtObject.year);
        }
        else {
            return (dtObject.day + '-' + dtObject.month + '-' + dtObject.year + ' ' + dtObject.hour + ':' + dtObject.minutes + ' ' + dtObject.ampmSwitch);
        }
    };

    SPCommon.date_diff_indays = function (date1, date2) {
        var dt1 = new Date(date1);
        var dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    };

    SPCommon.workingDaysBetweenDates = function (startDate, endDate) {

        // Validate input
        if (endDate < startDate) {
            return 0;
        }
        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0, 0, 0, 1);  // Start just after midnight
        endDate.setHours(23, 59, 59, 999);  // End just before midnight
        var diff = endDate - startDate;  // Milliseconds between datetime objects    
        var days = Math.ceil(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        var weeks = Math.floor(days / 7);
        days = days - (weeks * 2);

        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();

        // Remove weekend not previously removed.   
        if (startDay - endDay > 1) {
            days = days - 2;
        }
        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6) {
            days = days - 1;
        }

        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0) {
            days = days - 1;
        }

        return days;
    };

}());

SPCommon = SPCommon || {};

/**************************************************************************/
/// Function name: distinctObj
/// Summary:  To get distinct elements from a multidimensional array based on key
/**************************************************************************/
$.extend({
    distinctObj: function (objArray, propertyName) {
        var result = [];
        $.each(objArray, function (i, v) {
            var prop = (typeof propertyName === "undefined" || propertyName === "") ? v : v[propertyName];
            if ($.inArray(prop, result) == -1) {
                result.push(prop);
            }
        });
        return result;
    }
});


var saveAs = saveAs || (function (view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
        doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
        , get_URL = function () {
            return view.URL || view.webkitURL || view;
        }
        , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
        , can_use_save_link = "download" in save_link
        , click = function (node) {
            var event = new MouseEvent("click");
            node.dispatchEvent(event);
        }
        , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
        , is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent)
        , throw_outside = function (ex) {
            (view.setImmediate || view.setTimeout)(function () {
                throw ex;
            }, 0);
        }
        , force_saveable_type = "application/octet-stream"
        // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
        , arbitrary_revoke_timeout = 1000 * 40 // in ms
        , revoke = function (file) {
            var revoker = function () {
                if (typeof file === "string") { // file is an object URL
                    get_URL().revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            };
            setTimeout(revoker, arbitrary_revoke_timeout);
        }
        , dispatch = function (filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }
        , auto_bom = function (blob) {
            // prepend BOM for UTF-8 XML and text/* types (including HTML)
            // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
            }
            return blob;
        }
        , FileSaver = function (blob, name, no_auto_bom) {
            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            // First try a.download, then web filesystem, then object URLs
            var
                filesaver = this
                , type = blob.type
                , force = type === force_saveable_type
                , object_url
                , dispatch_all = function () {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
                // on any filesys errors revert to saving with object URLs
                , fs_error = function () {
                    if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                        // Safari doesn't allow downloading of blob urls
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                            var popup = view.open(url, '_blank');
                            if (!popup) view.location.href = url;
                            url = undefined; // release reference before dispatching
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                        };
                        reader.readAsDataURL(blob);
                        filesaver.readyState = filesaver.INIT;
                        return;
                    }
                    // don't create more object URLs than needed
                    if (!object_url) {
                        object_url = get_URL().createObjectURL(blob);
                    }
                    if (force) {
                        view.location.href = object_url;
                    } else {
                        var opened = view.open(object_url, "_blank");
                        if (!opened) {
                            view.location.href = object_url;
                        }
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                }
                ;
            filesaver.readyState = filesaver.INIT;

            if (can_use_save_link) {
                object_url = get_URL().createObjectURL(blob);
                setTimeout(function () {
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    dispatch_all();
                    revoke(object_url);
                    filesaver.readyState = filesaver.DONE;
                });
                return;
            }

            fs_error();
        }
        , FS_proto = FileSaver.prototype
        , saveAs = function (blob, name, no_auto_bom) {
            return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
        }
        ;
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name, no_auto_bom) {
            name = name || blob.name || "download";

            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    FS_proto.abort = function () { };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
        FS_proto.onwritestart =
        FS_proto.onprogress =
        FS_proto.onwrite =
        FS_proto.onabort =
        FS_proto.onerror =
        FS_proto.onwriteend =
        null;

    return saveAs;
}(
    typeof self !== "undefined" && self
    || typeof window !== "undefined" && window
    || this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
    define("FileSaver.js", function () {
        return saveAs;
    });
}
