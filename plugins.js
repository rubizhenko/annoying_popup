"use strict";
var DOMbody = document.body;
var minDeviceWidth = 480;
var params = {
    lang: 'it',
    accentColor: '#64ca50',
    btnBackground: '#ff8300',
    btnTextColor: '#fff'
};
var darkerBackColor = ColorLuminance(params.btnBackground, -0.2);
var btnBackgroundLight = ColorLuminance(params.btnBackground, 0.2);
var customCSS = {
    callBackDiam: 150,
    callBackFontSize: 14,
    topPluginHeight: 34
};
var styles = document.createElement("style");

styles.innerHTML = "\
*{\
	-webkit-box-sizing: border-box;\
	-moz-box-sizing: border-box;\
	box-sizing: border-box;\
}\
/*callback*/\
\
.callBack {\
	position: fixed;\
	bottom: 2%;\
	right: 2%;\
	width: 120px;\
	height: 120px;\
	z-index: 1000;\
	-webkit-perspective: 500px;\
	-moz-perspective: 500px;\
	perspective: 500px;\
	font-size: 14px;\
}\
\
.callBack__center {\
	font-family: Arial, Helvetica, sans-serif;\
	display: table;\
	position: absolute;\
	width: 80%;\
	height: 80%;\
	left: 10%;\
	right: 10%;\
	top: 10%;\
	bottom: 10%;\
	-webkit-border-radius: 50%;\
	-moz-border-radius: 50%;\
	border-radius: 50%;\
	text-align: center;\
	vertical-align: middle;\
	background-color: rgba(96, 191, 255, 0.9);\
	background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJERDYzRkI2NzJDODExRTdCRDUwQzUyQURDQzFBODY2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJERDYzRkI3NzJDODExRTdCRDUwQzUyQURDQzFBODY2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkRENjNGQjQ3MkM4MTFFN0JENTBDNTJBRENDMUE4NjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkRENjNGQjU3MkM4MTFFN0JENTBDNTJBRENDMUE4NjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76YWpfAAADqElEQVR42uydwXIjMQgFDZX//2X2tJeUXYljJB7Qum7VjgZ6GmYsRRYRD8bjVRBs+o1/kfu3wDAAAIhRQABAHhAtYXBymApDYABGKytggOVWAIA7CZIFAQDmwQYAlAUAeGfYZhB4C3gOQVwGwSYAEIJPWaYV4jAEJXHypMnHB3B0gsIu2KAVAJEMSicQbAIEfvCpn2yD0zCEMgDRjfKmJeKKMb0wcVNXopwAQQKAExOZvBypBQQukKjpEJhynFwkQdMXJmaBELcBuP1F7LEABKk4uVhCgOBynFwwEVsgMIU4uWgCtmxWKIfAhQMfF69T+Zm6FAL19QBRcL0KIMp+LfUG2q3uR27BYBUx8iY1V6UvOQ3DdQg6LQlT609iAgTd1gSG4HxCDIK3AYjFEIQwmHZjLqwK1rbBcQi8cbC3zO1oOcAA/ZrEVBC9eZC3zPFYKdhugNMrfBUgAAABGCohCADQgIHt4Z264ycwqECQagEMcB+EwAD9QaiGIM0CvjgJKmWhNAYYoC4JEotunae/NQS2zQDGvPKbQCP5pfO7bYHoaIDpkEalAUh+//n+2QJObZWZd2CAIY1VtyaQ5M+4B5sCwKQn/6MO/fCI7wAYyd9nHefJX20BfgugCUTBm+0WSgbgBMucWNgnBsACfAfAApvKgPM6tnsonhgSAPhxHOyFTa0DAIycB8A+NYAV1uSpFvge0/J7VDbAZAjavAVQi3kN5LVwOwAGBBgACCgBjO0AYAEMQFO4HQADAgyACZYDYECAAYCAEkA52A6AAQEGAAJKAOVgOwAGBH1H1oIQe+id6aP8pmKTDIAJXl8//vBv9ADNIXgnueUgZANgyyGIRqAeM8BWCKIRqMdLgCoEIQ5YTAFAFYITQVb//1Y3gV2f2JgCgIlDEMJJiikGsIE2COG5SZaADhCEWPKvXO9mD9Bhm9lPIFRulh3RBHbZa/gMhBZHwXZ4C+i04TQeQt/tT8yj6jWQXcciEFR+BwACAQiqPwQBQTEECl8CgaAQApVPwUBQBAF/LXw5BGo/BgHB5cGJIcstwJlByyHg1DBKgPQwQNgNADYAACAAACAAAPoCAMAGB2LiA24YEJYaABskxMC3B2D7vfvAQGCDxQBstIEBwF4bGAbYC0LKPW3aHTwJhLT72Lg9vDsIqXPffGSMMWfODOpkgyPz5NCoHiAcmxuHR78OdExPPgD8LvAxMfEAoG2Fa+UIALRguN6HAEBesqJT4v+PfwIMAFQ/3gdIE8f2AAAAAElFTkSuQmCC\");\
	background-repeat: no-repeat;\
	background-position: center;\
	-webkit-background-size: 50%;\
	background-size: 50%;\
	-webkit-box-shadow: 0px 0px 2px 5px rgba(96, 191, 255, 0.47);\
	-moz-box-shadow: 0px 0px 2px 5px rgba(96, 191, 255, 0.47);\
	box-shadow: 0px 0px 2px 5px rgba(96, 191, 255, 0.47);\
	text-transform: uppercase;\
	color: #fff;\
	-webkit-transform-origin: 50%;\
	-moz-transform-origin: 50%;\
	-ms-transform-origin: 50%;\
	transform-origin: 50%;\
	-webkit-animation: touchMe 5s linear infinite;\
	-moz-animation: touchMe 5s linear infinite;\
	animation: touchMe 5s linear infinite;\
}\
.callBack__center:hover {\
	cursor: pointer;\
}\
.spinner {\
	-webkit-animation: spin 1s linear;\
	-moz-animation: spin 1s linear;\
	animation: spin 1s linear;\
}\
\
.text-hide {\
	opacity: 1 !important;\
}\
\
.bg-img-none {\
	background-image: none;\
}\
\
.callBack__center::before,\
.callBack__center::after {\
	content: \"\";\
	position: absolute;\
	left: 0;\
	top: 0;\
	display: block;\
	width: 100%;\
	height: 100%;\
	-webkit-border-radius: 50%;\
	-moz-border-radius: 50%;\
	border-radius: 50%;\
	-webkit-box-shadow: inset 0px 0px 60px 0px rgba(0, 191, 255, 1);\
	-moz-box-shadow: inset 0px 0px 60px 0px rgba(0, 191, 255, 1);\
	box-shadow: inset 0px 0px 60px 0px rgba(0, 191, 255, 1);\
}\
\
.callBack__center::before {\
	-webkit-animation: pulse 3s linear infinite;\
	-moz-animation: pulse 3s linear infinite;\
	animation: pulse 3s linear infinite;\
}\
\
.callBack__center::after {\
	-webkit-animation: pulse-small 3s linear infinite;\
	-moz-animation: pulse-small 3s linear infinite;\
	animation: pulse-small 3s linear infinite;\
}\
\
.callBack__center span {\
	display: table-cell;\
	vertical-align: middle;\
	opacity: 0;\
	transition: opacity .5s;\
	-webkit-user-select: none;\
	-moz-user-select: none;\
	-ms-user-select: none;\
	-o-user-select: none;\
	user-select: none;\
}\
\
/*END: callback*/\
/*popup*/\
\
#m1-form .popup-m1-form button,\
#m1-form .popup-m1-title {\
	text-transform: uppercase;\
	font-weight: 700;\
	letter-spacing: .7px\
}\
\
#m1-form,\
#m1-form .popup-m1-form button,\
#m1-form .popup-m1-form input[type=text],\
#m1-form>div,\
.close-m1,\
.popup-m1-cont,\
.popup-m1-form,\
.popup-m1-text1,\
.popup-m1-text2,\
.popup-m1-title {\
	margin: 0;\
	padding: 0;\
	border: 0;\
	outline: 0;\
	position: relative;\
}\
\
#m1-form {\
	position: fixed;\
	display: none;\
	outline: 0;\
	width: 450px;\
	margin-left: -225px;\
	margin-top: -280px;\
	top: 50%;\
	left: 50%;\
	background: #fff;\
	z-index: 9999;\
	-webkit-border-radius: 8px;\
	-moz-border-radius: 8px;\
	border-radius: 8px;\
	font-family: Arial, Helvetica, sans-serif;\
}\
\
#m1-form span.close-m1 {\
	position: absolute;\
	display: block;\
	width: 28px;\
	height: 28px;\
	line-height: 26px;\
	top: 3px;\
	right: 3px;\
	font-size: 24px;\
	color: #fff;\
	text-align: center;\
	cursor: pointer;\
	z-index: 999;\
}\
\
#m1-form span.close-m1:before {\
	content: \"\\00D7\"\
}\
\
#m1-form>div {\
	position: relative;\
	width: 100%;\
	overflow: hidden;\
	-webkit-border-radius: 8px;\
	-moz-border-radius: 8px;\
	border-radius: 8px\
}\
\
#m1-form .popup-m1-title {\
	position: relative;\
	padding: 20px 0 16px;\
	text-align: center;\
	font-size: 25px;\
	line-height: 1.3em;\
	color: #fff;\
	background: " + params.accentColor + "\
}\
\
#m1-form .popup-m1-title:after,\
#m1-form .popup-m1-title:before {\
	content: \"\";\
	position: absolute;\
	width: 50%;\
	height: 20px;\
	bottom: -10px;\
	background: " + params.accentColor + "\
}\
\
#m1-form .popup-m1-title:before {\
	left: 0;\
	-webkit-transform: skew(0deg, 4deg);\
	-moz-transform: skew(0deg, 4deg);\
	-ms-transform: skew(0deg, 4deg);\
	transform: skew(0deg, 4deg)\
}\
\
#m1-form .popup-m1-title:after {\
	right: 0;\
	-webkit-transform: skew(0deg, -4deg);\
	-moz-transform: skew(0deg, -4deg);\
	-ms-transform: skew(0deg, -4deg);\
	transform: skew(0deg, -4deg)\
}\
\
#m1-form .popup-m1-cont {\
	position: relative;\
	padding: 45px 20px 30px;\
	color: #333;\
	font-size: 17px;\
	line-height: 1.5em\
}\
\
#m1-form .popup-m1-cont div.popup-m1-text1 {\
	text-align: center\
}\
\
#m1-form .popup-m1-form {\
	position: relative;\
	display: block;\
	padding: 30px 0;\
}\
\
#m1-form .popup-m1-form:after {\
	content: \"\";\
	display: block;\
	clear: both;\
	height: 0\
}\
\
#m1-form .popup-m1-form button,\
#m1-form .popup-m1-form input[type=text] {\
	padding: 0;\
	background: #fff;\
	position: relative;\
	display: block;\
	margin: 0 auto;\
	text-align: left;\
	-webkit-border-radius: 4px;\
	-moz-border-radius: 4px;\
	border-radius: 4px;\
}\
\
#m1-form .popup-m1-form input[type=text]::-webkit-input-placeholder {\
	color: #a9a9a9;\
	opacity: 1\
}\
\
#m1-form .popup-m1-form input[type=text]:-moz-placeholder {\
	color: #a9a9a9;\
	opacity: 1\
}\
\
#m1-form .popup-m1-form input[type=text]::-moz-placeholder {\
	color: #a9a9a9;\
	opacity: 1\
}\
\
#m1-form .popup-m1-form input[type=text]:-ms-input-placeholder {\
	color: #a9a9a9;\
	opacity: 1\
}\
\
#m1-form .popup-m1-form input[type=text],\
#m1-form .popup-m1-form select {\
	display: block;\
	width: 90%;\
	height: 64px;\
	margin: 0 auto 16px;\
	line-height: 64px;\
	font-size: 17px;\
	color: #222;\
	background: #fff;\
	text-indent: 20px;\
	border: 1px solid #ccc\
}\
\
#m1-form .popup-m1-form input[type=text]:focus {\
	border-color: #aaa\
}\
\
#m1-form .popup-m1-form button {\
	width: 90%;\
	height: 68px;\
	line-height: 68px;\
	color: " + params.btnTextColor + ";\
	text-align: center;\
	text-decoration: none;\
	font-size: 22px;\
	border-bottom: 3px solid " + darkerBackColor + ";\
	background: " + params.btnBackground + ";\
	cursor: pointer;\
	-webkit-box-shadow: 0 0;\
	-moz-box-shadow: 0 0;\
	box-shadow: 0 0;\
	text-shadow: 0 0 0\
}\
\
#m1-form .popup-m1-form button:hover {\
	background: " + btnBackgroundLight + "\
}\
\
#m1-form .popup-m1-form button:active {\
	top: -1px\
}\
\
#m1-form .popup-m1-cont p.popup-m1-text2 {\
	text-align: center\
}\
\
#m1-form .popup-m1-cont p.popup-m1-text2:before {\
	content: \"\";\
	position: relative;\
	display: inline-block;\
	width: 16px;\
	height: 15px;\
	margin: 0 10px 0 0;\
	top: 2px;\
	background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAA6klEQVR42mJMORXAgAZEgLgIiH2AWA0qdgOINwHxJCB+g6yYCU1zMBDfAeI/QBwNxPxQHA+VvwtVAwcsaJpXA7ErEO9FM/giFB8E4t1AHArEa5FdIArE83BoRgZ7oWpAasWQDcgF4gkENCMb0g/EBcgG+AHxOgbiwVpoIMPDQB+IpwHxPyC2JaD5MBAzArEuzICHUAkrIm23QWI/BHlBjoF8IMfEQCGgigGP0MScSdD/CGSAPJRzBJrmQVHUBA1ldihGBiB1R6FseVg0MmLJTMeBmBtJEyx6bQmFASi3VQHxeSQxRlx+AAgwAF+pKdMzI/goAAAAAElFTkSuQmCC\");\
	background-repeat: no-repeat;\
}\
\
#overlay-popup-m1 {\
	display: none;\
	position: fixed;\
	width: 100%;\
	height: 100%;\
	top: 0;\
	left: 0;\
	background: rgba(0, 0, 0, .6);\
	-ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)\";\
	filter: alpha(opacity=0);\
	-moz-opacity: 0;\
	-khtml-opacity: 0;\
	opacity: 0;\
	z-index: 999\
}\
\
.js-show {\
	display: block !important;\
	-webkit-animation: animShow .3s linear;\
	-moz-animation: animShow .3s linear;\
	animation: animShow .3s linear;\
	opacity: 1 !important\
}\
\
/*END: popup*/\
/*animations*/\
\
@-webkit-keyframes spin {\
	0% {\
		-webkit-transform: rotateY(0deg);\
	}\
	100% {\
		-webkit-transform: rotateY(360deg);\
	}\
}\
\
@-moz-keyframes spin {\
	0% {\
		-moz-transform: rotateY(0deg);\
	}\
	100% {\
		-moz-transform: rotateY(360deg);\
	}\
}\
\
@keyframes spin {\
	0% {\
		transform: rotateY(0deg);\
	}\
	100% {\
		transform: rotateY(360deg);\
	}\
}\
\
@-webkit-keyframes touchMe {\
	0%,\
	90% {\
		-webkit-transform: rotate(0deg);\
	}\
	92% {\
		-webkit-transform: rotate(10deg);\
	}\
	94% {\
		-webkit-transform: rotate(-10deg);\
	}\
	96% {\
		-webkit-transform: rotate(5deg);\
	}\
	98% {\
		-webkit-transform: rotate(-5deg);\
	}\
	100% {\
		-webkit-transform: rotate(0deg);\
	}\
}\
\
@-moz-keyframes touchMe {\
	0%,\
	90% {\
		-moz-transform: rotate(0deg);\
	}\
	92% {\
		-moz-transform: rotate(10deg);\
	}\
	94% {\
		-moz-transform: rotate(-10deg);\
	}\
	96% {\
		-moz-transform: rotate(5deg);\
	}\
	98% {\
		-moz-transform: rotate(-5deg);\
	}\
	100% {\
		-moz-transform: rotate(0deg);\
	}\
}\
\
@keyframes touchMe {\
	0%,\
	90% {\
		transform: rotate(0deg);\
	}\
	92% {\
		transform: rotate(10deg);\
	}\
	94% {\
		transform: rotate(-10deg);\
	}\
	96% {\
		transform: rotate(5deg);\
	}\
	98% {\
		transform: rotate(-5deg);\
	}\
	100% {\
		transform: rotate(0deg);\
	}\
}\
\
@-webkit-keyframes pulse {\
	0% {\
		-webkit-transform: scale(1.1);\
		opacity: 0\
	}\
	40% {\
		-webkit-transform: scale(1.2);\
		opacity: .05\
	}\
	50% {\
		-webkit-transform: scale(1.3);\
		opacity: .1\
	}\
	60% {\
		-webkit-transform: scale(1.5);\
		opacity: .3\
	}\
	80% {\
		-webkit-transform: scale(1.7);\
		opacity: .1\
	}\
	100% {\
		-webkit-transform: scale(2);\
		opacity: 0\
	}\
}\
\
@-moz-keyframes pulse {\
	0% {\
		-moz-transform: scale(1.1);\
		opacity: 0\
	}\
	40% {\
		-moz-transform: scale(1.2);\
		opacity: .05\
	}\
	50% {\
		-moz-transform: scale(1.3);\
		opacity: .1\
	}\
	60% {\
		-moz-transform: scale(1.5);\
		opacity: .3\
	}\
	80% {\
		-moz-transform: scale(1.7);\
		opacity: .1\
	}\
	100% {\
		-moz-transform: scale(2);\
		opacity: 0\
	}\
}\
\
@keyframes pulse {\
	0% {\
		transform: scale(1.1);\
		opacity: 0\
	}\
	40% {\
		transform: scale(1.2);\
		opacity: .05\
	}\
	50% {\
		transform: scale(1.3);\
		opacity: .1\
	}\
	60% {\
		transform: scale(1.5);\
		opacity: .3\
	}\
	80% {\
		transform: scale(1.7);\
		opacity: .1\
	}\
	100% {\
		transform: scale(2);\
		opacity: 0\
	}\
}\
\
@-webkit-keyframes pulse-small {\
	0%,\
	40% {\
		-webkit-transform: scale(1);\
		opacity: .3\
	}\
	50% {\
		-webkit-transform: scale(1.1);\
		opacity: .5\
	}\
	60% {\
		-webkit-transform: scale(1.20);\
		opacity: .7\
	}\
	80% {\
		-webkit-transform: scale(1.3);\
		opacity: .4\
	}\
	100% {\
		-webkit-transform: scale(1.5);\
		opacity: 0\
	}\
}\
\
@-moz-keyframes pulse-small {\
	0%,\
	40% {\
		-moz-transform: scale(1);\
		opacity: .3\
	}\
	50% {\
		-moz-transform: scale(1.1);\
		opacity: .5\
	}\
	60% {\
		-moz-transform: scale(1.20);\
		opacity: .7\
	}\
	80% {\
		-moz-transform: scale(1.3);\
		opacity: .4\
	}\
	100% {\
		-moz-transform: scale(1.5);\
		opacity: 0\
	}\
}\
\
@keyframes pulse-small {\
	0%,\
	40% {\
		transform: scale(1);\
		opacity: .3\
	}\
	50% {\
		transform: scale(1.1);\
		opacity: .5\
	}\
	60% {\
		transform: scale(1.20);\
		opacity: .7\
	}\
	80% {\
		transform: scale(1.3);\
		opacity: .4\
	}\
	100% {\
		transform: scale(1.5);\
		opacity: 0\
	}\
}\
\
@-webkit-keyframes animShow {\
	0% {\
		opacity: .3\
	}\
	50% {\
		opacity: .5;\
		-webkit-transform: scale(1.1);\
	}\
	100% {\
		-webkit-transform: scale(1);\
		opacity: 1\
	}\
}\
\
@-moz-keyframes animShow {\
	0% {\
		opacity: .3\
	}\
	50% {\
		opacity: .5;\
		-moz-transform: scale(1.1);\
	}\
	100% {\
		-moz-transform: scale(1);\
		opacity: 1\
	}\
}\
\
@keyframes animShow {\
	0% {\
		opacity: .3\
	}\
	50% {\
		opacity: .5;\
		transform: scale(1.1);\
	}\
	100% {\
		transform: scale(1);\
		opacity: 1\
	}\
}\
@media screen and (max-width: 480px){\
	#m1-form{\
		max-width: 300px;\
		margin-left: -150px;\
	}\
	#m1-form .popup-m1-form input[type=text], #m1-form .popup-m1-form button{\
		height: 40px;\
		line-height: 40px;\
	}\
}\
";
DOMbody.appendChild(styles);

