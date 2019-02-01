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
	var pageC = getCookie('page');
	if(visible.length > 0){
		visible[0].className = 'hidden page';
	}
	console.log(pageC);
	try {
		document.getElementById(pageId).className = "visible page";
	} catch(err) {
		changePage('page404');
	}
	if(pageId == 'dashboard' && pageC != 'daybyday'){
		document.getElementById('tab1a').className = 'mdc-tab mdc-tab--active';
		document.getElementById('tab1b').className = 'mdc-tab-indicator mdc-tab-indicator--active';
	} 
	if(pageId == 'daybyday' && pageC != 'dashboard'){
		document.getElementById('tab2a').className = 'mdc-tab mdc-tab--active';
		document.getElementById('tab2b').className = 'mdc-tab-indicator mdc-tab-indicator--active';
	}
	if(pageId != 'daybyday' && pageId != 'dashboard'){
		document.getElementById('tab2a').className = 'mdc-tab';
		document.getElementById('tab2b').className = 'mdc-tab-indicator';
		document.getElementById('tab1a').className = 'mdc-tab';
		document.getElementById('tab1b').className = 'mdc-tab-indicator';
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
var ripples = document.querySelectorAll('.mdc-ripple-upgraded');
for (var i = 0, ripple; ripple = ripples[i]; i++) {
  	mdc.ripple.MDCRipple.attachTo(ripple);
}

document.addEventListener("touchstart", function(){}, true);
window.addEventListener('resize', resize);

function resize() {
	var cards = document.getElementsByClassName('mdc-card');
	var collumns = Math.floor((window.innerWidth-14)/(315));
	for(var i = 0; i < cards.length; i++){
		cards[i].style.width = 'calc(' + (100/collumns).toString() + '% - ' + (14+2.4*(collumns-1)).toString() + 'px)';
	}
	var zipcard = document.getElementById('zipcode');
	zipcard.style.width = 'calc(100% - 14px)';
}
resize();
	
var key = {
	threats: ['None', 'Snow', 'Ice', 'Cold'],
	timings: ['', 'Day before', 'Night before', 'Morning', 'Midday', 'All day', 'Afternoon'],
	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	endings: ['', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st']
};
var data = {
	dayCount: 7,
	dailyDays: [3, 4, 0, 1, 2, 3, 4],
	dailyMonths: [0, 1, 1, 1, 1, 1, 1],
	dailyDates: [31, 1, 4, 5, 6, 7, 8],
	dailyPercents: [93, 15, 2, 4, 7, 11, 17],
	dailyThreats: [3, 3, 0, 0, 0, 1, 1],
	dailyTimings: [5, 3, 0, 0, 0, 0, 0],
	dailyConfidence: [10, 8, 9, 7, 7, 3, 1]
};

var chartConfig = {
 	type: "gauge",
 	globals: {
 	  fontSize: 0
 	},
 	plotarea:{
 	  marginTop: 15,
		marginRight: 15,
		marginLeft: 15,
		marginBottom: 0
 	},
 	plot:{
 	  size:'100%',
 	  valueBox: {
 	    placement: 'center',
 	    text:'%v', //default
 	    fontSize: 20,
			fontColor: '#212121',
 	    rules:[]
 	  }
 	},
  tooltip:{
    borderRadius:1
  },
 	scaleR:{
	  aperture: 180,
	  minValue: 0,
	  maxValue: 100,
	  step: 1,
	  center:{
	    visible: true,
			size: 23,
      backgroundColor: "#FAFAFA",
      borderColor: "#43A047"
	  },
	  tick:{
	    visible: false
	  },
	  ring:{
	    size: 60,
	    rules: [
	      {
	        rule:'%v >= 90',
	        backgroundColor:'#FF7043'
	      },
				{
	        rule:'%v <= 90 && %v > 70',
	        backgroundColor:'#FFA726'
	      },
	      {
	        rule:'%v <= 70 && %v > 50',
	        backgroundColor:'#FFCA28'
	      },
				{
	        rule:'%v <= 50 && %v > 30',
	        backgroundColor:'#FFEE58'
	      },
	      {
	        rule:'%v <= 30 && %v > 10',
	        backgroundColor:'#D4E157'
	      },
	      {
	        rule:'%v <= 10',
	        backgroundColor:'#9CCC65'
	      }      
	    ]
	  }
 	},
	series: [
		{
			values: ['--'], // starting value
			backgroundColor: '#9E9E9E #263238',
	    indicator: [30,1,60,0,0],
		}
	]
};
for(var i = 0; i < data.dailyPercents.length; i++){
	chartConfig.series[0].values[0] = data.dailyPercents[i];
	chartConfig.scaleR.center.borderColor = '#7CB342';
	if(data.dailyPercents[i] >= 90){
		 chartConfig.scaleR.center.borderColor = '#F4511E';
	}
	else if(data.dailyPercents[i] >= 70){
		 chartConfig.scaleR.center.borderColor = '#FB8C00';
	}
	else if(data.dailyPercents[i] >= 50){
		 chartConfig.scaleR.center.borderColor = '#FFB300';
	}
	else if(data.dailyPercents[i] >= 30){
		 chartConfig.scaleR.center.borderColor = '#FDD835';
	}
	else if(data.dailyPercents[i] >= 10){
		 chartConfig.scaleR.center.borderColor = '#C0CA33';
	}
	zingchart.render({ 
		id : 'day' + (i+1).toString() + 'chart', 
		data : chartConfig, 
		height: '100%', 
		width: '100%'
	});
	
	var card = document.getElementById('day' + (i+1).toString() + 'card').getElementsByClassName('card-content')[0];
	card.getElementsByClassName('card-title')[0].innerHTML = key.days[data.dailyDays[i]] + ', ' + key.months[data.dailyMonths[i]] + ' ' + data.dailyDates[i] + key.endings[data.dailyDates[i]];
	card.getElementsByClassName('percent')[0].innerHTML = data.dailyPercents[i] + '%';
	card.getElementsByClassName('threat')[0].innerHTML = key.threats[data.dailyThreats[i]];
	if(data.dailyTimings[i] > 0){
		card.getElementsByClassName('timing')[0].innerHTML = key.timings[data.dailyTimings[i]];
	} else {
		card.getElementsByClassName('timing')[0].parentNode.removeChild(card.getElementsByClassName('timing')[0]);
		card.getElementsByClassName('timing-label')[0].parentNode.removeChild(card.getElementsByClassName('timing-label')[0]);
	}
	card.getElementsByClassName('confidence')[0].innerHTML = data.dailyConfidence[i] + '/10';
}