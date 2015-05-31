/*!
Cloud4all Preferences Management Tools

Copyright 2013 CERTH/HIT
Copyright 2014 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {
    "use strict";

    fluid.defaults("gpii.adjuster.lowResolutionEnabled", {
        gradeNames: ["gpii.adjuster.onOffSwitch", "autoInit"],
        mergePolicy: {
            selectorsToIgnore: fluid.prefs.compositePanel.arrayMergePolicy
        },
        preferenceMap: {
            "gpii.primarySchema.lowResolutionEnabled": {
                "model.value": "default"
            }
        },
        protoTree: {
            headingLabel: {messagekey: "lowResolutionLabel"},
            valueCheckbox: "${value}"
        },
        onOffModelKey: "value",
        selectors: {
            headingLabel: ".gpiic-lowResSwitch-label",
            valueCheckbox: ".gpiic-lowResSwitch-input",
            onOffSwitch: ".gpiic-prefsEditor-lowResSwitch"
        }
    });

})(jQuery, fluid);
