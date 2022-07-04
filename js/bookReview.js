var apikey = '621d80b634fd621565858a79';
var bookReviewUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookreviews';
var usersUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookusers';
var fllwUrl = 'https://bookreviewdb-4d45.restdb.io/rest/followers';
var timesReviewUrl = 'https://bookreviewdb-4d45.restdb.io/rest/timesreview';
var arrUsers = [''];
var arrBooks = [''];
var arrFollow = [''];
var arrTimesRev = [];
var arrSearch = [];
var arrSameBCode = [];
var currentUser = '';
var jsonData = [];
var usersFollowing = [''];
var usersFollowers = [''];
var otherUserInfo = [];

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
function updateFollow(item, itemID) {
    item.followers++;
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
function updateNumFollowing(current, currentID) {
    current.following++;
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
    item.timesRev++;
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

$(document).ready(function () { //makes sure the document is always ready
    //----- gets data----------------------------
    getBooks(bookReviewUrl, '621d80b634fd621565858a79');
    getUsers(usersUrl, '621d80b634fd621565858a79');
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
            if (arrUsers[i].username == username && username != "") {
                //red text stating the username already exists
                $('#checkingUsername').show();
                found = true;
            } else if (password != rePassword && password != "") { //---- checking password is the same or left blank  
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
        setPersonalPage();


        document.querySelector("#personalPg").classList.remove("hidden"); //---showing personal page
        document.querySelector("#totalTaskBar").classList.remove("hidden"); //---showing task bar
        document.querySelector('#signUpPg').classList.add("hidden"); //hiding sign up q's
        console.log(obj);
    }


    //---- finding the user data to log in the user
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
                setPersonalPage();
                document.getElementById("userBtn").click();
                break; //---- breaking out of loop
            }
        }
        if (found === false) {
            //---- red text to show that username or password is incorrect
            $('#checkingAccount').show();

        }
    }

    //---- used to set the personal page details --------------
    function setPersonalPage() { //TODO: fix this, not working with sign up
        //---- displays users username
        $('#setUserName').html(currentUser);

        //---- loops over arrUsers to display correct details
        for (var i = 0; i < arrUsers.length; i++) {
            //console.log(arrUsers[i].username);

            //---- if details are correct then displays first and second name
            if (arrUsers[i].username == currentUser) {
                $('#setFirstName').html(arrUsers[i].firstName);
                $('#setSurname').html(arrUsers[i].surname);
                $('#ttlFllw').html(arrUsers[i].followers);
                $('#ttlFllwing').html(arrUsers[i].following);
            }
        }
    }

    //---- displays the other users pages ---------------------------

    function setOtherPage(object) {
        $('#otherPersonal').html(object.username);
        $('#otherFN').html(object.firstName);
        $('#otherSN').html(object.surname);
        $('#otherSN').html(object.surname);
        $('#otherTtlFllwing').html(object.following);
        $('#otherTtlFllwers').html(object.followers);
        var userFollowing = checkIfFollow(currentUser, object.username);
        if (userFollowing === true) {
            document.querySelector("#unfollow").classList.remove("hidden"); //---- shows taskbar
            document.querySelector("#follow").classList.add("hidden");
        } else {
            document.querySelector("#unfollow").classList.add("hidden"); //---- shows taskbar
            document.querySelector("#follow").classList.remove("hidden");
        }
    }

    //---- set the review page ------------
    function setReview(object) {
        $('#bookRevTitle').html(object.bookName + " - ");
        $('#revAuthor').html(object.author);
        $('#reviewStars').html(object.rating);
        $('#revRelease').html(object.releaseDate);
        $('#reviewParag').html(object.wordedRating);
        $('#reviewerName').html(object.reviewer);
        $('#barcodeNumber').html(object.barcodeNumber);
        $('#postDate').html(object.dateAdded);
        $('#revAge').html(object.ageRating);
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
        updateFollow(toBeFllw, itemID);
        updateNumFollowing(currentP, currentPId);
        //add that to the database
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

    //---- creates the div which all the search information will fall into  ------------------
    function motherDiv(array) {
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
            document.querySelector('#searchPg').appendChild(mother);
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
            <button class="toUsersPg">${specObj.reviewer}</button>
        `;

        //---- appends it to the different mother divs
        document.getElementById(motherDiv).appendChild(search_details);
        //switchPages(); //
        switchPages('.toUsersPg', '#otherUserPg');
        switchPages('.nameBookSearch', '#bookReviews');
        search_details.querySelector(".nameBookSearch").addEventListener("click", function () {
            setReview(specObj);
        });
        search_details.querySelector(".toUsersPg").addEventListener("click", function () {
            var otherUserInfo = findOtherUser(search_details.querySelector('.toUsersPg').innerHTML);
            setOtherPage(otherUserInfo);
            $('#follow').click(function () {
                console.log('button clicked');
                follow(otherUserInfo.username);
            });
        });
    }

    //function LOOP THROUGH AND MAKE STARS REPLACE

    //---- updates the number of times something has been reviewed -----------
    function findRevExist(name) {
        var exists = false;
        for (var i = 0; i < arrTimesRev.length; i++) {
            if (arrTimesRev[i] == name) {
                exists = true
            }
        }
        return exists;
    }

    function revObj(name) {
        var found = true;
        var obj = [''];
        while (obj == '') {
            for (var i; i < arrBooks.length; i++) {
                if (name == arrBooks[i].title) {
                    obj = arrBooks[i];
                }
            }
        }
        return obj
    }

    function numRevs(name) {
        var exists = findRevExist(name);
        var done = false
        if (exists === true) {
            while (done === false) {
                for (var i = 0; i < arrTimesRev.length; i++) {
                    if (arrTimesRev[i] == name) {
                        var obj = revObj(name);
                        updateTimesRev(obj);
                        done = true;
                    }
                }
            }
        } else {
            jsonData = {
                "title": name,
                "timesReviewed": 1,
            }
            addTimesRev(jsonData, timesReviewUrl, '621d80b634fd621565858a79');
        }
    }
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
        if ($('#bookName').val() == "" || $('#bookAuthor').val() == "" || $('#bookRelease').val() == "" || $('#barcodeId').val() == "" || $('#bookAgeReq').val() == "") {
            $('.redText').show();
        } else {
            addBook(bookData, bookReviewUrl, '621d80b634fd621565858a79', arrBooks);
            numRevs($('#bookName').val().toLowerCase());
            alert('Successfully Added'); //---- lets user know that the addition worked
        }
        console.log(arrBooks);
    }

    //---- finds book to showcase based on the barcode ----------------------------------
    function searchBarCode(barcode) {
        for (var i = 0; i < arrBooks.length; i++) {
            if (barcode == arrBooks[i].barcodeNumber) {
                arrSameBCode.push(arrBooks[i]);
                motherDiv(arrSameBCode);
            }
        }

    }

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
                    motherDiv(arrSearch);
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


    function findFollowing() {
        getFollowers(fllwUrl, apikey);
        //something current user
        for (var i = 0; i < arrUsers.length; i++) {
            if (arrFollow[i].follower == currentUser) {
                usersFollowing.push(arrFollow[i].following);
                console.log(usersFollowing);
            }
        }

        // for (const user of arrUsers) {
        // }
    }

    //---- accessing someone's page -------------------------------
    function findOtherUser(lookingFor) { //TO DO: set this to.... TO WHAT???
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

    function unfollow() {
        //TODO: show other button
        //remove following
    }

    var hasScanned = false;
    function onScanSuccess(decodedText, decodedResult) {
        if (hasScanned) return;
        hasScanned = true;

        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);

        searchBarCode(decodedText); //does so infinitely

        document.querySelector('#searchPg').classList.remove("hidden");
        document.querySelector('#scanPg').classList.add("hidden");
        //stop(): Promise<void> {};
    }

    function onScanFailure(error) {
        hasScanned = false;
        console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "bcreader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        verbose = false
    );




    //---- checking scanner button exists ----------------------------



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

    //---- settings on personal page clicked
    $("#personalSettings").click(function () {
        //---- checks whether the or not the popUp is showing
        if (document.querySelector("#logOutPopUp").classList.contains("hidden")) {
            document.querySelector("#logOutPopUp").classList.remove("hidden");
        } else {
            document.querySelector("#logOutPopUp").classList.add("hidden");
        }

    });

    //---- log out button
    $("#logOut").click(function () {
        currentUser = "";
        alert('loggedOut');
        jsonData = [];
        document.querySelector("#logOutPopUp").classList.add("hidden");
    });


    //---- switching though pages
    //switchPages('#loginBtn', '#loginPg');
    switchPages('#searchBtn', '#searchPg');
    switchPages('#uploadBtn', '#uploadPg');
    switchPages('#userBtn', '#personalPg');
    switchPages('#homeBtn', '#comingSoon');
    switchPages('#barcodeBtn', '#scanPg');
    switchPages('#logOut', '#loginPg');

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


})
