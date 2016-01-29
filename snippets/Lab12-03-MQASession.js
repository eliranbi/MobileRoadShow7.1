        MQA.startNewSession({
            mode: "QA",
            android: {
                appKey: "your_MQA_Android_appKey",
                notificationsEnabled: true
            },
            defaultUser: "your email address",
            reportOnShakeEnabled: true 
        }, {
            success: function () {
                console.log("MQA session started successfully");
            },
            error: function (string) {
                console.log("MQA session error" + string);
            }
        });