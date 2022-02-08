"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { VisualSettings } from "./settings";
import * as d3 from 'd3';

export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;
    private container: d3.Selection<HTMLDivElement, any, HTMLDivElement, any>;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        this.container = d3.select(this.target)
            .append('div')
                .attr('id', 'my_dataviz');
    }
    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = options.viewport.width - margin.left - margin.right,
            height = options.viewport.height - margin.top - margin.bottom;
        /** Append the svg object to the body of the page */
        var svg = this.container
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        var path = d3.geoPath();
        var projection = d3.geoMercator()
            .scale(7000)
            .center([8.227512, 46.818188])
            .translate([width / 2, height / 2]);
        
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return VisualSettings.parse(dataView) as VisualSettings;
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}