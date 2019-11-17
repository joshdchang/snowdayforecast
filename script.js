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
	plotarea: {
		marginTop: 15,
		marginRight: 15,
		marginLeft: 15,
		marginBottom: 0
	},
	plot: {
		size: '100%',
		valueBox: {
			placement: 'center',
			text: '%v', //default
			fontSize: 20,
			fontColor: '#212121',
			rules: []
		}
	},
	tooltip: {
		borderRadius: 1
	},
	scaleR: {
		aperture: 180,
		minValue: 0,
		maxValue: 100,
		step: 1,
		center: {
			visible: true,
			size: 23,
			backgroundColor: "#FAFAFA",
			borderColor: "#43A047"
		},
		tick: {
			visible: false
		},
		ring: {
			size: 60,
			rules: [{
					rule: '%v >= 90',
					backgroundColor: '#FF7043'
				},
				{
					rule: '%v <= 90 && %v > 70',
					backgroundColor: '#FFA726'
				},
				{
					rule: '%v <= 70 && %v > 50',
					backgroundColor: '#FFCA28'
				},
				{
					rule: '%v <= 50 && %v > 30',
					backgroundColor: '#FFEE58'
				},
				{
					rule: '%v <= 30 && %v > 10',
					backgroundColor: '#D4E157'
				},
				{
					rule: '%v <= 10',
					backgroundColor: '#9CCC65'
				}
			]
		}
	},
	series: [{
		values: ['--'], // starting value
		backgroundColor: '#9E9E9E #263238',
		indicator: [30, 1, 60, 0, 0],
	}]
};

