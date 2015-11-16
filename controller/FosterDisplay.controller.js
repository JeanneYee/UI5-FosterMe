sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
	    'sap/ui/model/Filter',
	    'sap/ui/model/FilterOperator',
		'sap/ui/core/Fragment',
	    'fish/foster/model/formatter', 
		'sap/m/Dialog'
	], function(jQuery, Controller, JSONModel, Filter, FilterOperator, Fragment ,formatter , Dialog) {
	"use strict";
    var oTable;
    var oModelCalendar;
	var TableController = Controller.extend("fish.foster.controller.FosterDisplay", {
        formatter: formatter,
		onInit: function () {
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getalldogcalendar.php?MONTH=2015-11", false);
			this.getView().setModel(oModel);
     
            oTable =  this.getView().byId("table1");
            oTable.setMode(sap.m.ListMode.SingleSelectMaster);
//            oTable.attachSelectionChange(this.handleSelect) ;
//            oTable.attachItemPress(this.handleSelect) ;
            oTable.attachSelect(this.handleSelect) ;
       
            
	  // define the Table columns



		oTable.addColumn(new sap.m.Column({
//			label: new sap.ui.commons.Label({text: "DOG_NAME"}),
//             header: new sap.ui.commons.Label({text: "Name"})
                  multiLabels: [  
           new sap.ui.commons.Label({text: "Header spanning 2 columns", textAlign: "Center"}),  
           new sap.ui.commons.Label({text: "Header below first header"})  
                   ],  
             headerSpan: [2,1]
        }));

            for (var i = 1;i<31; i++){
                 oTable.addColumn(new sap.m.Column({
        //			label: new sap.ui.commons.Label({text: "CAL_DATE"}),
                    header: new sap.ui.commons.Label({text: i}),
                     width: "20px"

                }));
            };
           
            oTable.addStyleClass("sapMListTblCell");
            var oText = new sap.m.Text({ text : "{DOG_NAME}" });
            var oColumnListItem =  new sap.m.ColumnListItem({
                cells : [ oText,                            
                          new sap.m.Text({ text : "{STATUS_1}" , class: "smallText" }),
                          new sap.m.Text({ text : "{STATUS_2}" }),
                          new sap.m.Text({ text : "{STATUS_3}" }),
                          new sap.m.Text({ text : "{STATUS_4}" }),
                          new sap.m.Text({ text : "{STATUS_5}" }),
                          new sap.m.Text({ text : "{STATUS_6}" }),
                          new sap.m.Text({ text : "{STATUS_7}" }),
                          new sap.m.Text({ text : "{STATUS_8}" }),
                          new sap.m.Text({ text : "{STATUS_9}" }),
                          new sap.m.Text({ text : "{STATUS_10}" }),
                          new sap.m.Text({ text : "{STATUS_11}" }),
                          new sap.m.Text({ text : "{STATUS_12}" }),
                          new sap.m.Text({ text : "{STATUS_13}" }),
                          new sap.m.Text({ text : "{STATUS_14}" }),
                          new sap.m.Text({ text : "{STATUS_15}" }),
                          new sap.m.Text({ text : "{STATUS_16}" }),
                          new sap.m.Text({ text : "{STATUS_17}" }),
                          new sap.m.Text({ text : "{STATUS_18}" }),
                          new sap.m.Text({ text : "{STATUS_19}" }),
                          new sap.m.Text({ text : "{STATUS_20}" }),
                          new sap.m.Text({ text : "{STATUS_21}" }),
                          new sap.m.Text({ text : "{STATUS_22}" }),
                          new sap.m.Text({ text : "{STATUS_23}" }),
                          new sap.m.Text({ text : "{STATUS_24}" }),
                          new sap.m.Text({ text : "{STATUS_25}" }),
                          new sap.m.Text({ text : "{STATUS_26}" }),
                          new sap.m.Text({ text : "{STATUS_27}" }),
                          new sap.m.Text({ text : "{STATUS_28}" }),
                          new sap.m.Text({ text : "{STATUS_29}" }),
                          new sap.m.Text({ text : "{STATUS_30}" })
                        ]  
              });		

            
            oText.addStyleClass("smallText");
            
//             oTable.addColumn(new sap.m.Column({
//                        oColumnListItem.addCell(new sap.m.Text({
//                      text : "{STATUS_1}"
//                    }));
//                }));
//          
            
            oTable.bindItems("/AllDogCalendar", oColumnListItem);
		},
        
		onExit : function () {
			if (this._oDialog) {
				this._oDialog.destroy();
               
			}
		},
        

        handleSelect: function(oEvent) {
              var oSelectedItem = oEvent.getParameter("listItem");
              var sItemName = oSelectedItem.getBindingContext().getProperty("DOG_NAME");
              oModelCalendar = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getdogcalendar_admin.php?NAME=" + sItemName+"&MONTH=2015-11", 'FALSE');

              oModelCalendar.attachRequestCompleted(function() {
                  var x = oModelCalendar.getJSON();
                  var element = JSON.parse(x);
                


               if (! this._oDialog) {
                    this._oDialog = sap.ui.xmlfragment("fish.foster.view.FosterDisplay", this);
                   this._oDialog.setModel(oModelCalendar);  
                }

                this._oDialog.setMultiSelect(true);

                oTable.getParent().addDependent(this._oDialog);

                var oModel = new sap.ui.model.json.JSONModel("http://localhost/jsondata.php", false);
                  
                // toggle compact style
                jQuery.sap.syncStyleClass("sapUiSizeCompact", oTable.getParent(), this._oDialog);
                this._oDialog.attachConfirm(function(evt) {
                        console.log("confirmed");
                        var aContexts = evt.getParameter("selectedContexts");
                        if (aContexts.length) {
//                            console.log("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().FOSTER; }).join(", "));
                           console.log(aContexts.length);
                            console.log(aContexts);
                            for (var i = 0; i<aContexts.length; i++ )
                                {
                                  oModel.loadData("http://localhost/MyUI5/JSON/updatedogcalendar_admin.php?NAME="+sItemName+"&CAL_DATE="+aContexts[i].getObject().CAL_DATE+"&FOSTER="+aContexts[i].getObject().FOSTER, 'TRUE');
                
                         
                                }
                        }
                        evt.getSource().getBinding("items").filter([]);
                    			
		
                    }        
            );
                this._oDialog.open();                  
          });
          
            oTable.removeSelections(true);
		} ,
        
		handleSearch: function(oEvent) {
            console.log("seaech");
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
        
        goHome : function(){
            app.to("homepage");
        }     
		, 
        
        goFoster : function(){
            app.to("fosterpage");
        }  , 
        
        goDashboard : function(){
            app.to("dashboardpage");
        }  ,        
        
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


	return TableController;

});