 //Adding support for cordova.
     ibmApp.run(function($ionicPlatform) {
           console.log('>> ibmApp.run ...');
           $ionicPlatform.ready(function() {
             // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
             // for form inputs)
             console.log('>> ibmApp.ready ...');
             if (window.cordova && 
                 window.cordova.plugins && 
                 window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             }
             if(window.StatusBar) {
               StatusBar.styleDefault();
             }
           });
         });