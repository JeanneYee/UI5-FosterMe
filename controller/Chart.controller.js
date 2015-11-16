jQuery.sap.registerModulePath("sap.jaysdk.Chart", "controls/Chart_new");
jQuery.sap.require("sap.jaysdk.Chart");
jQuery.sap.registerModulePath("sap.jaysdk.ChartItem", "controls/Chart_new");
jQuery.sap.require("sap.jaysdk.ChartItem");


sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("fish.foster.controller.Chart", {
       
      		onBeforeRendering : function () {
                
                var oModel = this.getView().getModel();
                var oChartHolder = this.byId("ChartHolder");
                
                  oModel.attachRequestCompleted(function() {                


                        var oChartItem = new sap.jaysdk.ChartItem({region:"{region}", budget:"{budget}", bw:"{bw}", forecast:"{forecast}"});
                        /* new  chart */
                        var oChart = new sap.jaysdk.Chart({
                               items: {path : "/UserSet", template : oChartItem}
                        });





                        oChart.setModel(oModel);
                        oChartHolder.addItem(oChart);   

                      var x = oModel.getJSON();
                      var element = JSON.parse(x);
                      console.log(element.UserSet[1].Email);
                  });                

		}
   });
});