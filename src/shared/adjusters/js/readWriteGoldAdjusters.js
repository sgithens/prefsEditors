(function ($, fluid) {
    "use strict";

    // fluid.defaults("gpii.panel.readWriteGold" {
    //
    // });

    fluid.defaults("gpii.adjuster.readWriteGoldEnabled", {
        gradeNames: ["gpii.adjuster.onOffSwitch", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldEnabled": {
                "model.readWriteGoldEnabled": "default"
            }
        },
        protoTree: {
            valueCheckbox: "${windowsOnscreenKeyboard}",
            headingLabel: {messagekey: "windowsOnscreenKeyboardLabel"}
            //screenReaderBrailleOutputDescription: {messagekey: "screenReaderBrailleOutputDescription"}
        },
        onOffModelKey: "windowsOnscreenKeyboard"
    });

    fluid.defaults("gpii.adjuster.readWriteGoldVoice", {

    });

    fluid.defaults("gpii.adjuster.readWriteGoldSpeed", {

    });

})(jQuery, fluid);
