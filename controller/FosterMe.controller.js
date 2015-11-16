//jQuery.sap.registerModulePath("fish.foster.AnimalTile", "controls/AnimalTile");
//jQuery.sap.require("fish.foster.controls.BackgroundTile");

sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
	    'fish/foster/controller/DogProfilePage', 
		'sap/m/Dialog'
	], function(jQuery, Controller, JSONModel, DogProfilePage, Dialog) {
	"use strict";

	var PageController = Controller.extend("fish.foster.controller.FosterMe", {

		onInit : function (evt) {
			// set mock model

            var oDogModel = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getdoglist.php", 'FALSE');                   sap.ui.getCore().setModel(oDogModel);  
                //new JSONModel(jQuery.sap.getModulePath("fish.foster", "/model/data.json"));
           oDogModel.attachRequestCompleted(function() {          
			
            var x = oDogModel.getJSON();
            var element = JSON.parse(x);
            console.log(element);
            console.log(element.dogList[0].info);
   
           });
		},

        onAfterRendering : function (evt) {
//            var oTileContainer = this.getView().byId("container");
//            var tiles = oTileContainer.getTiles();
//            
//            if(tiles!=null && tiles.length>=1){
//                
//            	for ( var i = 0; i < tiles.length; i++) {
//					tiles[i].attachPress(onPress);
//                   alert(tiles.length);
//				}
//            }              
        },
    		
        
		handleEditPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = ! oTileContainer.getEditable();
			oTileContainer.setEditable(newValue);
			evt.getSource().setText(newValue ? "Done" : "Edit");
            
            
            // question: why can't do it in onAfterRendering
            var oTileContainer = this.getView().byId("container");
            var tiles = oTileContainer.getTiles();

            if(tiles!=null && tiles.length>=1){
                
            	for ( var i = 0; i < tiles.length; i++) {
					tiles[i].attachPress(
                        function(oEvent) {

                            var oID = oEvent.getSource().getId();
                            oID = oID.substr(oID.length-1,oID.length);

                            // set explored app's demo model on this sample
                            var oModel = new sap.ui.model.json.JSONModel("http://localhost/getDogInfo.php?ID="+oID,'FALSE');

                            oModel.attachRequestCompleted(function() {                            
                            var dogProfilePage = new DogProfilePage();     
                          
                            dogProfilePage.open(oEvent, this);
                                console.log(this);
                            });
				        }
                      
                    );
                }
            }                 
		},
       
            
        onPress : function(evt){
            var oID = evt.getSource().getProperty("ID");
            console.log(oID);
//            oID = oID.substr(oID.length-1,oID.length);

            // set explored app's demo model on this sample
            var oModel = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getDogInfo.php?ID_NUMBER="+oID,'FALSE');

            oModel.attachRequestCompleted(function() {                            
                var dogProfilePage = new DogProfilePage();     

                dogProfilePage.open(evt, this);
                
            });
        },

		handleBusyPress : function (evt) {
			var oTileContainer = this.getView().byId("container");
			var newValue = ! oTileContainer.getBusy();
			oTileContainer.setBusy(newValue);
			evt.getSource().setText(newValue ? "Done" : "Busy state");
		},

		handleTileDelete : function (evt) {
			var tile = evt.getParameter("tile");  
            alert(tile);
			evt.getSource().removeTile(tile);
		},

		handleTileAdd : function (evt) {
            alert("add");
			var tile = new sap.m.StandardTile("Tile1",{icon :"/imgc",
                          title:"App1",
                          press:onPress
                          });             
			evt.getSource().addTile(tile);
		},        
            

        openDialog : function() {
			// associate controller with the fragment
			this.oPersonalizationDialog = sap.ui.xmlfragment("fish.foster.controller.PersonalizationDialog", this);
			this.getView().addDependent(this.oPersonalizationDialog);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.oPersonalizationDialog);
			this.oPersonalizationDialog.open();
		}, 
        
        goHome : function(){
            app.to("homepage");
        }  , 
        
        goFoster : function(){
            app.to("fosterpage");
        }  , 
        
        goDashboard : function(){
            app.to("dashboardpage");
        }     ,        
        
        goAdmin : function(){
            app.to("adminpage");
        },
        
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

	return PageController;

});