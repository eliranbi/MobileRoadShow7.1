//Adding MobileFirst
var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
    // Common initialization code goes here
    console.log('MobileFirst Client SDK Initilized');
    angular.element(document).ready(function() {
        mfpMagicPreviewSetup();
        angular.bootstrap(document.body, ['ibmApp']);
    });
}

function mfpMagicPreviewSetup(){
    //nothing to see here :-), just some magic to make ionic work with mfp preview, similar to ionic serve --lab
    if(typeof WL !== 'undefined' && WL.StaticAppProps && WL.StaticAppProps.ENVIRONMENT === 'preview'){
        //running mfp preview (MBS or browser)
        if(WL.StaticAppProps.PREVIEW_ENVIRONMENT === 'android'){
            document.body.classList.add('platform-android');
            ionic.Platform.setPlatform("android");
        } else { //then ios
            document.body.classList.add('platform-ios');
            ionic.Platform.setPlatform("ios");
        }
    }
}

// Useful for ionic serve when MFP Client SDK is not present and wlCommonInit doesn't get called automatically
var serveTimeout = 1500;
window.setTimeout(function(){
    if(typeof WL === 'undefined'){
        console.log('MFP Client SDK timeout, running Web App');
        angular.bootstrap(document.body, ['guardianApp']);
    }
    }, serveTimeout);