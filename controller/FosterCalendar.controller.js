sap.ui.define(['sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel', 'sap/ui/unified/DateTypeRange', 'sap/ui/unified/CalendarLegendItem','sap/m/MessageToast'],
	function(Controller, JSONModel, DateTypeRange, CalendarLegendItem, MessageToast) {
	"use strict";
    var oI;
    var oSelectedDates;
	var CalendarMultipleDaySelectionController = Controller.extend("fish.foster.controller.FosterCalendar", {
		oFormatYyyymmdd: null,
		oModel: null,        
        aSelectedDates: null,
        oFormatCalendarDate: null,
        oName: null,

        
		onInit: function() {
			this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});

			this.oModel = new JSONModel({selectedDates:[]});
			this.getView().setModel(this.oModel);
            
            // Jeanne - start here
            // 1. 
		},
        
        onBeforeRendering(oEvent)
        {
//            this.oFormatCalendarDate = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
//            var oSelectedDate = 
//			this.oModel = new JSONModel({selectedDates:['Thu Oct 01 2015 00:00:00 GMT-0500 (Central Daylight Time)']});
//			this.getView().setModel(this.oModel);
//            var oData = {selectedDates:['Thu Oct 01 2015 00:00:00 GMT-0500 (Central Daylight Time)']};
//            this.byId("calendar").addSelectedDate(oData.selectedDates);
//            console.log(oData); 
            console.log("onbeforerendering");
            
            var oRefDate;
            var oDateTypeRange;
            var oCalendar = this.getView().byId("calendar");
            var oLeg = this.getView().byId("legend");
            
            this.oName = oEvent.getSource().getParent().getParent().getProperty("title");

            var oModelCalendar = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getdogcalendar.php?NAME="+this.oName,'FALSE');

            oModelCalendar.attachRequestCompleted(function() {                            

              var x = oModelCalendar.getJSON();
              var element = JSON.parse(x);
              console.log(element.DogCalendar.length);
              var calDate = "2015-01-01";
                
                    for(var i=0; i<element.DogCalendar.length; i++){
                        calDate = element.DogCalendar[i].CAL_DATE;
                                           
                        oRefDate = new Date();  
                        oRefDate.setMonth(calDate.substr(calDate.length-5,2) - 1)
                        oRefDate.setDate(calDate.substr(calDate.length-2,calDate.length));
                        oRefDate.setFullYear(2015);            
                        console.log(oRefDate);

                        oDateTypeRange = new DateTypeRange({
                                    startDate : new Date(oRefDate),
                                    type : 'Type01'
                                });
                        oCalendar.addSpecialDate(oDateTypeRange);
                        

                }
                
                   
            });

             var oModelCalendar2 = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getdogcalendar_confirmed.php?NAME="+this.oName,'FALSE');

             oModelCalendar2.attachRequestCompleted(function() {                            

              var x2 = oModelCalendar2.getJSON();
              var element2 = JSON.parse(x2);
              console.log(element2.DogCalendar_Confirmed.length);
              var calDate2 = "2015-01-01";
                
                    for(var i=0; i<element2.DogCalendar_Confirmed.length; i++){
                        calDate2 = element2.DogCalendar_Confirmed[i].CAL_DATE;
                                           
                        oRefDate = new Date();  
                        oRefDate.setMonth(calDate2.substr(calDate2.length-5,2) - 1)
                        oRefDate.setDate(calDate2.substr(calDate2.length-2,calDate2.length));
                        oRefDate.setFullYear(2015);            
                        console.log(oRefDate);

                        oDateTypeRange = new DateTypeRange({
                                    startDate : new Date(oRefDate),
                                    type : 'Type02'
                                });
                        oCalendar.addSpecialDate(oDateTypeRange);
                        

                }
                
                
                 oLeg.addItem(new CalendarLegendItem({
                             text : "Other Fosterer"
                        }));
                 oLeg.addItem(new CalendarLegendItem({
                             text : "Confirmed (Jeanne)"
                        }));                 

            });  
            
             var oModelCalendar3 = new sap.ui.model.json.JSONModel("http://localhost/MyUI5/JSON/getdogcalendar_selected.php?NAME="+this.oName,'FALSE');

             oModelCalendar3.attachRequestCompleted(function() {                            

              var x3 = oModelCalendar3.getJSON();
              var element3 = JSON.parse(x3);
              console.log(element3.DogCalendar_Selected.length);
              var calDate3 = "2015-01-01";
                
                    for(var i=0; i<element3.DogCalendar_Selected.length; i++){
                        calDate3 = element3.DogCalendar_Selected[i].CAL_DATE;
                                           
                        oRefDate = new Date();  
                        oRefDate.setMonth(calDate3.substr(calDate3.length-5,2) - 1)
                        oRefDate.setDate(calDate3.substr(calDate3.length-2,calDate3.length));
                        oRefDate.setFullYear(2015);            
                        console.log(oRefDate);

                        oDateTypeRange = new DateTypeRange({
                                    startDate : new Date(oRefDate)
                                });
                        
                        oCalendar.addSelectedDate(oDateTypeRange);                       

                }
                 
                 
            });            
                
        },

		handleCalendarSelect: function(oEvent) {
//			var oCalendar = oEvent.oSource;
//			this.aSelectedDates = oCalendar.getSelectedDates();
//            
//			var oDate;
//			var oData = {selectedDates:[]};
//			if (this.aSelectedDates.length > 0 ) {
//				for(var i=0; i<this.aSelectedDates.length; i++){
//					oDate = this.aSelectedDates[i].getStartDate();
//					oData.selectedDates.push({Date:this.oFormatYyyymmdd.format(oDate)});
//				}
//				this.oModel.setData(oData);
//			} else {
//				this._clearModel();
//			}2
//                    
            
		},
        
        
        

		handleRemoveSelection: function(oEvent) {
			this.getView().byId("calendar").removeAllSelectedDates();
			this._clearModel();

		},

        handleSubmitSelection: function(oEvent) {
            
			oSelectedDates = this.getView().byId("calendar").getSelectedDates();
         
          
            var oModel = new sap.ui.model.json.JSONModel("http://localhost/jsondata.php", false);
            oModel.loadData("http://localhost/MyUI5/JSON/deletecalendar.php?NAME="+this.oName, false);
         
			var oDate;
//			var oData = {selectedDates:[]};
            console.log(oSelectedDates.length);
			if (oSelectedDates.length > 0 ) {
        
				for(oI=0; oI<oSelectedDates.length; oI++){
                    
                        oDate = oSelectedDates[oI].getStartDate();
                        console.log(this.oFormatYyyymmdd.format(oDate));     
                        oModel.loadData("http://localhost/MyUI5/JSON/adddata_calendar.php?NAME="+this.oName+"&CAL_DATE="+this.oFormatYyyymmdd.format(oDate), 'TRUE');
  
				}	
                MessageToast.show("Foster request submitted.", {
                        duration: 5000,                  // default
                        width: "15em",                   // default
                        my: "center",             // default
                        at: "center"             // default                   
                       
                    });
			} else {
				this._clearModel();
			}   
        },
        
		_clearModel: function() {
			var oData = {selectedDates:[]};
			this.oModel.setData(oData);
		}
	});

	return CalendarMultipleDaySelectionController;

});