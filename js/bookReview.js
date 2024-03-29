//---- VARIABLES ---------------------------------------------
//---- access database collection variables 
var apikey = '621d80b634fd621565858a79';
var bookReviewUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookreviews';
var usersUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookusers';
var fllwUrl = 'https://bookreviewdb-4d45.restdb.io/rest/followers';
var timesReviewUrl = 'https://bookreviewdb-4d45.restdb.io/rest/timesreview';
//---- arrays for storing data from the  collections
var arrUsers = [''];
var arrBooks = [''];
var arrFollow = [''];
var arrTimesRev = [];
//---- other arrays
var arrSearch = [];
var arrSameBCode = [];
//---- objects
var jsonData = [];
var otherUserInfo = [];
//---- string 
var currentUser = '';
//---- scanner variables
var hasScanned = false;
let html5QrcodeScanner = new Html5QrcodeScanner(
    "bcreader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    verbose = false
);

//---- FUNCTIONS ---------------------------------------------
//-----------------getting data--------------------------
//----- gets book review data ---------------------------
function getBooks(url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        arrBooks = response;
    });
}

//----- gets user data ----------------------------------
function getUsers(url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        arrUsers = response;
        document.querySelector("#loginPg").classList.remove("hidden");
        document.querySelector("#loader").classList.add("hidden");
    });
}

//---- gets follower/following data ----------------------
function getFollowers(url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        arrFollow = response;
    });
}

//---- get amount of times something has been reviewed --------
function getTimesRev(url, apikey) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": 'https://bookreviewdb-4d45.restdb.io/rest/timesreview',
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": '621d80b634fd621565858a79',
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        arrTimesRev = response;
    });
}


//-----------------adding data--------------------------
//----- adds user data----------------------------------
function addUser(item, url, apikey) {
    getUsers(url, apikey); //gets user data
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('Item successfully added');
        console.log(response);
    });

}

//----- adds book review data----------------------------
function addBook(item, url, apikey) {
    getBooks(url, apikey);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('Item successfully added');
        console.log(response);
    });

}

//---- adds follower/following data ------------------------
function addFollowing(item, url, apikey) {
    getFollowers(url, apikey);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('This user has been followed'); //adds nothing to the database
        console.log(response);
    });

}

//---- adds a new book for counting times rev'd ------------
function addTimesRev(item, url, apikey) {
    getTimesRev(url, apikey);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log('This user has been followed'); //adds nothing to the database
        console.log(response);
    });
}

//---- altering data ---------------------------------------
//---- putting followers -----------------------------------
function updateFollow(item, itemID, toFllw) {
    var follow = toFllw;
    if (follow === true) {
        item.followers++;
    } else {
        item.followers--;
    }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bookreviewdb-4d45.restdb.io/rest/bookusers/" + itemID,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('updated');
    });
}

//---- changes the data for the amount of people following --------------------
function updateNumFollowing(current, currentID, toFllw) {
    var follow = toFllw;
    if (follow === true) {
        current.following++;
    } else {
        current.following--;
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bookreviewdb-4d45.restdb.io/rest/bookusers/" + currentID,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(current)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('updated');
    });
}

//---- change amount of times rev ---------------------------------------------
function updateTimesRev(item, itemID) {
    item.timesReviewed++;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bookreviewdb-4d45.restdb.io/rest/timesreview/" + itemID,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(item)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('updated timesRev!');
    });
}

//---- delete who is following who ----------------------------------------------
function deleteWhoFllw(itemID) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bookreviewdb-4d45.restdb.io/rest/followers/" + itemID,
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "x-apikey": '621d80b634fd621565858a79',
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}



