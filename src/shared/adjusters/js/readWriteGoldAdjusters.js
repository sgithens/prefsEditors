(function ($, fluid) {
    "use strict";

    fluid.defaults("gpii.panel.readWriteGold", {
        gradeNames: ["fluid.prefs.compositePanel", "autoInit"],
        selectors: {
            panelLabel: ".gpiic-headerTitle",
            readWriteGoldSection: ".gpiic-readWriteGold-section"
        },
        selectorsToIgnore: ["readWriteGoldSection"],
        protoTree: {
            panelLabel: {messagekey: "readWriteGoldPresetButtonLabel"}
        },
        members: {
            messageResolver: "{prefsEditorLoader}.msgResolver"
        },
        listeners: {
            "afterRender.setSectionName": {
                "this": "{that}.dom.readWriteGoldSection",
                "method": "attr",
                "args": ["aria-label", "{that}.msgLookup.readWriteGoldPresetButtonLabel"]
            }
        }
    });

    fluid.defaults("gpii.adjuster.readWriteGoldEnabled", {
        gradeNames: ["gpii.adjuster.onOffSwitch", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldEnabled": {
                "model.readWriteGoldEnabled": "default"
            }
        },
        protoTree: {
            valueCheckbox: "${readWriteGoldEnabled}",
            headingLabel: {messagekey: "useReadWriteGoldLabel"}
        },
        onOffModelKey: "readWriteGoldEnabled"
    });

    fluid.defaults("gpii.adjuster.readWriteGoldVoice", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldVoice": {
                "model.readWriteGoldVoice": "default",
                "controlValues.readWriteGoldVoice": "enum"
            }
        },
        selectors: {
            readWriteGoldVoice: ".gpiic-readWriteGoldVoice",
            readWriteGoldVoiceLabel: ".gpiic-readWriteGoldVoice-label"
        },
        stringArrayIndex: {
            readWriteGoldVoiceName: ["readWriteGoldVoiceName-Emily", "readWriteGoldVoiceName-Daniel",
                "readWriteGoldVoiceName-Serena", "readWriteGoldVoiceName-Sangeeta"]
        },
        protoTree: {
            readWriteGoldVoice: {
                selection: "${readWriteGoldVoice}",
                optionnames: "${{that}.msgLookup.readWriteGoldVoiceName}",
                optionlist: "${{that}.options.controlValues.readWriteGoldVoice}"
            },
            readWriteGoldVoiceLabel: {messagekey: "readWriteGoldVoiceLabel"}
        }
    });

    fluid.defaults("gpii.adjuster.readWriteGoldPitch", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldPitch": {
                "model.value": "default",
                "controlValues.readWriteGoldPitch.min": "minimum",
                "controlValues.readWriteGoldPitch.max": "maximum",
                "controlValues.readWriteGoldPitch.step": "divisibleBy"
            }
        },
        selectors: {
            readWriteGoldPitchLabel: ".gpiic-readWriteGold-rwgPitch-label",
            readWriteGoldPitch: ".gpiic-readWriteGold-rwgPitch-stepper"
        },
        selectorsToIgnore: ["readWriteGoldPitch"],
        components: {
            textfieldStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.readWriteGoldPitch",
                createOnEvent: "afterRender",
                options: {
                    sourceApplier: "{readWriteGoldPitch}.applier",
                    rules: {
                        "value": "value"
                    },
                    model: {
                        value: "{readWriteGoldPitch}.model.value"
                    },
                    range: "{readWriteGoldPitch}.options.controlValues.readWriteGoldPitch",
                    labelledbyDomElement: "{readWriteGoldPitch}.dom.readWriteGoldPitchLabel"
                }
            }
        },
        protoTree: {
            readWriteGoldPitchLabel: {messagekey: "readWriteGoldPitchLabel"}
        }
    });

    fluid.defaults("gpii.adjuster.readWriteGoldSpeed", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldSpeed": {
                "model.value": "default",
                "controlValues.readWriteGoldSpeed.min": "minimum",
                "controlValues.readWriteGoldSpeed.max": "maximum",
                "controlValues.readWriteGoldSpeed.step": "divisibleBy"
            }
        },
        selectors: {
            readWriteGoldSpeedLabel: ".gpiic-readWriteGold-rwgSpeed-label",
            readWriteGoldSpeed: ".gpiic-readWriteGold-rwgSpeed-stepper"
        },
        selectorsToIgnore: ["readWriteGoldSpeed"],
        components: {
            textfieldStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.readWriteGoldSpeed",
                createOnEvent: "afterRender",
                options: {
                    sourceApplier: "{readWriteGoldSpeed}.applier",
                    rules: {
                        "value": "value"
                    },
                    model: {
                        value: "{readWriteGoldSpeed}.model.value"
                    },
                    range: "{readWriteGoldSpeed}.options.controlValues.readWriteGoldSpeed",
                    labelledbyDomElement: "{readWriteGoldSpeed}.dom.readWriteGoldSpeedLabel"
                }
            }
        },
        protoTree: {
            readWriteGoldSpeedLabel: {messagekey: "readWriteGoldSpeedLabel"}
        }
    });

    fluid.defaults("gpii.adjuster.readWriteGoldVolume", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldVolume": {
                "model.value": "default",
                "controlValues.readWriteGoldVolume.min": "minimum",
                "controlValues.readWriteGoldVolume.max": "maximum",
                "controlValues.readWriteGoldVolume.step": "divisibleBy"
            }
        },
        selectors: {
            readWriteGoldVolumeLabel: ".gpiic-readWriteGold-rwgVolume-label",
            readWriteGoldVolume: ".gpiic-readWriteGold-rwgVolume-stepper"
        },
        selectorsToIgnore: ["readWriteGoldVolume"],
        components: {
            textfieldStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.readWriteGoldVolume",
                createOnEvent: "afterRender",
                options: {
                    sourceApplier: "{readWriteGoldVolume}.applier",
                    rules: {
                        "value": "value"
                    },
                    model: {
                        value: "{readWriteGoldVolume}.model.value"
                    },
                    range: "{readWriteGoldVolume}.options.controlValues.readWriteGoldVolume",
                    labelledbyDomElement: "{readWriteGoldVolume}.dom.readWriteGoldVolumeLabel"
                }
            }
        },
        protoTree: {
            readWriteGoldVolumeLabel: {messagekey: "readWriteGoldVolumeLabel"}
        }
    });

    fluid.defaults("gpii.adjuster.readWriteGoldWordPause", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.readWriteGoldWordPause": {
                "model.value": "default",
                "controlValues.readWriteGoldWordPause.min": "minimum",
                "controlValues.readWriteGoldWordPause.max": "maximum",
                "controlValues.readWriteGoldWordPause.step": "divisibleBy"
            }
        },
        selectors: {
            readWriteGoldWordPauseLabel: ".gpiic-readWriteGold-rwgWordPause-label",
            readWriteGoldWordPause: ".gpiic-readWriteGold-rwgWordPause-stepper"
        },
        selectorsToIgnore: ["readWriteGoldWordPause"],
        components: {
            textfieldStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.readWriteGoldWordPause",
                createOnEvent: "afterRender",
                options: {
                    sourceApplier: "{readWriteGoldWordPause}.applier",
                    rules: {
                        "value": "value"
                    },
                    model: {
                        value: "{readWriteGoldWordPause}.model.value"
                    },
                    range: "{readWriteGoldWordPause}.options.controlValues.readWriteGoldWordPause",
                    labelledbyDomElement: "{readWriteGoldWordPause}.dom.readWriteGoldWordPauseLabel"
                }
            }
        },
        protoTree: {
            readWriteGoldWordPauseLabel: {messagekey: "readWriteGoldWordPauseLabel"}
        }
    });

})(jQuery, fluid);
