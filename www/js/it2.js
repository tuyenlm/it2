// Initialize app
var myApp = new Framework7({
    // Enable Material theme for Android device only
    material: true,
    swipePanel: 'left'
});
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    //console.log("Device is ready!");
    //console.log(Framework7.prototype.device.ios);
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page


})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }

    if (page.name === 'chat') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Chat page');


        // Conversation flag
        var conversationStarted = false;

        // Init Messages
        var myMessages = myApp.messages('.messages', {
            autoLayout: true
        });

        // Init Messagebar
        var myMessagebar = myApp.messagebar('.messagebar');
        // Handle message
        $$('.messagebar .link').on('click', function () {
            // Message text
            var messageText = myMessagebar.value().trim();
            // Exit if empy message
            if (messageText.length === 0) return;

            // Empty messagebar
            myMessagebar.clear()

            // Random message type
            var messageType = (['sent', 'received'])[Math.round(Math.random())];

            // Avatar and name for received message
            var avatar, name;
            if (messageType === 'received') {
                avatar = '../www/images/profiles/profile-80_4.jpg';
                name = 'takayama';
            }
            // Add message
            myMessages.addMessage({
                // Message text
                text: messageText,
                // Random message type
                type: messageType,
                // Avatar and name:
                avatar: avatar,
                name: name,
                // Day
                day: !conversationStarted ? 'Today' : false,
                time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
            })

            // Update conversation flag
            conversationStarted = true;
        });

    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})