/*
Copyright 2013 OCAD University
Copyright 2013 CERTH/HIT

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// GPII store is for connecting the preference tools with the GPII server.
// The preference tools uses the cookie store by default, rather than the
// GPII store.
// To activate the GPII store in the preference tools, refer to comments in
// http://issues.gpii.net/browse/GPII-185

(function ($, fluid) {
    "use strict";

    fluid.registerNamespace("gpii.prefs");

    gpii.prefs.commonTermsTransformationRules = {
            "http://registry\\.gpii\\.net/common/announceCapitals": "gpii_primarySchema_announceCapitals",
            "http://registry\\.gpii\\.net/common/keyEcho": "gpii_primarySchema_keyEcho",
            "http://registry\\.gpii\\.net/common/punctuationVerbosity": "gpii_primarySchema_punctuationVerbosity",
            "http://registry\\.gpii\\.net/common/screenReaderBrailleOutput": "gpii_primarySchema_screenReaderBrailleOutput",
            "http://registry\\.gpii\\.net/common/auditoryOutLanguage": "gpii_primarySchema_screenReaderLanguage",
            "http://registry\\.gpii\\.net/common/screenReaderTTSEnabled": "gpii_primarySchema_speakText",
            "http://registry\\.gpii\\.net/common/speakTutorialMessages": "gpii_primarySchema_speakTutorialMessages",
            "http://registry\\.gpii\\.net/common/readingUnit": "gpii_primarySchema_textHighlighting",
            "http://registry\\.gpii\\.net/common/language": "gpii_primarySchema_universalLanguage",
            "http://registry\\.gpii\\.net/common/volume": {
                transform: {
                    type: "fluid.transforms.linearScale",
                    valuePath: "gpii_primarySchema_universalVolume",
                    factor: 0.01
                }
            },
            "http://registry\\.gpii\\.net/common/pitch": {
                transform: {
                    type: "fluid.transforms.linearScale",
                    valuePath: "gpii_primarySchema_voicePitch",
                    factor: 0.01
                }
            },
            "http://registry\\.gpii\\.net/common/volumeTTS": {
                transform: {
                    type: "fluid.transforms.linearScale",
                    valuePath: "gpii_primarySchema_volume",
                    factor: 0.01
                }
            },
            "http://registry\\.gpii\\.net/common/wordEcho": "gpii_primarySchema_wordEcho",
            "http://registry\\.gpii\\.net/common/speechRate": "gpii_primarySchema_wordsSpokenPerMinute",
            "http://registry\\.gpii\\.net/common/magnification": {
                transform: {
                    type: "fluid.transforms.linearScale",
                    valuePath: "gpii_primarySchema_magnification",
                    factor: 0.01
                }
            },
            "http://registry\\.gpii\\.net/common/fontSize": "gpii_primarySchema_fontSize",
            "http://registry\\.gpii\\.net/common/highContrastEnabled": "gpii_primarySchema_contrastEnabled",
            "http://registry\\.gpii\\.net/common/highContrastTheme": "gpii_primarySchema_contrast_theme",
            "http://registry\\.gpii\\.net/common/cursorSize": {
                transform: {
                    type: "fluid.transforms.linearScale",
                    valuePath: "gpii_primarySchema_cursorSize",
                    factor: 0.2
                }
            },
            "http://registry\\.gpii\\.net/common/magnifierEnabled": "gpii_primarySchema_magnifierEnabled",
            "http://registry\\.gpii\\.net/common/tracking": "gpii_primarySchema_tracking",
            "http://registry\\.gpii\\.net/common/trackingTTS": "gpii_primarySchema_screenReaderTracking",
            "http://registry\\.gpii\\.net/common/magnifierPosition": "gpii_primarySchema_magnificationPosition",
            "http://registry\\.gpii\\.net/common/showCrosshairs": "gpii_primarySchema_showCrosshairs",
            "http://registry\\.gpii\\.net/applications/com\\.microsoft\\.windows\\.displaySettings": "gpii_primarySchema_lowResolutionEnabled",
            "http://registry\\.gpii\\.net/applications/com\\.microsoft\\.windows\\.onscreenKeyboard": "gpii_primarySchema_windowsOnscreenKeyboard"
        };

    gpii.prefs.commonTermsInverseTransformationRules = fluid.model.transform.invertConfiguration(gpii.prefs.commonTermsTransformationRules);

    fluid.registerNamespace("gpii.prefs.gpiiStore");

    gpii.prefs.gpiiStore.onSuccessfulSet = function (session, data, operation) {
        /*
         * TODO: Do we still need this check now that we can query the system for the logged in user?
         * Will we query GPII every time a component needs to know about the currently logged user or
         * will we have GPIISession caching it and getting it from there? Relevant JIRA:
         *      http://issues.gpii.net/browse/GPII-623
         */
        if (operation === "POST"){
            if (session.options.loggedUser !== data.userToken) {
                // new user, trigger accountCreated event
                session.events.accountCreated.fire(data.userToken);
            } else {
                // already logged in, refresh AT applications
                // log user out
                // sgithens LGS session.logout();
                // and log user in again
                // sgithens LGS session.login(data.userToken);
                /* TODO: The above procedure should normally be happening on the GPII side.
                 * Preference management tools should not have session management responsibilities.
                 * This is a work-around for the pilot2 tests.
                 * */
            }
            fluid.log("POST: Saved to GPII server");
        }
        else if (operation === "PUT"){
            // sgithens LGS session.login(data.userToken);
        }
    };

    /**
     * gpiiStore Subcomponent that uses GPII server for persistence.
     * It sends request to the GPII server to save and retrieve model information
     * @param {Object} options
     */
    fluid.defaults("gpii.prefs.gpiiStore", {
        gradeNames: ["fluid.prefs.dataSource", "fluid.eventedComponent", "autoInit"],
        url: "http://localhost:8081/",
        // instantiate the gpiiSession component
        components: {
            gpiiSession: {
                type: "gpii.prefs.gpiiSession"
            }
        },
        events: {
            onSetSuccess: null
        },
        listeners: {
            "onSetSuccess.loginUser": "gpii.prefs.gpiiStore.onSuccessfulSet"
        },
        gpiiEntry: "http://registry.gpii.net/applications/gpii.prefs",
        invokers: {
            get: {
                funcName: "gpii.prefs.gpiiStore.get",
                args: ["{that}.options", "{gpiiSession}.options", "{that}.inverseModelTransform"],
                dynamic: true
            },
            set: {
                funcName: "gpii.prefs.gpiiStore.set",
                args: ["{arguments}.0", "{that}.options", "{gpiiSession}", "{that}.modelTransform", "{that}.events.onSetSuccess.fire"],
                dynamic: true
            },
            modelTransform: {
                funcName: "fluid.model.transform",
                args: ["{arguments}.0", gpii.prefs.commonTermsTransformationRules]
            },
            inverseModelTransform: {
                funcName: "fluid.model.transform",
                args: ["{arguments}.0", gpii.prefs.commonTermsInverseTransformationRules]
            }
        }
    });

    gpii.prefs.gpiiStore.get = function (settings, sessionSettings, modelTransformFunc) {
        var gpiiModel;

        if (sessionSettings.loggedUser !== null) {

            var urlToPost = sessionSettings.loggedUser ? (settings.url + "preferences/" + sessionSettings.loggedUser) : (settings.url + "preferences/");

            $.ajax({
                url: urlToPost,
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    var rawData = fluid.get(data, ["contexts", "gpii-default", "preferences"]);
                    gpiiModel = modelTransformFunc(rawData);
                    /* Start Read Write Gold Prototype */
                    if (rawData["http://registry.gpii.net/applications/com.texthelp.readWriteGold"]) {
                        var rwgSettings = rawData["http://registry.gpii.net/applications/com.texthelp.readWriteGold"];
                        gpiiModel.gpii_primarySchema_readWriteGoldEnabled = true;
                        if (rwgSettings["ApplicationSettings.Speech.optSAPI5Voice.$t"]) {
                            gpiiModel.gpii_primarySchema_readWriteGoldVoice = rwgSettings["ApplicationSettings.Speech.optSAPI5Voice.$t"];
                        }
                        if (rwgSettings["ApplicationSettings.Speech.optSAPI5Pitch.$t"]) {
                            gpiiModel.gpii_primarySchema_readWriteGoldPitch = rwgSettings["ApplicationSettings.Speech.optSAPI5Pitch.$t"];
                        }
                        if (rwgSettings["ApplicationSettings.Speech.optSAPI5Speed.$t"]) {
                            gpiiModel.gpii_primarySchema_readWriteGoldSpeed = rwgSettings["ApplicationSettings.Speech.optSAPI5Speed.$t"];
                        }
                        if (rwgSettings["ApplicationSettings.Speech.optSAPI5Volume.$t"]) {
                            gpiiModel.gpii_primarySchema_readWriteGoldVolume = rwgSettings["ApplicationSettings.Speech.optSAPI5Volume.$t"];
                        }
                        if (rwgSettings["ApplicationSettings.Speech.optSAPI5PauseBetweenWords.$t"]) {
                            gpiiModel.gpii_primarySchema_readWriteGoldWordPause = rwgSettings["ApplicationSettings.Speech.optSAPI5PauseBetweenWords.$t"];
                        }
                    }
                    /* End Read Write Gold Prototype */
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    fluid.log("GET: Error at retrieving from GPII! Test status: " + textStatus);
                    fluid.log(errorThrown);
                }
            });
        }

        return gpiiModel;
    };

    gpii.prefs.gpiiStore.set = function (model, settings, session, modelTransformFunc, onSuccessfulSetFunction) {
        var transformedModel = [];
        var preferences = session.options.preferenceSet;

        var contexts = session.options.context;
        console.log("The new model is: \n"+model);
        fluid.each(preferences, function (preference) {
            transformedModel.push(modelTransformFunc(JSON.parse(preference)));
        });
        //transformedModel.push(modelTransformFunc(model));
        transformedModel[session.options.currentSetId] = modelTransformFunc(model);


        /* Start Read Write Gold Prototype */
        if (model.gpii_primarySchema_readWriteGoldEnabled && model.gpii_primarySchema_readWriteGoldEnabled === true) {
            transformedModel[0]["http://registry.gpii.net/applications/com.texthelp.readWriteGold"] = {}
            var rwgSettings = transformedModel[0]["http://registry.gpii.net/applications/com.texthelp.readWriteGold"]
            if (model.gpii_primarySchema_readWriteGoldVoice) {
                rwgSettings["ApplicationSettings.Speech.optSAPI5Voice.$t"] = model.gpii_primarySchema_readWriteGoldVoice;
            }
            if (model.gpii_primarySchema_readWriteGoldPitch) {
                rwgSettings["ApplicationSettings.Speech.optSAPI5Pitch.$t"] = model.gpii_primarySchema_readWriteGoldPitch;
            }
            if (model.gpii_primarySchema_readWriteGoldSpeed) {
                rwgSettings["ApplicationSettings.Speech.optSAPI5Speed.$t"] = model.gpii_primarySchema_readWriteGoldSpeed;
            }
            if (model.gpii_primarySchema_readWriteGoldVolume) {
                rwgSettings["ApplicationSettings.Speech.optSAPI5Volume.$t"] = model.gpii_primarySchema_readWriteGoldVolume;
            }
            if (model.gpii_primarySchema_readWriteGoldWordPause) {
                rwgSettings["ApplicationSettings.Speech.optSAPI5PauseBetweenWords.$t"] = model.gpii_primarySchema_readWriteGoldWordPause;
            }
        }
        /* End Read Write Gold Prototype */


        var dataToSend = {
            "contexts": {
                "gpii-default": {
                    "name": "Default preferences",
                    "preferences": transformedModel[0]
                }
            }
        };

        fluid.each(contexts, function (context, index) {
            context = JSON.parse(context);
            var enabled = context.enabled;
            if (enabled){
                var name = context.setName;
                var newSet = {
                    "newSet": {
                        "name": context.setName,
                        "preferences": transformedModel[index+1],
                        "conditions": [{
                            "type": "http://registry.gpii.net/conditions/timeInRange",
                            "from": context.fromTime,
                            "to": context.toTime,
                            "inputPath": "http://registry\\.gpii\\.net/common/environment/temporal\\.time"
                        }]
                    }
                };
                var tmp = JSON.stringify(newSet);
                tmp = tmp.replace("newSet",name);
                newSet = JSON.parse(tmp);
                $.extend(dataToSend.contexts, newSet);
            }
        });

        var urlToPost, requestType;
        if (session.options.loggedUser) {
            urlToPost = settings.url + "preferences/" + session.options.loggedUser;
            requestType = "PUT";
        }
        else {
            urlToPost = settings.url + "preferences/";
            requestType = "POST";
        }

        $.ajax({
            url: urlToPost,
            type: requestType,
            dataType: "json",
            async: false,
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            success: function (data) {
                if (requestType === "POST"){
                    onSuccessfulSetFunction(session, data, requestType);
                }
                if (requestType === "PUT"){
                    onSuccessfulSetFunction(session, data, requestType);
                }
                session.options.dataToSend = dataToSend;
            },
            error: function () {
                fluid.log("POST: Error at saving to GPII server");
            }
        });

    };

    fluid.defaults("gpii.prefs.gpiiSettingsStore", {
        gradeNames: ["fluid.globalSettingsStore", "autoInit"],
        settingsStoreType: "gpii.prefs.gpiiStore",
        distributeOptions: [{
            source: "{that}.options.settingsStoreType",
            removeSource: true,
            target: "{that > settingsStore}.type"
        }]
    });

})(jQuery, fluid);
