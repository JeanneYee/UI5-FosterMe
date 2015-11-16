jQuery.sap.declare("fish.foster.controls.BackgroundTile");  
sap.m.StandardTile.extend("fish.foster.controls.BackgroundTile", {  
  metadata: {  
       properties: {  
            "backgroundImage" : "sap.ui.core.uri"  ,
            "ID" : {type : "string",  defaultValue : 0},
            "longDescription" : "n/a",
            "info": {type : "string",  defaultValue : 0}
       }  
  },  
  renderer: "sap.m.StandardTileRenderer",  
  onAfterRendering: function(oEvent) {  
       // !!! important: we have to call the original onAfterRendering method to get the tiles placed properly !!!  
       sap.m.StandardTile.prototype.onAfterRendering.apply(this, arguments);  
       var oTile = oEvent.srcControl;  
       // get dom element and add style commands to display an background-image  
       var oDOMEl = document.getElementById(oTile.getId());  
      
       if (oDOMEl && this.getBackgroundImage()) {  
            oDOMEl.style.backgroundImage="url('" + this.getBackgroundImage() + "')";  
            oDOMEl.style.backgroundRepeat="no-repeat";  
            oDOMEl.style.backgroundSize = "200px 190px";  
           // oDOMEl.style.backgroundSize="contain"; // !!! CSS3 !!!      
       
       }  
  },  
  init: function() {  
       sap.m.StandardTile.prototype.init.apply(this, arguments);  
  }
});  
