
// Current conditions card
async function loadObservations() {

	var res = await fetch('https://forecast.weather.gov/MapClick.php?lat=41.037715&lon=-73.865165&FcstType=json')
	var data = await res.json()

	var obs = data.currentobservation;
	var iconBase = 'https://forecast.weather.gov/newimages/large/';

	document.getElementById('weather-icon').src = iconBase + obs.Weatherimage;
	document.getElementById('weather-desc').textContent = obs.Weather;
	document.getElementById('weather-temp').textContent = obs.Temp + ' °F';
	document.getElementById('weather-wind').textContent = obs.Winds + ' mph';
	document.getElementById('weather-humid').textContent = obs.Relh + '%';
}
loadObservations()

// Government alerts card
async function loadAlerts() {

	var zone = 'NYZ070'

	var res = await fetch('https://api.weather.gov/alerts/active?status=actual&message_type=alert,update&zone=' + zone)
	var data = await res.json()

	if (data.features) {
		if (data.features.length > 0) {
			document.getElementById('alert-card').style.display = 'block'

			var alerts = document.getElementById('alerts')
			alerts.style.display = 'inline-block'
			for (var i = 0; i < data.features.length; i++) {

				var issued = new Date(data.features[i].properties.sent)

				var description = data.features[i].properties.description.replace(/(?:\r\n|\r|\n)/g, '<br>').split('<br><br>').join('$doubleBreak').split('<br>').join(' ').split('$doubleBreak').join('<br><br>') + '<br><br><b>Issued on ' + issued.toLocaleDateString() + ' at ' + issued.toLocaleTimeString().split(':00 ').join(' ') + '</b>'
				if (data.features[i].properties.parameters.NWSheadline) {
					var description = '<b>' + data.features[i].properties.parameters.NWSheadline[0] + '</b><br><br>' + description
				}

				var background = '#26a69a'
				var severity = data.features[i].properties.severity
				if (severity === 'Minor') {
					background = '#2196f3'
				}
				if (severity === 'Moderate') {
					background = '#5c6bc0'
				}
				if (severity === 'Severe') {
					background = '#ec407a'
				}
				if (severity === 'Extreme') {
					background = '#f44336'
				}

				alerts.innerHTML += `<div class='alert' onclick='toggleAlert(${i});' style='background: ${background};'><div class='alert-title'>${data.features[i].properties.event}</div><div class='alert-button'><span class='material-icons alert-icon' id='alert-icon${i}'>arrow_drop_down_circle</span></div><div class='alert-description' style='display: none;' id='alert${i}'>${description}</div></div>`
			}
		}
	}
}
function toggleAlert(id) {
	var desc = document.getElementById('alert' + id)
	var icon = document.getElementById('alert-icon' + id)
	console.log(desc.style.display)
	if (desc.style.display === 'none') {
		desc.style.display = 'block'
		icon.innerText = 'cancel'
	} else {
		desc.style.display = 'none'
		icon.innerText = 'arrow_drop_down_circle'
	}
}
loadAlerts()

// Snow day model
async function loadModel() {

	var res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRoSZHR2C_TEB_B7LmYZmyUmJsv5tl_84WLHIw29yp6AJwaYFyaktFDkH8xlrBFkTXZrLT7e_eHTtC8/pub?output=csv')
	var csv = await res.text()
	var rows = csv.split('\n')
	var latest = rows[rows.length - 1]
	var columns = latest.split('z,')

	var days = JSON.parse(columns[1].split('""').join('"').split('"[{').join('[{').split('}]"').join('}]'))
	
	var daysContainer = document.getElementById('days')
	for (const day of days) {
		if (day.dayName !== 'Sat' && day.dayName !== 'Sun') {
			let date = new Date(day.date)
			daysContainer.innerHTML += `
			<div class='day'>
				<div class='day-name'>${day.dayName}, ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}</div>
				<div class='day-chance'>${Math.round(day.chance * 10) / 10}%</div>
				<div class='day-chart'>
					<div class='day-bar' style='width: ${day.chance}%;'></div>
				</div>
			</div>`
		}
	}

}
loadModel()

// Update year
document.getElementById('year').innerText = new Date().getFullYear()