$(document).ready(function () { //makes sure the document is always ready
    //----- gets data----------------------------
    getUsers(usersUrl, '621d80b634fd621565858a79');
    getBooks(bookReviewUrl, '621d80b634fd621565858a79');
    getFollowers(fllwUrl, '621d80b634fd621565858a79');
    getTimesRev(timesReviewUrl, '621d80b634fd621565858a79');
    //----- switching between pages based on button clicked ------------
    function switchPages(button, page) {
        $(button).click(function () {
            document.querySelectorAll(".pages").forEach((element) => {
                element.classList.add("hidden");
            });
            document.querySelector("#totalTaskBar").classList.remove("hidden");
            document.querySelector(page).classList.remove("hidden");
        });
    }
    //---- signing up function
    //----- saving new user data ---> used when they sign up to create an account ------------
    function saveData() {
        //----- variables used for checking 
        var samePasswords = false;
        var found = false;
        var rePassword = $('#createcheckPassword').val();
        var username = $('#createUsername').val();
        var password = $('#createPassword').val();
        var firstName = '';
        var surname = '';

        //----- creates an object which will be used to add new users to the database ------------
        jsonData = {
            "username": username,
            "password": password,
            "firstName": firstName,
            "surname": surname,
            "followers": 0,
            "following": 0,
            "profilePic": 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png',
            "email": $('#userEmail').val(),
        }
        //---- loop over arrUsers --------------------------------------
        for (var i = 0; i <= arrUsers.length - 1; i++) {
            console.log(arrUsers[i].username);

            //---- checking if the username already exists or if they left it blank  
            if (arrUsers[i].username == username || username == "") {
                //red text stating the username already exists
                $('#checkingUsername').show();
                found = true;
            } else if (password != rePassword || password == "") { //---- checking password is the same or left blank  
                //red text saying the passwords aren't the same show
                $('#checkingPassword').show();
                samePasswords = true;
            }
        }

        //---- adds user if the correct reqs are met -------------------
        if (found === false && samePasswords === false) {
            //---- showing the personalisation q's 
            document.querySelector("#secondQs").classList.remove("hidden"); //personalisation
            document.querySelector('#firstQs').classList.add("hidden");

            //---- setting current user so the username is easier to access
            currentUser = username;
            console.log('this is current ' + currentUser);
        }

    }

    //---- used to update the data with the first and surname  ------------------
    function updateData(obj) {
        console.log('button clicked'); //check if function runs

        //---- getting the values from the enter first and surname 
        obj.firstName = $('#addName').val();
        obj.surname = $('#addSurname').val();
        //console.log(jsonData);

        //---- adding to the database 
        addUser(obj, usersUrl, '621d80b634fd621565858a79', arrUsers);

        //--- setting personal details on the screen
        setPersonalPage(obj);


        document.querySelector("#personalPg").classList.remove("hidden"); //---showing personal page
        document.querySelector("#totalTaskBar").classList.remove("hidden"); //---showing task bar
        document.querySelector('#signUpPg').classList.add("hidden"); //hiding sign up q's
        console.log(obj);
    }

    //---- logging in function
    function login() {
        //---- getting values from inputs
        var username = $('#enterUsername').val();
        var password = $('#enterPassword').val();
        //console.log(arrUsers);


        var found = false; //---- find if user exists
        //---- loop over arrUsers to find correct user and password
        for (var i = 0; i <= arrUsers.length - 1; i++) {
            //console.log(arrUsers[i].username);

            //---- checks if the username exists and whether the password matches
            if (arrUsers[i].username == username && arrUsers[i].password == password) {
                found = true;

                document.querySelector("#personalPg").classList.remove("hidden"); //----  shows personal page
                document.querySelector("#totalTaskBar").classList.remove("hidden"); //---- shows taskbar
                document.querySelector("#loginPg").classList.add("hidden"); //---- hides login

                currentUser = username;

                //---- sets the personal page with the correct data
                setPersonalPage(arrUsers[i]);
                document.getElementById("userBtn").click();
                break; //---- breaking out of loop
            }
        }
        if (found === false) {
            //---- red text to show that username or password is incorrect
            $('#checkingAccount').show();

        }
    }

    //---- functions to display divs on screen -------------------------
    //---- creates the div which all the search information will fall into  ------------------
    function motherDiv(array, page) {
        $('.searchResults').remove();
        $('.searchBkInfo').remove();
        $('.coverBook').remove();
        for (var i = 0; i <= array.length - 1; i++) {
            let mother = document.createElement('div');
            mother.className = 'searchResults';
            console.log('activated');

            //---- unique id so all the information doesn't go into the same place
            mother.id = array[i]._id;
            console.log(mother.id);
            document.querySelector(page).appendChild(mother);
            displaySearch(array[i], mother.id);
        }
    }
    //---- displays what the user has put in the search bar  ------------------
    function displaySearch(search, motherDiv) {
        console.log("Display search");
        var specObj = search;
        var nameBook = firstLetterUpper(specObj.bookName); //create a way to show this
        var writtenBy = firstLetterUpper(specObj.author);

        //---- Left side
        createDiv('frontCover', 'searchBkInfo', motherDiv, '');
        //---- Right side
        //TO DO: make the search term found bold
        let search_details = document.createElement("div"); //creating div for all data
        search_details.classList.add("searchBkInfo");
        search_details.innerHTML = `
            <p class="nameBookSearch">${nameBook}</p>
            <p>${writtenBy}</p>
            <p class="cut-text">${specObj.wordedRating}</p>
            <button class="toUsersPg">${specObj.reviewer}</button>`
        if (currentUser == specObj.reviewer) {
            search_details.querySelector(".toUsersPg").classList.add("hidden");
        } else {
            search_details.querySelector(".toUsersPg").classList.remove("hidden");
        };

        //---- appends it to the different mother divs
        document.getElementById(motherDiv).appendChild(search_details);

        //switchPages();
        switchPages('.toUsersPg', '#otherUserPg');
        switchPages('.nameBookSearch', '#bookReviews');
        search_details.querySelector(".toUsersPg").addEventListener("click", function () {
            var otherUserInfo = findOtherUser(search_details.querySelector('.toUsersPg').innerHTML);
            setOtherPage(otherUserInfo);
            $('#follow').click(function () {
                console.log('button clicked');
                follow(otherUserInfo.username);
            });
            $('#unfollow').click(function () {
                console.log('button clicked');
                unfollow(otherUserInfo.username);
            });
        });
        search_details.querySelector(".nameBookSearch").addEventListener("click", function () {
            setReview(specObj);
        });

    }
    //---- creates a div for the each of the search page items ----------------
    function createDiv(ident, c_name, toAdd, text) {
        let div = document.createElement('div');
        div.className = c_name;
        div.id = ident;
        console.log(toAdd);
        document.getElementById(toAdd).appendChild(div);

        //---- adds the text you want to show
        div.textContent = text;
        console.log(div);
    }


    //---- functions for profile pages -----------------------------------------
    //---- personal profile pages ----------------------------------------------
    //---- used to set the personal page details --------------
    function setPersonalPage(obj) {
        //---- displays users username
        $('#setUserName').html(currentUser)

        //---- loops over arrUsers to display correct details
        //console.log(arrUsers[i].username);

        //---- if details are correct then displays first and second name
        $('#setFirstName').html(obj.firstName);
        $('#setSurname').html(obj.surname);
        $('#ttlFllw').html(obj.followers);
        $('#ttlFllwing').html(obj.following);
        setPersonalReviews(currentUser, '#personalPgRevs');


    }
    //---- sets the pages for other users ---------------------------
    function setOtherPage(object) {
        $('#otherPersonal').html(object.username);
        $('#otherFN').html(object.firstName);
        $('#otherSN').html(object.surname);
        $('#otherSN').html(object.surname);
        $('#otherTtlFllwing').html(object.following);
        $('#otherTtlFllwers').html(object.followers);
        setPersonalReviews(object.username, '#otherPersonsRevs')
        var userFollowing = checkIfFollow(currentUser, object.username);
        if (userFollowing === true) {
            document.querySelector("#unfollow").classList.remove("hidden"); //---- shows taskbar
            document.querySelector("#follow").classList.add("hidden");
        } else {
            document.querySelector("#unfollow").classList.add("hidden"); //---- shows taskbar
            document.querySelector("#follow").classList.remove("hidden");
        }
    }

    //---- finding and creating an object for a user -------------------------------
    function findOtherUser(lookingFor) {
        //need to take from the button
        var notFound = true;
        var count = 0;
        while (count < arrUsers.length && notFound === true) {
            if (arrUsers[count].username == lookingFor) { //repeats for awhile
                notFound = false;
                otherUserInfo = {
                    "id": arrUsers[count]._id,
                    "username": lookingFor,
                    "password": arrUsers[count].password,
                    "firstName": arrUsers[count].firstName,
                    "surname": arrUsers[count].surname,
                    "followers": arrUsers[count].followers,
                    "following": arrUsers[count].following,
                    "profilePic": 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png',
                }
            }
            count++
        }
        return otherUserInfo;
    }

    //---- check if following -----------
    function checkIfFollow(user, otherUser) { //this will be useful when displaying if another person is following maybe
        //find the other username from the page
        var followed = false;
        for (var i = 0; i <= arrFollow.length - 1; i++) {
            if (user == arrFollow[i].follower && otherUser == arrFollow[i].followed && followed === false) {
                followed = true;
            }
        }
        return followed;
    }

    //---- update other users followers --------------
    function updateFollowers(name) {
        //get the user it is 
        //update the following
        var toBeFllw = findOtherUser(name);
        var currentP = findOtherUser(currentUser);
        var currentPId = currentP.id;
        var itemID = toBeFllw.id;
        updateFollow(toBeFllw, itemID, true);
        updateNumFollowing(currentP, currentPId, true);
        //add that to the database
    }

    //---- finds if user follows someone ---------------------------------
    function findFollowed(lookingFor) {
        var notFound = true;
        var count = 0;
        while (count < arrFollow.length && notFound === true) {
            if (arrFollow[count].followed == lookingFor && arrFollow[count].follower == currentUser) {
                notFound = false;
                otherUserInfo = {
                    "id": arrFollow[count]._id,
                    "followed": arrFollow[count].followed,
                    "follower": arrFollow[count].follower,
                }
            }
            count++
        }
        return otherUserInfo;
    }

    //---- follows someone ------
    function follow(beingFllw) {
        var followed = findOtherUser(beingFllw);
        //TODO: show the other button
        var followData = {
            "follower": currentUser,
            "followed": followed.username,
        }
        addFollowing(followData, fllwUrl, apikey); //TODO: find what to put in here
        updateFollowers(beingFllw);
        document.querySelector("#unfollow").classList.remove("hidden"); //---- shows taskbar
        document.querySelector("#follow").classList.add("hidden");

    }

    //---- unfollows someone ------
    function unfollow(currentFllw) {
        //TODO: show other button
        //remove following
        var unfollowed = findOtherUser(currentFllw);
        var currentP = findOtherUser(currentUser);
        var toBeUnfollow = findFollowed(currentFllw)
        deleteWhoFllw(toBeUnfollow.id);
        updateFollow(unfollowed, unfollowed.id, false);
        updateNumFollowing(currentP, currentP.id, false);
        document.querySelector("#unfollow").classList.add("hidden"); //---- shows taskbar
        document.querySelector("#follow").classList.remove("hidden");
    }


    //---- functions for displaying info on review page --------------------------
    //---- sets the reviews on profile which are written by the specified user --
    function setPersonalReviews(username, page) {
        var usersReviews = [];
        for (var i = 0; i < arrBooks.length; i++) {
            if (username == arrBooks[i].reviewer) {
                usersReviews.push(arrBooks[i]);
            }
        }
        motherDiv(usersReviews, page)
    }
    //---- set the information for review page ------------
    function setReview(object) {
        $('#bookRevTitle').html(object.bookName + " - ");
        $('#revAuthor').html(object.author);
        setStars(object.rating);
        $('#revRelease').html(object.releaseDate);
        $('#reviewParag').html(object.wordedRating);
        $('#reviewerName').html(object.reviewer);
        $('#barcodeNumber').html(object.barcodeNumber);
        $('#postDate').html(object.dateAdded);
        $('#revAge').html(object.ageRating);
    }
    //---- loops through and showcases the amount of stars ---------------------
    function setStars(stars) {
        document.getElementById('reviewStars').innerHTML = "";

        for (var i = 0; i < stars; i++) {
            let p = document.createElement("span");
            p.innerHTML = "★";
            document.getElementById('reviewStars').appendChild(p);
        }
    }


    //---- upload page functions ------------------------------------------------
    //---- creates an object for the review a user creates  ------------------
    function createReview() {
        //var image = ""; //TODO: preview unavailable

        //---- checks what radio button was clicked
        var bookStars = $('input[name="rate"]:checked').val();

        //---- used to find the rating based on radio button
        var rating = 0;
        switch (bookStars) {
            case "1":
                rating = 1;
                break;
            case "2":
                rating = 2;
                break;
            case "3":
                rating = 3;
                break;
            case "4":
                rating = 4;
                break;
            default:
                rating = 5;
        }

        //---- creates an object for the book review to add to the user database 
        var bookData = {
            "bookName": $('#bookName').val().toLowerCase(), //go straight to get the jquery
            "author": $('#bookAuthor').val(),
            "rating": rating,
            "releaseDate": $('#bookRelease').val(),
            "wordedRating": $('#bookOpinion').val(),
            "reviewer": currentUser,
            "barcodeNumber": $('#barcodeId').val(),
            "ageRating": $('#bookAgeReq').val(),
        }
        console.log(bookData);

        //---- displays relevant error text if reqs are met
        if ($('#bookName').val() == "" || $('#bookAuthor').val() == "" || $('#bookRelease').val() == "" || $('#barcodeId').val() == "" || $('#bookAgeReq').val() == "" || $('#barcodeId').val().length < 13 || $('#barcodeId').val().length > 13) {
            $('.redText').show();
        } else {
            addBook(bookData, bookReviewUrl, '621d80b634fd621565858a79', arrBooks);
            numRevs($('#bookName').val().toLowerCase());
            alert('Successfully Added'); //---- lets user know that the addition worked
        }
        console.log(arrBooks);
    }
    //---- updates the number of times something has been reviewed -----------
    function findRevExist(name) {
        var exists = false;
        for (var i = 0; i < arrTimesRev.length; i++) {
            if (arrTimesRev[i].title.toLowerCase() == name) {
                exists = true;
            }
        }
        return exists;
    }

    //---- finds object in arrTimesRev and returns -------------------------
    function revObj(name) {
        var found = false;
        var obj = [''];
        while (found === false) {
            for (var i = 0; i < arrTimesRev.length; i++) {
                if (name == arrTimesRev[i].title) {
                    obj = arrTimesRev[i];
                    found = true;
                    break;
                }
            }
        }
        return obj;
    }

    //---- if obj exists in arrTimesRev, add one to timesreviewed, otherwise creates new object -----
    function numRevs(name) {
        var exists = findRevExist(name);
        var done = false
        if (exists === true && done === false) {
            for (var j = 0; j < arrTimesRev.length; j++) {
                if (arrTimesRev[j].title.toLowerCase() == name) { //finding wrong item
                    var obj = revObj(name);
                    updateTimesRev(obj, obj._id);
                    done = true;
                    break;
                }
            }
        } else {
            jsonData = {
                "title": name,
                "timesReviewed": 1,
            }
            addTimesRev(jsonData, timesReviewUrl, '621d80b634fd621565858a79');
            done = true;
        }
    }


    //---- search page functions ------------------------------------------------
    //---- turns search terms into an array of keywordsF --------------------------------
    function createKeywords(string, arr) {
        //---- everything lowercase so it can match with bookName in DB
        string.toLowerCase();

        //---- pushes into  arr to search
        arr.push(string.split(" "));
        console.log(arr);
    }

    //---- uses the keywords to find the book review which contains those words --------------
    function findIndexSearch(find) {
        //---- arrays to search and store
        var keywords = [];
        arrSearch = [];

        //---- filling keywords
        createKeywords(find, keywords);

        //---- checking if title exists and adds to arrSearch
        var count = 0;
        while (count < arrBooks.length) {
            var title = arrBooks[count].bookName;
            //console.log(title);

            for (var i = 0; i < keywords.length; i++) {
                //----checking if the keyword exists in each of the bookNames
                var exist = title.indexOf(keywords[i]);

                //---- if it exists push into arrSearch
                if (exist != -1) {
                    arrSearch.push(arrBooks[count]);
                    console.log(arrSearch);
                    motherDiv(arrSearch, '#searchPg');
                }
            }
            count++;
        }
    }

    //---- quick way to check if the search term exists  ------------------
    function findSearchTerm() {
        var searchTerm = $('#searchBar').val(); //text from search bar
        findIndexSearch(searchTerm);
        console.log(searchTerm);
    }

    //---- makes only the first letter upper case; useful for presenting books  ------------------
    function firstLetterUpper(word) {
        var str = word.toLowerCase();
        var arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        var str2 = arr.join(" ");
        console.log(str2);

        return str2;
    }


    //---- home page functions ----------------------------------------------------
    //--- sorting data for home page --------
    function sortReviews(array) { //this sort works
        let index = 0;
        let nextElementIndex = 0;
        while (index < array.length - 1) {
            nextElementIndex = index + 1;
            let maximum = index;
            while (nextElementIndex < array.length) {
                if (array[maximum].timesReviewed < array[nextElementIndex].timesReviewed) {
                    maximum = nextElementIndex;
                }
                nextElementIndex++;
            }
            if (maximum != index) {
                [array[index], array[maximum]] = [array[maximum], array[index]];
            }

            index++;
        }
        return array;
    }
    //--- displays top 3 reviews ------------
    function displayHomePage() {
        var sortedArr = sortReviews(arrTimesRev);
        var sortObj = [];
        for (var i = 0; i < 3; i++) {
            var count = 0;
            var added = false
            while (count < arrBooks.length && added === false) {
                if (sortedArr[i].title.toLowerCase() == arrBooks[count].bookName.toLowerCase()) {
                    sortObj.push(arrBooks[count]);
                    added = true;
                    motherDiv(sortObj, '#homePg');
                }
                count++;
            }
        }
    }

    //---- finds book to showcase based on the barcode ----------------------------------
    function searchBarCode(barcode) {
        for (var i = 0; i < arrBooks.length; i++) {
            if (barcode == arrBooks[i].barcodeNumber) {
                arrSameBCode.push(arrBooks[i]);
                motherDiv(arrSameBCode, '#searchPg');
            }
        }

    }


    //---- search scan functions --------------------------
    //---- what happens when the scan is successful -----
    function onScanSuccess(decodedText, decodedResult) {
        if (hasScanned) return;
        hasScanned = true;

        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);

        searchBarCode(decodedText); //does so infinitely

        document.querySelector('#searchPg').classList.remove("hidden");
        document.querySelector('#scanPg').classList.add("hidden");
        //stop(): Promise<void> {};
    } ``

    //---- what happens when the scan in unsuccessful -----
    function onScanFailure(error) {
        hasScanned = false;
        console.warn(`Code scan error = ${error}`);
    }

    //---- calling functions and click handlers--------------------------------------
    //---- sign up page buttons -----------------------
    $('#saveFormalData').click(function () { //when continue is pressed
        saveData();
    });
    $('#savePersonalData').click(function () { //when create account is pressed
        console.log(jsonData);
        updateData(jsonData);
    })

    //---- login button -------------
    $('#findUserData').click(function () {
        login();
    });

    //---- upload button; saves book review data ----------------
    $('#uploadReview').click(function () {
        createReview();
        document.getElementById('barcodeId').value = '';
        document.getElementById('bookName').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookRelease').value = '';
        document.getElementById('bookAgeReq').value = '';
        document.getElementById('bookOpinion').value = ''; //Doesn't work
    })

    //---- search button clicked
    $('#searchResBtn').click(function () {
        findSearchTerm();
    })

    //---- barcode on taskbar
    $('#barcodeBtn').click(function () {
        // accessCamera();
        document.querySelector("#scanPg").classList.remove("hidden");
        document.querySelector("#bcreader").classList.remove("hidden");
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    })

    $("#homeBtn").click(function () {
        displayHomePage();
    });

    //---- settings on personal page clicked
    $("#personalSettings").click(function () {
        //---- checks whether the or not the popUp is showing
        if (document.querySelector("#logOutPopUp").classList.contains("hidden")) {
            document.querySelector("#logOutPopUp").classList.remove("hidden");
        } else {
            document.querySelector("#logOutPopUp").classList.add("hidden");
        }

    });

    $("#userBtn").click(function () {
        setPersonalReviews(currentUser, '#personalPgRevs')
    })

    $("#imageUpload").click(function () {
        alert('Unable to upload');
    });

    //---- switching though pages
    switchPages('#searchBtn', '#searchPg');
    switchPages('#uploadBtn', '#uploadPg');
    switchPages('#userBtn', '#personalPg');
    switchPages('#homeBtn', '#homePg');
    switchPages('#barcodeBtn', '#scanPg');

    $('#signUpBtn').click(function () {
        document.querySelectorAll(".pages").forEach((element) => {
            element.classList.add("hidden");
        });
        document.querySelector("#signUpPg").classList.remove("hidden");
        document.querySelector("#secondQs").classList.add("hidden");
        document.querySelector("#firstQs").classList.remove("hidden");
    });


    $('#loginBtn').click(function () {
        document.querySelectorAll(".pages").forEach((element) => {
            element.classList.add("hidden");
        });
        document.querySelector("#loginPg").classList.remove("hidden");
        document.querySelector("#secondQs").classList.add("hidden");
        document.querySelector("#firstQs").classList.remove("hidden");
    });

    //---- log out button
    $("#logOut").click(function () {
        currentUser = "";
        alert('loggedOut');
        location.reload();
    });
})

