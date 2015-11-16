jQuery.sap.registerModulePath("fish.foster.HorizontalBarChart", "controls/HorizontalBarChart");
jQuery.sap.require("fish.foster.HorizontalBarChart");
jQuery.sap.registerModulePath("fish.foster.HorizontalBarChartItem", "controls/HorizontalBarChart");
jQuery.sap.require("fish.foster.HorizontalBarChartItem");



sap.ui.define([
   "sap/ui/core/mvc/Controller", 
		'sap/m/Dialog'
], function (Controller, Dialog) {
   "use strict";
   return Controller.extend("fish.foster.controller.Graph", {
       
      		onBeforeRendering : function () {
                
                var oModel = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getstatistic_occupation.php", 'FALSE');
                var oModel2 = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getstatistic_age.php", 'FALSE');                
                var oChartHolder = this.byId("GraphHolder");
                var oChartHolder2 = this.byId("GraphHolder2");       
                
                  oModel.attachRequestCompleted(function() {                


//                        var oChartItem = new fish.foster.HorizontalBarChartItem({dim1:"{OCCUPATION}", dim2:"{AGE_RANGE}", dim3:"{GENDER}", value:"{COUNT}"});
                 var oChartItem = new fish.foster.HorizontalBarChartItem({dim1:"{OCCUPATION}", value:"{COUNT}"});               
                         
                        /* new  chart */
                var oChart = new fish.foster.HorizontalBarChart({
                       items: {path : "/FosterStatistic_Occupation", template : oChartItem}
                });
          

                        oChart.setModel(oModel);
                        oChartHolder.addItem(oChart);   



                  });                

                oModel2.attachRequestCompleted(function() {           
                var oChartItem2 = new fish.foster.HorizontalBarChartItem({dim1:"{AGE_RANGE}", dim2:"{GENDER}",value:"{COUNT}"});     
                var oChart2 = new fish.foster.HorizontalBarChart({
                       items: {path : "/FosterStatistic_Age", template : oChartItem2}
                });
                
                
                        oChart2.setModel(oModel2);
                        oChartHolder2.addItem(oChart2);   
                
                      var x = oModel2.getJSON();
                      var element = JSON.parse(x);
                      console.log(element.FosterStatistic_Age[1].AGE_RANGE);
                });  
		},
        
        
        goHome : function(){
            app.to("homepage");
        }  , 
        
        goFoster : function(){
            app.to("fosterpage");
        }  , 
        
        goDashboard : function(){
            app.to("dashboardpage");
        }  ,        
        
        goAdmin : function(){
            app.to("adminpage");
        }  ,
        
        goLogin : function(){

               var flexbox=new sap.m.FlexBox({direction:"Column",height:"150px"});
               flexbox.addItem( new sap.m.Input("un",{placeholder:"Enter UserName"}));
               flexbox.addItem( new sap.m.Input("pass",{type:sap.m.InputType.Password,placeholder:"Enter Password"}));
   
               flexbox.setAlignItems("Center");
               flexbox.setJustifyContent("Center");
            
        var dialog = new Dialog({
				title: 'Login',
				content: flexbox,
				beginButton: new sap.m.Button({
					text: 'Login',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {                    
					dialog.destroy();
                    app.to("adminpage");
				}
			});

			//to get access to the global model
			this.getView().addDependent(dialog);
			dialog.open();
        }
   });
});