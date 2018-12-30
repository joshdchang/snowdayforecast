function tab1(){
	var tab1 = document.getElementById("page1");
	tab1.className = "visible";
	var tab2 = document.getElementById("page2");
	tab2.className = "hidden";
}
function tab2(){
	var tab1 = document.getElementById("page1");
	tab1.className = "hidden";
	var tab2 = document.getElementById("page2");
	tab2.className = "visible";
}

function warningOpening() {
	document.getElementById("alert-dialog").className = "mdc-dialog mdc-dialog--opening";
	setTimeout(warningOpen, 1);
}
function warningOpen() {
	document.getElementById("alert-dialog").className = "mdc-dialog mdc-dialog--open";
}
function warningClosing() {
	document.getElementById("alert-dialog").className = "mdc-dialog mdc-dialog--closing";
	setTimeout(warningClosed, 300);
}
function warningClosed() {
	document.getElementById("alert-dialog").className = "mdc-dialog mdc-dialog--closed";
}

var dialogs = document.querySelectorAll('.mdc-dialog');
for (var i = 0, dialog; dialog = dialogs[i]; i++) {
  mdc.dialog.MDCDialog.attachTo(dialog);
}
var nodes = document.querySelectorAll('.mdc-icon-toggle');
for (var i = 0, node; node = nodes[i]; i++) {
  mdc.iconToggle.MDCIconToggle.attachTo(node);
}
var bars = document.querySelectorAll('.mdc-top-app-bar');
for (var i = 0, bar; bar = bars[i]; i++) {
	mdc.topAppBar.MDCTopAppBar.attachTo(bar);
}
var tabs = document.querySelectorAll('.mdc-tab-bar');
for (var i = 0, tab; tab = tabs[i]; i++) {
	mdc.tabBar.MDCTabBar.attachTo(tab);
}

document.addEventListener("touchstart", function(){}, true);
