//sap.ui.define([
//	"sap/ui/base/Object"
//], function (Object) {
//	"use strict";
//	return Object.extend("fish.foster.controller.DogProfileDialog", {
//		_getDialog : function () {
//			// create dialog lazily
//			if (!this._oDialog) {
//				// create dialog via fragment factory
//				this._oDialog = sap.ui.xmlfragment("fish.foster.view.DogProfileDialog", this);
//			}
//			return this._oDialog;
//		},
//		open : function (oEvent) {
//			var oDialog = this._getDialog();
//			// connect dialog to view (models, lifecycle)
//	
//            var oID = oEvent.getSource().getId();
//            oID = oID.substr(oID.length-1,oID.length);
//      
//            var oModel = new sap.ui.model.json.JSONModel("http://localhost/getDogInfo.php?ID="+oID,'FALSE');
//            sap.ui.getCore().setModel(oModel,"dogInfo");            
//         
//            
//			// open dialog            
//			oDialog.open();
//		},
//        
//		onCloseDialog : function () {
//			this._getDialog().close();
//		}
//	});
//});

//
//sap.ui.define([
//		'sap/m/MessageBox',
//		'sap/ui/core/Fragment',
//		'sap/ui/core/mvc/Controller',
//		'sap/ui/model/json/JSONModel'
//	], function(MessageBox, Fragment, Controller, JSONModel) {
//	"use strict";
//
//	var CController = Controller.extend("fish.foster.controller.DogProfileDialog", {
//
//		onInit : function (evt) {
// 
//		},
//
//		open: function (oEvent) {
//            
//            var oID = oEvent.getSource().getId();
//            oID = oID.substr(oID.length-1,oID.length);
//            
//			// set explored app's demo model on this sample
//			var oModel = new sap.ui.model.json.JSONModel("http://localhost/getDogInfo.php?ID="+oID,'FALSE');
//			sap.ui.getCore().setModel(oModel,"dogInfo");        
//            
//			//var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
//oModel.attachRequestCompleted(function() {            
//            var x = oModel.getJSON();
//            var element = JSON.parse(x);
//            console.log(element);
//            console.log(element.DogInfo[0].BREED);
//
//			MessageBox.show(element.DogInfo[0].NAME, {
//				icon: MessageBox.Icon.INFORMATION,
//				title: element.DogInfo[0].NAME,
//				actions: [MessageBox.Action.OK],
//				id: "messageBoxId1",
//				defaultAction: MessageBox.Action.NO,
//				details: element.DogInfo[0].BREED,
////				styleClass: bCompact? "sapUiSizeCompact" : ""
//			});
//});    
//		}
//	});
//
//
//	return CController;
//
//});



