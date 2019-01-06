function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function changePage(pageId) {
	var visible = document.getElementsByClassName("visible");
	if(visible.length > 0){
		visible[0].className = 'hidden page';
	}
	document.getElementById(pageId).className = "visible page";
	if(pageId != 'dashboard' && pageId != 'daybyday'){
		document.getElementById('tab1a').className = 'mdc-tab';
		document.getElementById('tab1b').className = 'mdc-tab-indicator';
		document.getElementById('tab2a').className = 'mdc-tab';
		document.getElementById('tab2b').className = 'mdc-tab-indicator';
	}
	setCookie('page', pageId, 0.1);
}
window.onload = function () {
	var page = getCookie('page');
	if(page){
		changePage(page);
		if(page == 'dashboard'){
			document.getElementById('tab1a').className = 'mdc-tab mdc-tab--active';
			document.getElementById('tab1b').className = 'mdc-tab-indicator mdc-tab-indicator--active';
		}
		if(page == 'daybyday'){
			document.getElementById('tab2a').className = 'mdc-tab mdc-tab--active';
			document.getElementById('tab2b').className = 'mdc-tab-indicator mdc-tab-indicator--active';
		}
	} else {
		changePage('dashboard');
	}
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
var buttons = document.querySelectorAll('.mdc-button');
for (var i = 0, button; button = buttons[i]; i++) {
  	mdc.ripple.MDCRipple.attachTo(button);
}
var cards = document.querySelectorAll('.mdc-ripple-upgraded');
for (var i = 0, card; card = cards[i]; i++) {
  	mdc.ripple.MDCRipple.attachTo(card);
}

document.addEventListener("touchstart", function(){}, true);