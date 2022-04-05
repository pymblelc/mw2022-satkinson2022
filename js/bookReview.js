var apikey = '86aa5a2ffe2d7817c8b26ab6c94203bd7c2a7';
var bookReviewUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookreviews';
var usersUrl = 'https://bookreviewdb-4d45.restdb.io/rest/bookusers';
var arrUsers = [''];
var arrBooks = [''];
var arrSearch = [];
var currentUser = '';
var jsonData = [];


//getting data
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

function addUser(item, url, apikey) {
    getUsers(url, apikey);
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

$(document).ready(function () {
    //getting data
    getBooks(bookReviewUrl, '621d80b634fd621565858a79');
    getUsers(usersUrl, '621d80b634fd621565858a79');

    //getting pages to show up
    function switchPages(button, page) {
        $(button).click(function () { //this is a lot to load, create a checking function

            // $('.pages').hide();
            document.querySelectorAll(".pages").forEach((element) => {
                element.classList.add("hidden");
            });

            // $('#totalTaskBar').show();
            document.querySelector("#totalTaskBar").classList.remove("hidden");

            // $(page).show();
            document.querySelector(page).classList.remove("hidden");
        });
    }

    function saveData() {
        var samePasswords = false;
        var found = false;
        var rePassword = $('#createcheckPassword').val();
        var username = $('#createUsername').val();
        var password = $('#createPassword').val();
        var firstName = '';
        var surname = '';

        jsonData = {  //creates an object for the user
            "username": username,
            "password": password,
            "firstName": firstName,
            "surname": surname,
            "followers": 0,
            "following": 0,
            "profilePic": 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png',
            "email": $('#userEmail').val(),
        }
        //loop over arrUsers 
        for (var i = 0; i <= arrUsers.length - 1; i++) {
            console.log(arrUsers[i].username);
            if (arrUsers[i].username == username && username != "") {
                $('#checkingUsername').show();
                found = true;
            } else if (password != rePassword && password != "") { //this keeps looping
                $('#checkingPassword').show();

                samePasswords = true;
            }
        }
        if (found === false && samePasswords === false) {
            //addUser(jsonData, usersUrl, '621d80b634fd621565858a79', arrUsers);
            document.querySelector("#secondQs").classList.remove("hidden");
            document.querySelector('#firstQs').classList.add("hidden");
            currentUser = username;
            console.log('this is current ' + currentUser);
        }

    }
    function updateData(obj) {
        console.log('button clicked');
        obj.firstName = $('#addName').val();
        obj.surname = $('#addSurname').val();
        console.log(jsonData);
        addUser(obj, usersUrl, '621d80b634fd621565858a79', arrUsers);
        document.querySelector("#personalPg").classList.remove("hidden");
        document.querySelector("#totalTaskBar").classList.remove("hidden");
        document.querySelector('#signUpPg').classList.add("hidden");
        console.log(obj);
    }
    function login() {
        var username = $('#enterUsername').val();
        var password = $('#enterPassword').val();
        console.log(arrUsers);
        //loop over arrUsers
        var found = false;
        for (var i = 0; i <= arrUsers.length - 1; i++) {
            console.log(arrUsers[i].username);
            if (arrUsers[i].username == username && arrUsers[i].password == password) {
                found = true;
                document.querySelector("#personalPg").classList.remove("hidden");
                document.querySelector("#totalTaskBar").classList.remove("hidden");
                document.querySelector("#loginPg").classList.add("hidden");
                currentUser = username;
                setPersonalPage();
                break;
            }
        }
        if (found === false) {
            $('#checkingAccount').show();
        }
    }
    function setPersonalPage() { //fix this
        $('#setUserName').html(currentUser); //replace username
        for (var i = 0; i < arrUsers.length; i++) {
            console.log(arrUsers[i].username);
            if (arrUsers[i].username == currentUser) {
                $('#setFirstName').html(arrUsers[i].firstName);
                $('#setSurname').html(arrUsers[i].surname);
            }
        }
    }

    function createDiv(ident, c_name, toAdd, text) { //the first element isn't a node
        let div = document.createElement('div');
        div.className = c_name;
        div.id = ident;
        console.log(toAdd);
        document.getElementById(toAdd).appendChild(div);
        //add the text you want to show
        div.textContent = text;
        console.log(div);
    }
    function motherDiv() {
        $('.searchResults').remove();
        $('.searchBkInfo').remove();
        $('.coverBook').remove();
        for (var i = 0; i <= arrSearch.length - 1; i++) {
            let mother = document.createElement('div');
            mother.className = 'searchResults';
            console.log('activated');
            mother.id = arrSearch[i]._id;
            console.log(mother.id);
            document.querySelector('#searchPg').appendChild(mother); //create a way to wrap here
            displaySearch(arrSearch[i], mother.id);
        }
    }
    /*function searchHolder(search, mother) {
        var uniqueId = JSON.stringify(Math.floor(Math.random() * 10000));
        let holder = document.createElement('div');
        holder.className = 'searchBkInfo';
        holder.id = uniqueId
        console.log(holder.id);
        document.getElementById(mother).appendChild(holder); //create a way to wrap here
        displaySearch(search, holder.id);
    }*/
    function displaySearch(search, motherDiv) { //displays player input
        //create parent div
        var specObj = search;
        var nameBook = firstLetterUpper(specObj.bookName); //create a way to show this
        var writtenBy = firstLetterUpper(specObj.author);
        createDiv('frontCover', 'searchBkInfo', motherDiv, '');
        createDiv('searchTitle', 'searchBkInfo', motherDiv, nameBook); //creates title
        createDiv('searchauthor', 'searchBkInfo', motherDiv, writtenBy); //author
        createDiv('teaserText', 'searchBkInfo', motherDiv, specObj.wordedRating); //teaserText
        createDiv('otherPfp', 'searchBkInfo', motherDiv, specObj.reviewer); //usersPfp
        //createDiv('otherUserPfp', 'circle', '#otherPfp', '');
    }

    function createReview() {
        //var image = ""; //preview unavailable
        var bookStars = $('input[name="rate"]:checked').val();
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
        var bookData = {
            "bookName": $('#bookName').val(), //go straight to get the jquery
            "author": $('#bookAuthor').val(),
            "rating": rating,
            "releaseDate": $('#bookRelease').val(),
            "wordedRating": $('#bookOpinion').val(),
            "reviewer": currentUser,
        }
        console.log(bookData);
        if ($('#bookName').val() == "" || $('#bookAuthor').val() == "" || $('#bookRelease').val() == "") {
            $('.redText').show();
        } else {
            addBook(bookData, bookReviewUrl, '621d80b634fd621565858a79', arrBooks);
            alert('Successfully Added');
        }
        console.log(arrBooks);
    }
    function createKeywords(string, arr) {
        string.toLowerCase();
        arr.push(string.split(" "));
        console.log(arr);
    }
    function findIndexSearch(find) {
        var keywords = [];
        arrSearch = [];
        createKeywords(find, keywords);
        var count = 0;
        while (count < arrBooks.length) {
            var title = arrBooks[count].bookName; //we want to check through the length of the book array
            console.log(title);
            for (var i = 0; i <= keywords.length; i++) {
                var exist = title.indexOf(keywords[i]);
                if (exist != -1) {
                    arrSearch.push(arrBooks[count]); //if the keyword exists then we add it to another array
                    console.log(arrSearch);
                    motherDiv();
                }
            }
            count++;
        }
    }

    function findSearchTerm() { //enter key
        var searchTerm = $('#searchBar').val();
        findIndexSearch(searchTerm);
        console.log(searchTerm);
    }

    function firstLetterUpper(word) { //makes only the first letter upper case; useful for presenting books
        var str = word.toLowerCase();
        var arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        var str2 = arr.join(" ");
        console.log(str2);
    }

    function accessCamera() {
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
    }

    //calling functions and click handlers
    $('#saveFormalData').click(function () { //when continue is pressed
        saveData();
    });
    $('#savePersonalData').click(function () { //when create account is pressed
        console.log(jsonData);
        updateData(jsonData);
        setPersonalPage();
        
    })
    //login
    $('#findUserData').click(function () {
        login();
    });
    //this is to save your book review data
    $('#uploadReview').click(function () {
        createReview();
    })

    $('#searchResBtn').click(function () {
        findSearchTerm();
    })

    $('#barcodeBtn').click(function () {
        accessCamera();
        document.querySelector("#holdsCam").classList.remove("hidden");
        document.querySelector("#scannerBtn").classList.remove("hidden");
    })
    $("#scannerBtn").click(function () {
        alert('scanned!');
    });
    $("#personalSettings").click(function () {
        if(document.querySelector("#logOutPopUp").classList.contains("hidden")){
            document.querySelector("#logOutPopUp").classList.remove("hidden");
        }else{
            document.querySelector("#logOutPopUp").classList.add("hidden");
        }
        
    });
    $("#logOut").click(function () {
        currentUser = "";
        alert('loggedOut');
        jsonData = [];
        document.querySelector("#logOutPopUp").classList.add("hidden");
    });
    //switching though pages
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