sap.ui.define([
   "sap/ui/core/mvc/Controller"    
], function (Controller) {
   "use strict";
   return Controller.extend("fish.foster.controller.DogProfilePage", {


       
            //Helper function to easier create a Matrixlayout
            row : function (sLabel, sText, sUrl) {
                var oControl;
                if(!sUrl){
                    oControl = new sap.ui.commons.TextView({
                        text: sText,
                        tooltip: sText
                    });
                }else{
                    oControl = new sap.ui.commons.Link({
                        text: sText,
                        href: sUrl,
                        tooltip: sText,
                        target: "_blank"
                    });
                }

                var oLabel = new sap.ui.commons.Label({
                    text: sLabel + ":",
                    labelFor: oControl
                });

                var oMLCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
                    hAlign : sap.ui.commons.layout.HAlign.End,
                    vAlign : sap.ui.commons.layout.VAlign.Top,
                    content : [ oLabel ]
                });
                var oMLCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
                    hAlign : sap.ui.commons.layout.HAlign.Begin,
                    vAlign : sap.ui.commons.layout.VAlign.Top,
                    content : [ oControl ]
                });

                return new sap.ui.commons.layout.MatrixLayoutRow({
                    cells : [ oMLCell1, oMLCell2 ]
                });
            },
              
       
		onInit : function (evt) {
			// set explored app's demo model on this sample

            
        },
       
        open: function(oEvent, oModel){                    
         
            console.log("open");
//            oModel.attachRequestCompleted(function() {
                 
              var x = oModel.getJSON();
              var element = JSON.parse(x);
     console.log(element.DogInfo[0].BREED);
                    
               //Actions of the ThingInspector

             var oA1 = new sap.ui.ux3.ThingAction({
                    id : "close",
                    text : "Close",
                    tooltip: "Close"
                });


            
           
                //Facet content of the ThingInspector
                var oFC1 = new sap.ui.ux3.ThingGroup({
                    title : "My Story",
                    content: [                        
                        new sap.ui.core.HTML({
                            content: element.DogInfo[0].DESCRIPTION
                        })
                    ]
                });
                var oFC2 = new sap.ui.ux3.ThingGroup({
                    title : "Foster Me!",
                    content: [
                        new sap.ui.xmlview(      // new app XML view
                   {
                       viewName : "fish.foster.view.FosterCalendarSelection"
                   })
                    ]
                });         

                var oFC3 = new sap.ui.ux3.ThingGroup({
                    title : "More Photos",
                    content: [
                        
                            new sap.ui.layout.Grid({
//                                hSpacing: 0.1,
//                                vSpacing: 0.3,
                                defaultSpan:"L6 M6 S12",
                                content: [
                                        new sap.ui.commons.Image({
                                        src : element.DogInfo[0].IMAGE2,
                                        height : "200px",
                                        width : "200px"
                                    }),                             
                                        new sap.ui.commons.Image({
                                        src : element.DogInfo[0].IMAGE3,
                                        height : "200px",
                                        width : "200px"
                                    }) 
                                ]
                            }), 

                    ]
                });   
                    
//                var oRow = new dummy.controls.Row();
             
                //ThingInspector
                 var oTI = new sap.ui.ux3.ThingInspector({
                    firstTitle: element.DogInfo[0].NAME,
                    secondTitle: element.DogInfo[0].BREED,
                 
//                    type: "Employee",
                    icon: element.DogInfo[0].IMAGE,//"./resource/dog_Rocky.jpg",
                    updateActionEnabled: false,
                    facets: [
                         new sap.ui.ux3.NavigationItem({key : "overview", text : "Overview"}),
                         new sap.ui.ux3.NavigationItem({key : "foster", text : "Foster Me"})
                    ],
                     headerContent: [
                    new sap.ui.ux3.ThingGroup({
                        title : "About",
                        content: [
                            new sap.ui.commons.layout.MatrixLayout({rows: [
                                this.row("Born", element.DogInfo[0].BORN),
                                this.row("Gender", element.DogInfo[0].GENDER),
                                this.row("Weight", element.DogInfo[0].WEIGHT),
                                this.row("Energy Level", element.DogInfo[0].ENERGY_LEVEL),
                                this.row("Kids", element.DogInfo[0].KIDS),
                                this.row("Dogs", element.DogInfo[0].DOGS),
                                this.row("Cats", element.DogInfo[0].CATS),
                                this.row("Special Notes", element.DogInfo[0].SPECIAL_NOTES),
                                this.row("Dog ID", element.DogInfo[0].ID_NUMBER)
//                                this.row("link", "www.sap.com", "http://www.sap.com")                                
                            ]})
                        ]
                    }),
                ],
                    
                openNew: function(oEvent) {
                    sap.ui.commons.MessageBox.show("You triggered the open in new window action which is not implemented here.", "INFORMATION", "Open new", "CLOSE", null, "CLOSE");
                },
                    
                facetSelected: function(oEvent) {
                    
                    oTI.removeAllFacetContent();
                    oTI.removeAllActions();
                    oTI.addStyleClass("thingInspector");
                    switch(oEvent.getParameter("key")){
                        case "overview":
                            oTI.addFacetContent(oFC1);
                            oTI.addFacetContent(oFC3);
                            oTI.addAction(oA1);
                            break;
                        case "foster":
                            oTI.addFacetContent(oFC1);
                            oTI.addFacetContent(oFC2);
                            oTI.addAction(oA1);
                            break;
                    }
                    
                
                },
                actionSelected: function(oEvent) {
                    var oAction = oEvent.getParameter("action");
                    var sActionId = oAction.getId();

                    if(sActionId == "close"){
                        if(oTI.isOpen()){                           
                           oTI.close();
                            
                            return;
                        }
                    }
                    var idx = sActionId.lastIndexOf("-");
                    if(idx >= 0){
                        sActionId = sActionId.substring(idx+1);
                        if(sActionId == "follow"){
                            sActionId = sActionId + " (State: "+ oTI.getFollowState()+")";
                        }
                    }
                    sap.ui.commons.MessageBox.show("You triggered the following action: " + sActionId, "INFORMATION", "Action triggered", "CLOSE", null, "CLOSE");
                }

                }); 
         
              
                
                    if(!oTI.isOpen()){
                        oTI.open();
                    }
//              });
            
        
       
              
        }       
       
       
       
       
   });
}
);
                            