//Text for CallBack Plugin
var callBackPluginText = {
    'ro': 'Сomanda',
    'ru': 'Заказать',
    'it': 'Ordinare',
    'es': 'Orden'
};
//Text for PopupForm
var popupText = {
    'ru': {
        'title': 'Нравится ли вам это предложение?',
        'desc': 'Мы будем предоставлять информацию о продукции и лучшие условия, и мы представим специальные предложения!',
        'name': 'Ваше имя',
        'phone': 'Телефон',
        'order': 'Заказать',
        'desc2': 'Оператор позвонит Вам в течение 5-10 минут.'
    },
    'ro': {
        'title': 'ÎȚI PLACE ACEASTĂ OFERTĂ?',
        'desc': 'Îți vom furniza informații despre produs și cele mai bune condiții și îți vom prezenta oferte speciale!',
        'name': 'Nume',
        'phone': 'Telefon',
        'order': 'CONTACTEAZĂ-MĂ TELEFONIC',
        'desc2': 'Operatorul te va contacta telefonic în 5-10 minute.'
    },
    'it': {
        'title': 'Vi piace questa frase?',
        'desc': 'Forniremo informazioni sui prodotti e le migliori condizioni e offriremo offerte speciali!',
        'name': 'Il vostro nome',
        'phone': 'Telefono',
        'order': 'Ordinare',
        'desc2': 'L\'operatore vi chiamerà entro 5 - 10 minuti.'
    },
    'es': {
        'title': '¿Te gusta ests proposición? ',
        'desc': 'Vamos a proporcionar información sobre los productos y las mejores condiciones, y vamos a presentar ofertas especiales!',
        'name': 'Su nombre',
        'Phone ': 'Teléfono',
        'Orden': 'Orden',
        'desc2': 'El operador le llamará en 5-10 minutos.'
    }
};

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}
//Check window width
function isMobile() {
    if (window.innerWidth < minDeviceWidth) {
        return true;
    } else {
        return false;
    }
}
//Check local storage support
function isStorage() {
    if (window.localStorage != undefined) {
        return true;
    } else {
        return false;
    }
}