function displayData() {
	if (data.count == 0) {
		$('#nomessage').css('display', 'inline-block');
	}
	if (data.count > 1) {
		for (var i = 1; i < data.count; i++) {
			var itm = document.getElementById("message1");
			var cln = itm.cloneNode(true);
			cln.id = 'message' + (i + 1).toString();
			var next = document.getElementsByClassName("mdc-top-app-bar--fixed-adjust")[0].appendChild(cln);
			$('#message' + (i + 1).toString() + ' > .card-content > .card-media > #1chart1').attr("id", (i + 1).toString() + 'chart1');
			$('#message' + (i + 1).toString() + ' > .card-content > .card-media > #1chart2').attr("id", (i + 1).toString() + 'chart2');
		}
	}
	if (data.count > 0) {
        $('#key-card').css('display', 'inline-block')
		$('#message1').css('display', 'inline-block');
		for (var i = 0; i < data.count; i++) {
			$('#message' + (i + 1).toString() + ' > .card-content > .status-title').attr('class', 'status-title ' + data.type[i].toLowerCase() + '-title').html(data.type[i]);
			$('#message' + (i + 1).toString() + ' > .card-content > .card-title').html(data.valid[i]);
			$('#message' + (i + 1).toString() + ' > .card-content > .status-timing').html(data.issued[i]);
			$('#message' + (i + 1).toString() + ' > .card-content > .stat-description').html(data.description[i]);
		}
	}
	for (var i = 0; i < data.percent.length; i++) {
		for (var j = 0; j < data.percent[i].length; j++) {
			chartConfig.series[0].values[0] = data.percent[i][j];
			chartConfig.scaleR.center.borderColor = '#7CB342';
			if (data.percent[i][j] >= 90) {
				chartConfig.scaleR.center.borderColor = '#F4511E';
			} else if (data.percent[i][j] >= 70) {
				chartConfig.scaleR.center.borderColor = '#FB8C00';
			} else if (data.percent[i][j] >= 50) {
				chartConfig.scaleR.center.borderColor = '#FFB300';
			} else if (data.percent[i][j] >= 30) {
				chartConfig.scaleR.center.borderColor = '#FDD835';
			} else if (data.percent[i][j] >= 10) {
				chartConfig.scaleR.center.borderColor = '#C0CA33';
			}
			zingchart.render({
				id: (i + 1).toString() + 'chart' + (j + 1).toString(),
				data: chartConfig,
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
for (var i = 0; i < rows.length; i++) {
	data.percent[i] = [parseInt(rows[i][0].toString()), parseInt(rows[i][1].toString())];
	data.valid[i] = rows[i][2];
	data.issued[i] = rows[i][3];
	data.description[i] = rows[i][4];
	data.type[i] = rows[i][5];
}

displayData();

function hideKey() {
	document.getElementById("key-hide").style.display = "none";
	document.getElementById("arrow").outerHTML = '<button id="arrow" class="mdc-icon-button material-icons mdc-icon-toggle" onclick="showKey()">expand_more</button>';
}

function showKey() {
	document.getElementById("key-hide").style.display = "block";
	document.getElementById("arrow").outerHTML = '<button id="arrow" class="mdc-icon-button material-icons mdc-icon-toggle" onclick="hideKey()">expand_less</button>';
}

function toggleNWS(id) {
	var desc = document.getElementById("NWS-alert" + id);
	if (desc.style.display == "none") {
		desc.style.display = "block";
	} else {
		desc.style.display = "none";
	}
}
$.get("https://api.weather.gov/alerts/active?status=actual&message_type=alert,update&zone=NYZ070", function(data) {
	if (data.features) {
		if (data.features.length > 0) {
			var NWScard = document.getElementById("NWS-card");
			NWScard.style.display = "inline-block";
			for (var i = 0; i < data.features.length; i++) {
				var issued = new Date(data.features[i].properties.sent);
				if (data.features[i].properties.parameters.NWSheadline) {
					var description = (data.features[i].properties.parameters.NWSheadline[0] + '<br><br>' + data.features[i].properties.description.replace(/(?:\r\n|\r|\n)/g, '<br>')).split('<br><br>').join('$doubleBreak').split('<br>').join(' ').split('$doubleBreak').join('<br><br>') + '<br><br>Issued on ' + issued.toLocaleDateString() + ' at ' + issued.toLocaleTimeString() + ' by the National Weather Service in' + data.features[i].properties.senderName.replace('NWS', '');
				} else {
					var description = data.features[i].properties.description.replace(/(?:\r\n|\r|\n)/g, '<br>').split('<br><br>').join('$doubleBreak').split('<br>').join(' ').split('$doubleBreak').join('<br><br>') + '<br><br>Issued on ' + issued.toLocaleDateString() + ' at ' + issued.toLocaleTimeString() + ' by the National Weather Service in' + data.features[i].properties.senderName.replace('NWS', '');
				}

				var background = "#26a69a";
				var severity = data.features[i].properties.severity;
				if (severity == 'Minor') {
					background = "#2196f3";
				}
				if (severity == 'Moderate') {
					background = "#5c6bc0";
				}

				if (severity == 'Severe') {
					background = "#ec407a";
				}

				if (severity == 'Extreme') {
					background = "#f44336";
				}
				NWScard.innerHTML = NWScard.innerHTML + '<div class="NWS-alert" style="background:' + background + ';">' + data.features[i].properties.event + '<button class="mdc-icon-button material-icons mdc-icon-toggle NWS-button" onclick="toggleNWS(' + i + ');">expand_more</button><div class="NWS-description" id="NWS-alert' + i + '">' + description + '</div></div>';
			}
		}
	}
});

var imageKey = {
    day: {
        clear: {
            dry: {
                calm: {
                    icon: '2PACX-1vQ48L11H8Pn0MmptSgmtukwx0fItoqoGNekb-j8oEhXRfpFobTt6GU9eWCiAioRFzOt6QKWcUrk6nbM',
                    desc: 'Sunny'
                },
                wind: {
                    icon: '2PACX-1vRj0eF3cXTWyzZrQUo-0MIw5-7wRlJ3BcUrGj1FYQHa6pGv3gvq-RPftX-w8SHRqGLP58zgdOuCnFJo',
                    desc: 'Windy'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vRCMEKhH6tHZ43CyUazK1m4_yMVp6UC1oMMUBfA3rynIBcheZb8i3-an8yPf8VQW2nomrtJJ9m7-Ph-',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vRCMEKhH6tHZ43CyUazK1m4_yMVp6UC1oMMUBfA3rynIBcheZb8i3-an8yPf8VQW2nomrtJJ9m7-Ph-',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vTJcqHM6IGsiD1NBYfYJ71NHuk3qzgkMmgtbJTW228tDQH81NEfgz2Ls5v4D0xCFuQQe7nrajIOrHZg',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vTJcqHM6IGsiD1NBYfYJ71NHuk3qzgkMmgtbJTW228tDQH81NEfgz2Ls5v4D0xCFuQQe7nrajIOrHZg',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vToqCEJWU_qwCU-4Qv7V-_vuO_1ENDsd1TtdU_VA-WOBsv7fJktNUyln2VPz-t1C3aElj0H5Pzh0BCU',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vToqCEJWU_qwCU-4Qv7V-_vuO_1ENDsd1TtdU_VA-WOBsv7fJktNUyln2VPz-t1C3aElj0H5Pzh0BCU',
                    desc: 'Thunder/Wind'
                }
            }
        },
        partly: {
            dry: {
                calm: {
                    icon: '2PACX-1vTzudNWiqFHn9No0DLYSmmG5wJUvPBCr-fYNTynU8bHeRLgz4wPnTD32o-HlmNhjZC33x6NvRfRUd-n',
                    desc: 'Partly Cloudy'
                },
                wind: {
                    icon: '2PACX-1vSDmm9nH-mxroyJjcHltykoqlxVFH7a-5EjQYJkqJgPAnd25h6P6YkYgDrrl91LcVj2XibVXAKIFPsg',
                    desc: 'Partly Cloudy/Wind'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vRCMEKhH6tHZ43CyUazK1m4_yMVp6UC1oMMUBfA3rynIBcheZb8i3-an8yPf8VQW2nomrtJJ9m7-Ph-',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vRCMEKhH6tHZ43CyUazK1m4_yMVp6UC1oMMUBfA3rynIBcheZb8i3-an8yPf8VQW2nomrtJJ9m7-Ph-',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vTJcqHM6IGsiD1NBYfYJ71NHuk3qzgkMmgtbJTW228tDQH81NEfgz2Ls5v4D0xCFuQQe7nrajIOrHZg',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vTJcqHM6IGsiD1NBYfYJ71NHuk3qzgkMmgtbJTW228tDQH81NEfgz2Ls5v4D0xCFuQQe7nrajIOrHZg',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vToqCEJWU_qwCU-4Qv7V-_vuO_1ENDsd1TtdU_VA-WOBsv7fJktNUyln2VPz-t1C3aElj0H5Pzh0BCU',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vToqCEJWU_qwCU-4Qv7V-_vuO_1ENDsd1TtdU_VA-WOBsv7fJktNUyln2VPz-t1C3aElj0H5Pzh0BCU',
                    desc: 'Thunder/Wind'
                }
            }
        },
        mostly: {
            dry: {
                calm: {
                    icon: '2PACX-1vTzudNWiqFHn9No0DLYSmmG5wJUvPBCr-fYNTynU8bHeRLgz4wPnTD32o-HlmNhjZC33x6NvRfRUd-n',
                    desc: 'Mostly Cloudy'
                },
                wind: {
                    icon: '2PACX-1vSDmm9nH-mxroyJjcHltykoqlxVFH7a-5EjQYJkqJgPAnd25h6P6YkYgDrrl91LcVj2XibVXAKIFPsg',
                    desc: 'Mostly Cloudy/Wind'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vRCMEKhH6tHZ43CyUazK1m4_yMVp6UC1oMMUBfA3rynIBcheZb8i3-an8yPf8VQW2nomrtJJ9m7-Ph-',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vRCMEKhH6tHZ43CyUazK1m4_yMVp6UC1oMMUBfA3rynIBcheZb8i3-an8yPf8VQW2nomrtJJ9m7-Ph-',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vTJcqHM6IGsiD1NBYfYJ71NHuk3qzgkMmgtbJTW228tDQH81NEfgz2Ls5v4D0xCFuQQe7nrajIOrHZg',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vTJcqHM6IGsiD1NBYfYJ71NHuk3qzgkMmgtbJTW228tDQH81NEfgz2Ls5v4D0xCFuQQe7nrajIOrHZg',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vToqCEJWU_qwCU-4Qv7V-_vuO_1ENDsd1TtdU_VA-WOBsv7fJktNUyln2VPz-t1C3aElj0H5Pzh0BCU',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vToqCEJWU_qwCU-4Qv7V-_vuO_1ENDsd1TtdU_VA-WOBsv7fJktNUyln2VPz-t1C3aElj0H5Pzh0BCU',
                    desc: 'Thunder/Wind'
                }
            }
        },
        cloudy: {
            dry: {
                calm: {
                    icon: '2PACX-1vTDV4JGRqiTcxE5dSEt7_SW33H6i7m7Qv2c7ISw4gaMEEbWe6pOj3E2MNSjiTu5lxN1AcSxkrDFtEhD',
                    desc: 'Cloudy'
                },
                wind: {
                    icon: '2PACX-1vQusSDDz8Mws3NIrkVm3j4QTBlCiufOz4WWFbkdM18aext8ZXMsVnztzSe5HDV9kPr72M2MnJoAKBoo',
                    desc: 'Cloudy/Wind'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vRR8AvpeyCDV-12aHaB4qXEBTpDzn9GGpXP_T3WjkXjimQYKTq8KYK-vtAMjIIdpXalcPPTmErPq6ke',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vRR8AvpeyCDV-12aHaB4qXEBTpDzn9GGpXP_T3WjkXjimQYKTq8KYK-vtAMjIIdpXalcPPTmErPq6ke',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vTGxkPfxhLRRuAl_etKmffOOj7UT2_rY4j80fsJxe0sD5qtrIk_Qxs2DmDG3qgm8OX-_MXkPOd-inJj',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vTGxkPfxhLRRuAl_etKmffOOj7UT2_rY4j80fsJxe0sD5qtrIk_Qxs2DmDG3qgm8OX-_MXkPOd-inJj',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vQwcD3j901Mz3jd4Kr6mGc7_cgjkLT7bcKRd9QSHAW59LdvY5-VCk84Ryb67OWAu7Y51E-KNntmOOON',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vQwcD3j901Mz3jd4Kr6mGc7_cgjkLT7bcKRd9QSHAW59LdvY5-VCk84Ryb67OWAu7Y51E-KNntmOOON',
                    desc: 'Thunder/Wind'
                }
            }
        },
        fog: {
            icon: '2PACX-1vRj0eF3cXTWyzZrQUo-0MIw5-7wRlJ3BcUrGj1FYQHa6pGv3gvq-RPftX-w8SHRqGLP58zgdOuCnFJo',
            desc: 'Fog'
        }
    }, 
    night: {
        clear: {
            dry: {
                calm: {
                    icon: '2PACX-1vTdCR0N_TYl1Ze7OK0eXHwdNZh4pbTk67UW_b8o2NpxV-i90jxX8_H5s2vlzV_q5pWX6TXv1HZFAKeH',
                    desc: 'Clear'
                },
                wind: {
                    icon: '2PACX-1vTTvSp69vHyWJDU28uNXB9-yu4mvTM07qzUysAd-p5jcKaq_9kIHZd2Pej7Z0HjAQ9my-czSv_LeztS',
                    desc: 'Windy'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vSLxyMdVqmgVrwHYThVxf8IUwPzuqbezNUdF9V0c52GI22xp4QRF3zvCqWXI--bOWMDs4wC0N_SbkFJ',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vSLxyMdVqmgVrwHYThVxf8IUwPzuqbezNUdF9V0c52GI22xp4QRF3zvCqWXI--bOWMDs4wC0N_SbkFJ',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vSeJy5F-tlQV3BoG8cOjX1HDE2CgWHdu4yXblPR4DloLgaYi2f5W5oNGlDFhUizo538kKI1hfQ_9YmR',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vSeJy5F-tlQV3BoG8cOjX1HDE2CgWHdu4yXblPR4DloLgaYi2f5W5oNGlDFhUizo538kKI1hfQ_9YmR',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vQNIp40-C8Q81u3GL-egixp_63CRNU19XKOXx0gG-4ISVa4ipUOYcFsmdYn8BnqTPmdfwPIZwwD_SLc',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vQNIp40-C8Q81u3GL-egixp_63CRNU19XKOXx0gG-4ISVa4ipUOYcFsmdYn8BnqTPmdfwPIZwwD_SLc',
                    desc: 'Thunder/Wind'
                }
            }
        },
        mostly: {
            dry: {
                calm: {
                    icon: '2PACX-1vQjqUmwQTsS_h_kzPegWNKErpaj79q4jJ5iSawWaolQ719F9KwoScn_6rpxAG4UK0OHKpO1UBbUNqR6',
                    desc: 'Partly Cloudy'
                },
                wind: {
                    icon: '2PACX-1vQgQJovemMEBY5bosZHBGvFEvJDoYjmQlbDeRospDt9p82LOxP4UCsYIg4QSxeVgidaaWLI92E3aNDJ',
                    desc: 'Partly Cloudy/Wind'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vSLxyMdVqmgVrwHYThVxf8IUwPzuqbezNUdF9V0c52GI22xp4QRF3zvCqWXI--bOWMDs4wC0N_SbkFJ',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vSLxyMdVqmgVrwHYThVxf8IUwPzuqbezNUdF9V0c52GI22xp4QRF3zvCqWXI--bOWMDs4wC0N_SbkFJ',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vSeJy5F-tlQV3BoG8cOjX1HDE2CgWHdu4yXblPR4DloLgaYi2f5W5oNGlDFhUizo538kKI1hfQ_9YmR',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vSeJy5F-tlQV3BoG8cOjX1HDE2CgWHdu4yXblPR4DloLgaYi2f5W5oNGlDFhUizo538kKI1hfQ_9YmR',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vQNIp40-C8Q81u3GL-egixp_63CRNU19XKOXx0gG-4ISVa4ipUOYcFsmdYn8BnqTPmdfwPIZwwD_SLc',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vQNIp40-C8Q81u3GL-egixp_63CRNU19XKOXx0gG-4ISVa4ipUOYcFsmdYn8BnqTPmdfwPIZwwD_SLc',
                    desc: 'Thunder/Wind'
                }
            }
        },
        mostly: {
            dry: {
                calm: {
                    icon: '2PACX-1vQjqUmwQTsS_h_kzPegWNKErpaj79q4jJ5iSawWaolQ719F9KwoScn_6rpxAG4UK0OHKpO1UBbUNqR6',
                    desc: 'Mostly Cloudy'
                },
                wind: {
                    icon: '2PACX-1vQgQJovemMEBY5bosZHBGvFEvJDoYjmQlbDeRospDt9p82LOxP4UCsYIg4QSxeVgidaaWLI92E3aNDJ',
                    desc: 'Mostly Cloudy/Wind'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vSLxyMdVqmgVrwHYThVxf8IUwPzuqbezNUdF9V0c52GI22xp4QRF3zvCqWXI--bOWMDs4wC0N_SbkFJ',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vSLxyMdVqmgVrwHYThVxf8IUwPzuqbezNUdF9V0c52GI22xp4QRF3zvCqWXI--bOWMDs4wC0N_SbkFJ',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vSeJy5F-tlQV3BoG8cOjX1HDE2CgWHdu4yXblPR4DloLgaYi2f5W5oNGlDFhUizo538kKI1hfQ_9YmR',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vSeJy5F-tlQV3BoG8cOjX1HDE2CgWHdu4yXblPR4DloLgaYi2f5W5oNGlDFhUizo538kKI1hfQ_9YmR',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vQNIp40-C8Q81u3GL-egixp_63CRNU19XKOXx0gG-4ISVa4ipUOYcFsmdYn8BnqTPmdfwPIZwwD_SLc',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vQNIp40-C8Q81u3GL-egixp_63CRNU19XKOXx0gG-4ISVa4ipUOYcFsmdYn8BnqTPmdfwPIZwwD_SLc',
                    desc: 'Thunder/Wind'
                }
            }
        },
        cloudy: {
            dry: {
                calm: {
                    icon: '2PACX-1vRDYLf9nnXIr7Q_mE0-HmITHkqhixI58lxtz2Lh1bQnLjfu70OX-NbykL_aSzouJBJg-6qFqNn2pw3w',
                    desc: 'Cloudy'
                },
                wind: {
                    icon: '2PACX-1vRO-ql-s5MaKe5uWOG80sMumSA0hCPqmmpFCXrMDulVXbopebYLk-rficgv5h2qFfkG09e4whcHMSRc',
                    desc: 'Cloudy/Wind'
                }
            },
            snow: {
                calm: {
                    icon: '2PACX-1vShiMInWuxlLp50aFSlSveu3jogcpeGvIMEl2kLElCyZ0y2XyrbTjVmi5t7h0DWG2g4EaLsU2yhDL5c',
                    desc: 'Snow'
                },
                wind: {
                    icon: '2PACX-1vShiMInWuxlLp50aFSlSveu3jogcpeGvIMEl2kLElCyZ0y2XyrbTjVmi5t7h0DWG2g4EaLsU2yhDL5c',
                    desc: 'Snow/Wind'
                }
            },
            rain: {
                calm: {
                    icon: '2PACX-1vQxmdlQ59DyG5WRt_cTvcOC8JfvVDv0Mxr-v2aAqvc8gGq-Gdpcl36XxXLw2pRVoLRMxkAX_eXekjwR',
                    desc: 'Rain'
                },
                wind: {
                    icon: '2PACX-1vQxmdlQ59DyG5WRt_cTvcOC8JfvVDv0Mxr-v2aAqvc8gGq-Gdpcl36XxXLw2pRVoLRMxkAX_eXekjwR',
                    desc: 'Rain/Wind'
                }
            },
            thunder: {
                calm: {
                    icon: '2PACX-1vRNyBNAVhI1oq-aVe4pV_e1plhnsxjwHo8wYP-dpUC4zgjqilAa-1EdDnDS6iC_2KDr6DQvz20Ced_u',
                    desc: 'Thunder'
                },
                wind: {
                    icon: '2PACX-1vRNyBNAVhI1oq-aVe4pV_e1plhnsxjwHo8wYP-dpUC4zgjqilAa-1EdDnDS6iC_2KDr6DQvz20Ced_u',
                    desc: 'Thunder/Wind'
                }
            }
        },
        fog: {
            icon: '2PACX-1vQQgNYefnPw1-H1QGWWPpfnxyGr1MiLTEtDwkDvOOByD01-Jr9sqQQM2Kbpo3z8E06iNDkpLDpk94Wl',
            desc: 'Fog'
        }
    }
}

$.get("https://api.weather.gov/stations/KHPN/observations/latest", function(data) {
    console.log(data);
    $('#weather-temp').html(Math.round(data.properties.temperature.value * (9/5) + 32) + '°');
    
    if(data.properties.icon.split('night').length > 1){
        var time = 'night';
    } else {
        var time = 'day';
    }
    
    var cloudAmount = 0;
    var cloudType = 'clear';
    if(data.properties.cloudLayers){
        for(var j = 0; j < data.properties.cloudLayers.length; j++){
            if(data.properties.cloudLayers[j].amount == 'FEW'){
                cloudAmount = cloudAmount + 1;
            }
            if(data.properties.cloudLayers[j].amount == 'SCT'){
                cloudAmount = cloudAmount + 3;
            }
            if(data.properties.cloudLayers[j].amount == 'BKN'){
                cloudAmount = cloudAmount + 5;
            }
            if(data.properties.cloudLayers[j].amount == 'OVC'){
                cloudAmount = cloudAmount + 8;
            }
        }
    }
    if(cloudAmount >= 8){
        cloudType = 'cloudy';
    } else if(cloudAmount >= 5){
        cloudType = 'mostly';
    } else if(cloudAmount >= 3){
        cloudType = 'partly';
    }
    
    var wind = 'calm';
    if(data.properties.windSpeed){
        if(data.properties.windSpeed.value > 8){
            wind = 'wind';
        }
    }
    
    var fog = false;
    var precip = 'dry';
    var precipRate = '';
    if(data.properties.presentWeather){
        if(data.properties.presentWeather.length > 0){
            for(var p = 0; p < data.properties.presentWeather.length; p++){
                if(data.properties.presentWeather[p].rawString.split('FG') > 1){
                    fog = true;
                } if(data.properties.presentWeather[p].weather == 'rain'){
                    precip = 'rain';
                    if(data.properties.presentWeather[p].intensity == 'light'){
                        precipRate = 'Light ';
                    }
                    if(data.properties.presentWeather[p].intensity == 'heavy'){
                        precipRate = 'Heavy ';
                    }
                } 
                if(data.properties.presentWeather[p].weather == 'drizzle'){
                    precip = 'rain';
                    precipRate = 'Light ';
                }
                if(data.properties.presentWeather[p].weather == 'snow' || data.properties.presentWeather[p].rawString.split('PL') > 1 || data.properties.presentWeather[p].rawString.split('SG') > 1){
                    precip = 'snow';
                    if(data.properties.presentWeather[p].intensity == 'light'){
                        precipRate = 'Light ';
                    }
                    if(data.properties.presentWeather[p].intensity == 'heavy'){
                        precipRate = 'Heavy ';
                    }
                    if(data.properties.presentWeather[p].rawString.split('PL') > 1){
                        precipRate =+ 'Sleet/';
                    }
                } 
                if(data.properties.presentWeather[p].modifier == 'freezing'){ 
                    precipRate =+ 'Freezing ';
                }
                if(data.properties.presentWeather[p].modifier == 'thunderstorm'){
                    precipRate = '';
                    precip = 'thunder';
                }
                if(data.properties.presentWeather[p].weather == 'thunderstorm'){
                    precipRate = 'Hail/';
                    precip = 'thunder';
                }
            }
        }
    }
    
    var conditions = imageKey[time][cloudType][precip][wind];
    if(precip == 'dry'){
        if(fog == true){
            conditions = imageKey[time].fog;
        }
    } else {
        conditions.desc = precipRate + conditions.desc;
    }
    
    $('#weather-img').attr('src', 'https://docs.google.com/drawings/d/e/' + conditions.icon + '/pub?w=200');
    
    $('#weather-conditions').text(conditions.desc);
    
    if(time == 'night'){
        $('#weather-img').css('background', '#1a237e');
    }
    
    console.log(conditions);
});
