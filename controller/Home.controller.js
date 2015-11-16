sap.ui.define(['jquery.sap.global','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel', 
		'sap/m/Dialog'],
	function(jQuery, Controller, JSONModel, Dialog) {
	"use strict";

	var CarouselController = Controller.extend("fish.foster.controller.Home", {

		onInit : function (evt) {
			// set explored app's demo model on this sample

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
        } ,
        
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


	return CarouselController;

});