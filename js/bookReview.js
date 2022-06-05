var apikey = '86aa5a2ffe2d7817c8b26ab6c94203bd7c2a7';
var bookReviewUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookreviews';
var usersUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookusers';
var arrUsers = [''];
var arrBooks = [''];
var arrSearch = [];
var currentUser = '';
var jsonData = [];


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


//-----------------adding data--------------------------
//----- gets user data----------------------------------
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

//----- gets book review data----------------------------
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


$(document).ready(function () { //makes sure the document is always ready
    //----- gets data----------------------------
    getBooks(bookReviewUrl, '621d80b634fd621565858a79');
    getUsers(usersUrl, '621d80b634fd621565858a79');

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
            }
        }
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
    function motherDiv() {
        $('.searchResults').remove();
        $('.searchBkInfo').remove();
        $('.coverBook').remove();
        for (var i = 0; i <= arrSearch.length - 1; i++) {
            let mother = document.createElement('div');
            mother.className = 'searchResults';
            console.log('activated');

            //---- unique id so all the information doesn't go into the same place
            mother.id = arrSearch[i]._id;
            console.log(mother.id);
            document.querySelector('#searchPg').appendChild(mother);
            displaySearch(arrSearch[i], mother.id);
        }
    }


    //---- displays what the user has put in the search bar  ------------------
    function displaySearch(search, motherDiv) {
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
            <p class="">${nameBook}</p>
            <p>${writtenBy}</p>
            <p class="cut-text">${specObj.wordedRating}</p>
            <button class="toUsersPg">${specObj.reviewer}</button>
        `;

        //---- appends it to the different mother divs
        document.getElementById(motherDiv).appendChild(search_details);
        
        switchPages('.toUsersPg', '#otherUserPg');
    }

    function follow() {
        //something is clicked, thier page comes up
    }

    function displayHome(date, motherDiv) {
        var specObj = '';//the name of the user they are following and their most recent post
        var nameBook = firstLetterUpper(specObj.bookName); //create a way to show this
        var writtenBy = firstLetterUpper(specObj.author);

        createDiv('frontCover', 'searchBkInfo', motherDiv, '');
        //---- Right side

        let search_details = document.createElement("div"); //creating div for all data

        search_details.classList.add("searchBkInfo");
        search_details.innerHTML = `
            <p class="">${nameBook}</p>
            <p>${writtenBy}</p>
            <p class="cut-text">${specObj.wordedRating}</p>
            <p class="toUsersPg">${specObj.reviewer}</p> 
        `; //add a class to the reviewer

        //---- appends it to the different mother divs
        document.getElementById(motherDiv).appendChild(search_details);
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
        }
        console.log(bookData);

        //---- displays relevant error text if reqs are met
        if ($('#bookName').val() == "" || $('#bookAuthor').val() == "" || $('#bookRelease').val() == "") {
            $('.redText').show();
        } else {
            addBook(bookData, bookReviewUrl, '621d80b634fd621565858a79', arrBooks);
            alert('Successfully Added'); //---- lets user know that the addition worked
        }
        console.log(arrBooks);
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
                    motherDiv();
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



    //---- allowing access to camera for scanning ------------------
    /*function accessCamera() {
        var video = document.querySelector("#videoElement");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                })
                .catch(function (err0r) {
                    console.log("Something went wrong!");
                });
        }
    }*/

    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
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
