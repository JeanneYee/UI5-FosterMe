jQuery.sap.declare("fish.foster.controls.Row");  
sap.m.StandardTile.extend("fish.foster.controls.Row", {  


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
  init: function() {  
       
      
  }
});  