if (!isMobile()) {
    (function() {
        var updateValue = function updateValue(element, value) {
            element.innerHTML = ' ' + value;
        };

        var addCallBackPlugin = function addCallBackPlugin() {
            var callBackPlugin = document.createElement("div");
            callBackPlugin.className = "callBack";
            callBackPlugin.innerHTML = "<div class=\"callBack__center\"><span>" + callBackPluginText[params.lang] + "</span></div>\n\t\t\t\t\t\t\t\t<div class=\"callBack__shadow\"></div>";
            DOMbody.appendChild(callBackPlugin);
        };

        var addOverlay = function addOverlay() {
            overlay.setAttribute('id', 'overlay-popup-m1');
            DOMbody.appendChild(overlay);
        };

        var addPopupForm = function addPopupForm() {
            addOverlay();
            popupForm.className = "m1modal";
            popupForm.setAttribute('id', 'm1-form');
            popupForm.innerHTML = "<span class=\"close-m1\"></span>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<h2 class=\"popup-m1-title\">" + popupText[params.lang].title + "</h2>\n\t\t\t\t\t\t\t\t\t<div class=\"popup-m1-cont\">\n\t\t\t\t\t\t\t\t\t\t<p class=\"popup-m1-text1\">" + popupText[params.lang].desc + "</p>\n\t\t\t\t\t\t\t\t\t\t<form method=\"POST\" action=\"/land/order\" class=\"popup-m1-form al-form\">\n\t\t\t\t\t\t\t\t\t\t\t<select class=\"al-country\" style=\"display: none;\"></select>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"name\" placeholder=\"" + popupText[params.lang].name + "\" required=\"\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"phone\" placeholder=\"" + popupText[params.lang].phone + "\" required=\"\">\n\t\t\t\t\t\t\t\t\t\t\t<button type=\"submit\">" + popupText[params.lang].order + "</button>\n\t\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t\t\t<p class=\"popup-m1-text2\">" + popupText[params.lang].desc2 + "</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>";
            DOMbody.appendChild(popupForm);
        };

        var showPopupForm = function showPopupForm() {
            overlay.classList.add('js-show');
            popupForm.classList.add('js-show');
        };

        var hidePopupForm = function hidePopupForm() {
            overlay.classList.remove('js-show');
            popupForm.classList.remove('js-show');
        };

        var animateCallBack = function animateCallBack(flag) {
            if (flag) {
                spinnerTimer = setInterval(function() {
                    callBack.classList.toggle('spinner');
                    callBackCenter.classList.toggle('bg-img-none');
                    callBackText.classList.toggle('text-hide');
                }, 5000);
            } else {
                clearInterval(spinnerTimer);
            }
        };

        //Change display property
        var displayOnMobile = function displayOnMobile() {
            if (isMobile()) {
                document.getElementsByClassName('callBack')[0].style.display = "none";
            } else {
                document.getElementsByClassName('callBack')[0].style.display = "block";
            }
        };

        var overlay = document.createElement("div");

        var popupForm = document.createElement("div");

        addCallBackPlugin();
        addPopupForm();

        var closePopupBtn = document.querySelector('.close-m1');

        var callBack = document.getElementsByClassName('callBack')[0];
        var callBackCenter = document.getElementsByClassName('callBack__center')[0];
        var callBackText = document.querySelector('.callBack__center span');

        var spinnerTimer = void 0;

        animateCallBack(true);
        callBack.addEventListener('mouseover', function() {
            animateCallBack(false);
        });
        callBack.addEventListener('mouseleave', function() {
            animateCallBack(true);
        });
        callBackCenter.addEventListener('click', showPopupForm);
        closePopupBtn.addEventListener('click', hidePopupForm);
        overlay.addEventListener('click', hidePopupForm);

        window.addEventListener('mouseout', function(event) {
            var comebacker = true;
            if (event.pageY - window.scrollY < 1 && comebacker) {
                comebacker = false;
                showPopupForm();
                return false;
            }
        });
        window.addEventListener("resize", displayOnMobile);

        var setCustomStyles = function() {
            callBack.style.width = customCSS.callBackDiam / Math.sqrt(2) + 'px';
            callBack.style.height = customCSS.callBackDiam / Math.sqrt(2) + 'px';
            callBack.style.fontSize = customCSS.callBackFontSize + 'px';
        }();
    })();
}