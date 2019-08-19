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
	setCookie('page', pageId, 0.1);
}
window.onload = function () {
	var page = getCookie('page');
	if(page){
		changePage(page);
	} else {
		changePage('daybyday');
	}
}

var bars = document.querySelectorAll('.mdc-top-app-bar');
for (var i = 0, bar; bar = bars[i]; i++) {
		mdc.topAppBar.MDCTopAppBar.attachTo(bar);
}
var buttons = document.querySelectorAll('.mdc-button');
for (var i = 0, button; button = buttons[i]; i++) {
  	mdc.ripple.MDCRipple.attachTo(button);
}
var ripples = document.querySelectorAll('.mdc-ripple-upgraded');
for (var i = 0, ripple; ripple = ripples[i]; i++) {
  	mdc.ripple.MDCRipple.attachTo(ripple);
}
var snackbars = document.querySelectorAll('.mdc-snackbar');
for (var i = 0, snackbar; snackbar = snackbars[i]; i++) {
  	mdc.snackbar.MDCSnackbar.attachTo(snackbar);
}

document.addEventListener("touchstart", function(){}, true);
window.addEventListener('resize', resize);

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
function displayData() {
	if(data.count == 0){
		$('#nomessage').css('display', 'inline-block');
	}
	if(data.count > 1){
		for(var i = 1; i < data.count; i++){
			var itm = document.getElementById("message1");
			console.log(itm);
  		var cln = itm.cloneNode(true);
			cln.id = 'message' + (i + 1).toString();
  		var next = document.getElementById("daybyday-wrapper").appendChild(cln);
			$('#message'+(i+1).toString()+' > .card-content > .card-media > #1chart1').attr("id", (i+1).toString() + 'chart1');
			$('#message'+(i+1).toString()+' > .card-content > .card-media > #1chart2').attr("id", (i+1).toString() + 'chart2');
		}
	}
	if(data.count > 0){
		$('#message1').css('display', 'inline-block');
		for(var i = 0; i < data.count; i++){
			$('#message' + (i+1).toString() + ' > .card-content > .status-title').attr('class', 'status-title ' + data.type[i].toLowerCase() + '-title').html(data.type[i]);
			$('#message' + (i+1).toString() + ' > .card-content > .card-title').html(data.valid[i]);
			$('#message' + (i+1).toString() + ' > .card-content > .status-timing').html(data.issued[i]);
			$('#message' + (i+1).toString() + ' > .card-content > .stat-description').html(data.description[i]);
		}
	}
	for(var i = 0; i < data.percent.length; i++){
		for(var j = 0; j < data.percent[i].length; j++){
			chartConfig.series[0].values[0] = data.percent[i][j];
			chartConfig.scaleR.center.borderColor = '#7CB342';
			if(data.percent[i][j] >= 90){
				 chartConfig.scaleR.center.borderColor = '#F4511E';
			}
			else if(data.percent[i][j] >= 70){
				 chartConfig.scaleR.center.borderColor = '#FB8C00';
			}
			else if(data.percent[i][j] >= 50){
				 chartConfig.scaleR.center.borderColor = '#FFB300';
			}
			else if(data.percent[i][j] >= 30){
				 chartConfig.scaleR.center.borderColor = '#FDD835';
			}
			else if(data.percent[i][j] >= 10){
				 chartConfig.scaleR.center.borderColor = '#C0CA33';
			}
			zingchart.render({ 
				id : (i+1).toString() + 'chart' + (j+1).toString(), 
				data : chartConfig, 
				height: '100%', 
				width: '100%'
			});
		}
	}
}

var data = {
	count: rows.length,
	percent: [[],[]],
	valid: [''],
	issued: [''],
	description: [''],
	type: [''],
};
for(var i = 0; i < rows.length; i++){
	data.percent[i][0] = parseInt(rows[i][0].toString());
	data.percent[i][1] = parseInt(rows[i][1].toString());
	data.valid[i] = rows[i][2];
	data.issued[i] = rows[i][3];
	data.description[i] = rows[i][4];
	data.type[i] = rows[i][5];
}
displayData();

function resize() {
	var cards = document.getElementsByClassName('mdc-card');
	var collumns = Math.min(Math.floor((window.innerWidth-14)/(315)), data.count);
	for(var i = 0; i < cards.length; i++){
		cards[i].style.width = 'calc(' + (100/collumns).toString() + '% - ' + (14+2.4*(collumns-1)).toString() + 'px)';
	}
	var zipcard = document.getElementById('zipcode');
	zipcard.style.width = 'calc(100% - 14px)';
}
resize();

function dismissSnack(){
	$('.mdc-snackbar').attr('class', 'mdc-snackbar mdc-snackbar--closing');
}
function copyLink() {
	var $input = $('#copy');
	if(navigator.userAgent.match(/ipad|ipod|iphone/i)) {
		$('.mdc-snackbar__label').html('Click the share button below to share.');
	} else {
		$input.select();
	}
	document.execCommand('copy');
	$input.blur();
	$('.mdc-snackbar').attr('class', 'mdc-snackbar mdc-snackbar--open');
	setTimeout(dismissSnack, 6000);
}
