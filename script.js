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
  		var cln = itm.cloneNode(true);
			cln.id = 'message' + (i + 1).toString();
  		var next = document.getElementsByClassName("mdc-top-app-bar--fixed-adjust")[0].appendChild(cln);
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
	percent: [],
	valid: [''],
	issued: [''],
	description: [''],
	type: [''],
};
for(var i = 0; i < rows.length; i++){
	data.percent[i] = [parseInt(rows[i][0].toString()), parseInt(rows[i][1].toString())];
	data.valid[i] = rows[i][2];
	data.issued[i] = rows[i][3];
	data.description[i] = rows[i][4];
	data.type[i] = rows[i][5];
}

displayData();

function hideKey(){
    document.getElementById("key-hide").style.display = "none"; 
    document.getElementById("arrow").outerHTML = '<button id="arrow" class="mdc-icon-button material-icons mdc-icon-toggle" onclick="showKey()">expand_more</button>';
}
function showKey(){
    document.getElementById("key-hide").style.display = "block";
    document.getElementById("arrow").outerHTML = '<button id="arrow" class="mdc-icon-button material-icons mdc-icon-toggle" onclick="hideKey()">expand_less</button>';
}

function toggleNWS(id){
    var desc = document.getElementById("NWS-alert" + id);
    if(desc.style.display == "none"){
        desc.style.display = "block";
    } else {
        desc.style.display = "none";
    }
}
$.get("https://api.weather.gov/alerts/active?status=actual&message_type=alert,update&zone=061515", function(data){
    if(data.features){
        if(data.features.length > 0){
            var NWScard = document.getElementById("NWS-card");
            NWScard.style.display = "inline-block";
            for(var i = 0; i < data.features.length; i++){
                var issued = new Date(data.features[i].properties.sent);
                if(data.features[i].properties.parameters.NWSheadline){
                    var description =  (data.features[i].properties.parameters.NWSheadline[0] + '<br><br>' + data.features[i].properties.description.replace(/(?:\r\n|\r|\n)/g, '<br>')).split('<br><br>').join('$doubleBreak').split('<br>').join(' ').split('$doubleBreak').join('<br><br>') + '<br><br>Issued on ' + issued.toLocaleDateString() + ' at ' + issued.toLocaleTimeString() + ' by the National Weather Service in' + data.features[i].properties.senderName.replace('NWS', '');
                } else {
                    var description =  data.features[i].properties.description.replace(/(?:\r\n|\r|\n)/g, '<br>').split('<br><br>').join('$doubleBreak').split('<br>').join(' ').split('$doubleBreak').join('<br><br>') + '<br><br>Issued on ' + issued.toLocaleDateString() + ' at ' + issued.toLocaleTimeString() + ' by the National Weather Service in' + data.features[i].properties.senderName.replace('NWS', '');
                }

                var background = "#26a69a";
                var severity = data.features[i].properties.severity;
                if(severity == 'Minor'){
                    background = "#2196f3";
                }
                if(severity == 'Moderate'){
                    background = "#5c6bc0";
                }

                if(severity == 'Severe'){
                    background = "#ec407a";
                }

                if(severity == 'Extreme'){
                    background = "#f44336";
                }
                NWScard.innerHTML = NWScard.innerHTML + '<div class="NWS-alert" style="background:' + background + ';">' + data.features[i].properties.event + '<button class="mdc-icon-button material-icons mdc-icon-toggle NWS-button" onclick="toggleNWS(' + i + ');">expand_more</button><div class="NWS-description" id="NWS-alert' + i + '">' + description + '</div></div>';
            }
        }
    }
});
