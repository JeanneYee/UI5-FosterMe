sap.ui.define([], function () {
	"use strict";
	return {
		statusColor: function (sStatus) {
			
			switch (sStatus) {
				case "PENDING CONFIRMATION":
					return "red";
				case "VACANT":
					return "grey";
				case "CONFIRMED":
					return "green";
				default:
					return sStatus;
			}
		}
	};
});
