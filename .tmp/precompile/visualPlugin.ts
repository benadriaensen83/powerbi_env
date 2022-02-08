import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api"
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var boilerplatecodeA1C30DD7D2AC4FCFA196CA6E8EE72575_DEBUG: IVisualPlugin = {
    name: 'boilerplatecodeA1C30DD7D2AC4FCFA196CA6E8EE72575_DEBUG',
    displayName: 'boilerplatecode',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["boilerplatecodeA1C30DD7D2AC4FCFA196CA6E8EE72575_DEBUG"] = boilerplatecodeA1C30DD7D2AC4FCFA196CA6E8EE72575_DEBUG;
}

export default boilerplatecodeA1C30DD7D2AC4FCFA196CA6E8EE72575_DEBUG;