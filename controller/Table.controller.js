sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("fish.foster.controller.Table", {
      onBeforeRendering : function () {

          
          
            // setting up table
             //   var oTable = this.byId("PageHolder");       
        //  document.write("asshole");
//              var oTable = new sap.ui.table.Table({
//                editable: false,
//                toolbar: new sap.ui.commons.Toolbar({ 
//                    items: [ 
//                        new sap.ui.commons.Button({
//                            text: "Create user", 
//                            press: function() {
//                                openCreateDialog();
//                            }, 
//                        }),
//                        new sap.ui.commons.Button({
//                            text: "Update user's data", 
//                            press: function() {
//                                var idx = oTable.getSelectedIndex();
//                                if (idx == -1) return;
//                                var rows = oTable.getRows();
//                                var user = rows[idx].getCells();
//                                openUpdateDialog(user);
//                            }, 
//                        }),
//                        new sap.ui.commons.Button({
//                            text: "Delete user", 
//                            press: function() {
//                                var idx = oTable.getSelectedIndex();
//                                if (idx == -1) return;
//                                var rows = oTable.getRows();
//                                var user = rows[idx].getCells();
//                                openDeleteDialog(user);
//                            }, 
//                        })				
//                    ]
//                }),
//            });          

          
//           oTable.addColumn(new sap.m.Column({
//            width : "1em",
//            header : new sap.m.Label({
//                text : "lastName"
//            })
//           }));
//
//           oTable.addColumn(new sap.m.Column({
//            width : "1em",
//            header : new sap.m.Label({
//                text : "firstName"
//            })
//           }));                 
//        
//           // oTable.setModel(this.getView().getModel());
//           
//           var oModel = new sap.ui.model.json.JSONModel();
//    var users = [];
//    for (var i = 0; i < 10; i++) {
//      users.push({lastName: 'lastName' + i,  firstName: 'firstName' + i});
//       
//    }
//    oModel.setData(users);
//          
//          oTable.setModel(oModel);
//          
//          oTable.bindItems("/", new sap.m.ColumnListItem({
//        cells : [ new sap.m.Text({
//          text : "{lastName}"
//        }), new sap.m.Text({
//          text : "{firstName}"
//        })] 
//      }));
          
         // oTable.placeAt("TableHolder");
          
//            oTable.bindItems("/TableHolder", new sap.m.ColumnListItem({
//                    cells : [ new sap.m.Text({
//                      text : "{UserSet/Email}"
//                    })]
//                  }));
        
//          this.byId("TableHolder") = oTable;
            //oTable.bindRows("/UserSet");
//            oTable.placeAt("TableHolder");  
         
      }
   });
});