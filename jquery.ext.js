var ERROR_LEVEL = 0,
	WARN_LEVEL = 1,
	INFO_LEVEL = 2,
	DEBUG_LEVEL = 3,
	enableLog = true;

jQuery.extend({
	get_window_sizes: function() {
		var iebody = (document.compatMode && document.compatMode != 'BackCompat') ? document.documentElement : document.body;
		return {
			'offset_x'   : iebody.scrollLeft ? iebody.scrollLeft : (self.pageXOffset ? self.pageXOffset : 0),
			'offset_y'   : iebody.scrollTop  ? iebody.scrollTop : (self.pageYOffset ? self.pageYOffset : 0),
			'view_height': self.innerHeight ? self.innerHeight : iebody.clientHeight,
			'view_width' : self.innerWidth ? self.innerWidth : iebody.clientWidth,
			'height'     : iebody.scrollHeight ? iebody.scrollHeight : window.height,
			'width'      : iebody.scrollWidth ? iebody.scrollWidth : window.width
		}
	},

	add: {
		arg: function(data, arg) {
			if($.is.notBlank(data)) {
				arg = data + "&" + arg;
			}
			return arg;
		}
	},

	array: {
		containValue: function(array, value) {
			var contains = false;
			$.each(array, function(i, e) {
				if(e == value) {
					contains = true;
					return false;
				}
			});
			return contains;
		},
		extend: function(array, extend) {
			if($.is.array(array) && $.is.array(extend)) {
				for(var i = 0, length = extend.length; i < length; i++) {
					array.push(extend[i]);
				}
			}
			return array;
		},
		removeValue: function(array, value) {
			var length = array.length;
			for(var i = length; i > -1; i--) {
				if(array[i] === value) {
					array.splice(i, 1);
				}
			}
			return array;
		},
		removeArray: function(array, removeArray) {
			while(removeArray.length > 0) {
				array = $.array.removeArray(array, removeArray.shift());
			};
			return array;
		},
		quickSort: function(array) {
			function partition(a, st, en) {
				var s=st;
				var e=en+1;
				var temp=a[s];
				while(1)
				{
					while(a[++s]<temp);
					while(a[--e]>temp);
					if(s>e)break;
					var tem=a[s];
					a[s]=a[e];
					a[e]=tem;
				}
				a[st]=a[e];
				a[e]=temp;
				return e;
			}
			function doSort(a, s, e) {
				if(s < e) {
					var pos = partition(a, s, e);
					doSort(a, s, pos-1);
					doSort(a, pos+1, e);
				}
				return a;
			}
			return doSort(array, 0, array.length-1);
		}
	},

	bind: {
		clickFunction: function(target, clickFunction, data) {
			if(!target || !clickFunction) {
				return;
			}
			if($.is.array(target)) {
				$.each(target, function(i, e) {
					$(e).click(data, function(event) {
						clickFunction.call(this, event);
					});
				});
			} else {
				$(target).click(data, function(event) {
					clickFunction.call(this, event);
				});
			}
		}
	},

	date: {
		equal: function(time1, time2, equalString) {
			if(!time1 || !time2) {
				return false;
			}
			return ($.date.format(time1, equalString) == $.date.format(time2, equalString));
		},
		monthStartEnd: function(time) {
			if(!time) {
				return null;
			}
			var startEnd = {};
			var date = new Date(time);
			date.setDate(1);
			date.setHours(0, 0, 0, 0);
			startEnd.start = new Date(date);
			date.setMonth(date.getMonth() + 1);
			date.setDate(0);
			date.setHours(23, 59, 59, 999);
			startEnd.end = new Date(date);
			return startEnd;
		},
		today: function() {
			var date = $.date.now();
			date.setHours(0, 0, 0, 0);
			return date;
		},
		now: function() {
			return new Date();
		},
		currentYear: function() {
			var date = $.date.now();
			date = new Date(date.getFullYear() + "/1/1 00:00:00:00");
			return date;
		},
		currentHour: function() {
			var date = $.date.now();
			date.setMinutes(0, 0, 0);
			return date;
		},
		currentMinute: function() {
			var date = $.date.now();
			date.setSeconds(0, 0);
			return date;
		},
		currentSecond: function() {
			var date = $.date.now();
			date.setMilliseconds(0);
			return date;
		},
		currentHours: function() {
			var date = $.date.now();
			return date.getHours();
		},
		currentMinutes: function() {
			var date = $.date.now();
			return date.getMinutes();
		},
		currentSeconds: function() {
			var date = $.date.now();
			return date.getSeconds();
		},
		nextHour: function(date) {
			if(!date) {
				date = $.date.now();
			} else {
				date = new Date(date.getTime());
			}
			date.setHours(date.getHours() + 1, 0, 0, 0);
			return date;
		},
		nextMinute: function(date) {
			if(!date) {
				date = $.date.now();
			} else {
				date = new Date(date.getTime());
			}
			date.setMinutes(date.getMinutes() + 1, 0, 0);
			return date;
		},
		nextSecond: function(date) {
			if(!date) {
				date = $.date.now();
			} else {
				date = new Date(date.getTime());
			}
			date.setSeconds(date.getSeconds() + 1, 0);
			return date;
		},
		nextHours: function(date) {
			if(!date) {
				date = $.date.now();
			}
			return date.getHours() + 1;
		},
		nextMinutes: function(date) {
			if(!date) {
				date = $.date.now();
			}
			return date.getMinutes() + 1;
		},
		nextSeconds: function(date) {
			if(!date) {
				date = $.date.now();
			}
			return date.getSeconds() + 1;
		},
		format: function(value, formatString) {
			if(!value || !$.is.date(value)) {
				return "";
			}

			if($.is.blank(formatString)) {
				formatString = "YYYY/MM/dd hh:mm:ss";
			}

			var dateString = formatString,
				year = value.getFullYear(),
				yearString = "",
				month = value.getMonth() + 1,
				monthString = "",
				day = value.getDate(),
				dayString = "",
				hour = value.getHours(),
				hourString = "",
				minute = value.getMinutes(),
				minuteString = "",
				second = value.getSeconds(),
				secondString = "",
				millisecond = value.getMilliseconds(),
				secondStringString = "";

			if(formatString.indexOf("YYYYY") > -1) {
				yearString = $.string.addZero(year, 5);
				dateString = $.string.replaceAll(dateString, "YYYYY", yearString);
			} else if(formatString.indexOf("YYYY") > -1) {
				yearString = $.string.addZero(year, 4);
				dateString = $.string.replaceAll(dateString, "YYYY", yearString);
			} else if(formatString.indexOf("YY") > -1) {
				yearString = (String(year).length > 2) ? String(year).substring(String(year).length-2) : String(year);
				dateString = $.string.replaceAll(dateString, "YY", yearString);
			}

			if(formatString.indexOf("MM") > -1) {
				monthString = $.string.addZero(month, 2);
				dateString = $.string.replaceAll(dateString, "MM", monthString);
			}

			if(formatString.indexOf("dd") > -1) {
				dayString = $.string.addZero(day, 2);
				dateString = $.string.replaceAll(dateString, "dd", dayString);
			}

			if(formatString.indexOf("hh") > -1) {
				hourString = $.string.addZero(hour, 2);
				dateString = $.string.replaceAll(dateString, "hh", hourString);
			}

			if(formatString.indexOf("mm") > -1) {
				minuteString = $.string.addZero(minute, 2);
				dateString = $.string.replaceAll(dateString, "mm", minuteString);
			}

			if(formatString.indexOf("ss") > -1) {
				secondString = $.string.addZero(second, 2);
				dateString = $.string.replaceAll(dateString, "ss", secondString);
			}

			if(formatString.indexOf("SSS") > -1) {
				secondStringString = $.string.addZero(millisecond, 3);
				dateString = $.string.replaceAll(dateString, "SSS", secondStringString);
			}

			return dateString;
		}
	},

	log: {
		enable: function() {
			enableLog = true;
		},
		disable: function() {
			enableLog = false;
		},
		error: function(message) {
			$.log.exporting(/*"[**错误**]\n" + */message, ERROR_LEVEL);
		},
		warn: function(message) {
			$.log.exporting(/*"[*警告*]\n" + */message, WARN_LEVEL);
		},
		info: function(message) {
			$.log.exporting(/*"[!信息!]\n" + */message, INFO_LEVEL);
		},
		debug: function(message) {
			$.log.exporting(/*"[调试]\n" + */message, DEBUG_LEVEL);
		},
		temp: function(message) {
			$.log.exporting("[临时]\n" + message, ERROR_LEVEL);
		},
		exporting: function(message, level) {
			if(!enableLog || !log) {
				return;
			}
			var isSupportConsole = !$.browser.msie;
			switch(level) {
				case ERROR_LEVEL:
					log.error(message);
					if(isSupportConsole) {
						console.error(message);
					}
					break;
				case WARN_LEVEL:
					log.warn(message);
					if(isSupportConsole) {
						console.warn(message);
					}
					break;
				case INFO_LEVEL:
					log.info(message);
					if(isSupportConsole) {
						console.info(message);
					}
					break;
				case DEBUG_LEVEL:
					log.debug(message);
					if(isSupportConsole) {
						console.debug(message);
					}
					break;
			}
		}
	},

	get: {
		chartset: function() {
			return document.charset;
		},
		userAgent: function () {
			return navigator.userAgent.toLowerCase();
		},
		size: function(val) {
			if($.is.blank(val)) {
				return 0;
			}
			if($.is.defined(val.length)) {
				return val.length;
			}
			var len = 0;
			$.each(val, function(i, e) {
				len++;
			});
			return len;
		}
	},

	has: {
		banChart: function(value) {
			if(text == "") {
				return false;
			}
			if(text.indexOf("&") > -1) {
				return true;
			}
			return false;
		}
	},

	is: {
		array: function(value) {
			return Object.prototype.toString.apply(value) === '[object Array]';
		},

		email: function(email) {
			return /^([\w-+=_]+(?:\.[\w-+=_]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email) ? true : false;
		},

		blank: function(val) {
			return (val === undefined || val == null || String(val).replace(/[\n\r\t]/gi, '') == '');
		},
		notBlank: function(val) {
			return !$.is.blank(val);
		},

		date: function(value) {
			return (typeof value == "object") && value.constructor == Date;
		},

		integer: function(val) {
			if (val.indexOf('0') == 0) {
				val = val.replace(/^[0]+/, '');
			}

			if ($.is.blank(val) || parseInt(val) != val) {
				return false;
			}

			return true;
		},

		ie: function() {
			return !!(window.attachEvent && $.get.userAgent().indexOf('opera') === -1);
		},

		phone: function(val) {
			return val.match(/^\(?\d{3}\)?[ ]?[\d-]*$/gi) ? true : false;
		},

		undefined: function(value) {
			return value === undefined;
		},
		defined: function(value) {
			return value !== undefined;
		}

	},

	cookie: {
		get: function(name) {
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			while (i < clen) {
				var j = i + alen;
				if (document.cookie.substring(i, j) == arg) {
					var endstr = document.cookie.indexOf (";", j);
					if (endstr == -1) {
						endstr = document.cookie.length;
					}

					return unescape(document.cookie.substring(j, endstr));
				}

				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0) {
					break;
				}
			}
			return null;
		},

		set: function(name, value, expires, path, domain, secure) {
			document.cookie = name + "=" + escape (value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
		},

		remove: function(name, path, domain) {
			if ($.cookie.get(name)) {
				document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
			}
		}
	},

	process: {
		numericData: function(value, defaultValue, maxDecimalLength) {
			if($.is.blank(defaultValue)) {
				defaultValue = "--";
			}
			if($.is.blank(maxDecimalLength)) {
				maxDecimalLength = 3;
			}
			if($.is.blank(value) || isNaN(value)) {
				return defaultValue;
			}
			value = String(value);
			var index = value.lastIndexOf(".");
			if(index > -1) {
				var integer = value.substring(0, index);
				var decimal = value.substring(index + 1);
				if(integer.length > 0) {
					if(integer.length <= 3) {
						var decimalLength = (maxDecimalLength + 1) - integer.length;
						if(decimalLength < 0) {
							decimalLength = 0;
						}
						value = integer + "." + decimal.substr(0, decimalLength);
					} else {
						value = integer;
					}
				}
			}
			return Number(value);
		}
	},

	string: {
		addZero: function(value, fixLength) {
			var string = String(value);
			var length = fixLength - string.length;
			for (var i = 0; i < length; i++) {
				string = "0" + string;
			}
			return string;
		},
		replaceAll: function(value, s1, s2) {
			return String(value).replace(new RegExp(s1,"gm"),s2);
		},
		short: function(text, width, sign) {
			if($.is.undefined(text) || $.is.undefined(width)) {
				return text;
			}
			if($.is.undefined(sign)) {
				sign = '..';
			}
			var textWidth = $.string.width(text);
			while(textWidth > width) {
				var subLength = $.get.size(text) - 1;
				if(text.indexOf(sign) > -1) {
					subLength -= $.get.size(sign);
				}
				text = text.substring(0, subLength) + sign;
				textWidth = $.string.width(text);
			}
			return text;
		},
		width: function(text, fontSize) {
			if($.is.blank(text)) {
				return 0;
			}
			if($.is.blank(fontSize)) {
				fontSize = 12;
			}
			var width = 0;
			var digiExp = /[^\d]/g;
			var letterExp = /[\W]/g;
			var chineseExp = /[\u4E00-\u9FA5]/g;
			var textLength = $.get.size(text);
			for(var i = 0; i < textLength; i++) {
				var char = text.charAt(i);
				if($.is.blank(char)) {
					return true;
				}
				if(char.match(chineseExp)) {
					width += fontSize;
				} else {
					width += (fontSize * 0.5);
				}
			};
			return width;
		},
		trim: function(str) {
		str = str.replace(/^\s+/, '');
			for (var i = str.length - 1; i >= 0; i--) {
				if (/\S/.test(str.charAt(i))) {
					str = str.substring(0, i + 1);
					break;
				}
			}
			return str;
		}
	},

	trim: function(val) {
		return String(val).replace(/(^\s*)|(\s*$)/g,"");
	},

	redirect: function(url) {
		if ($('base').length && url.indexOf('/') != 0) {
			url = $('base').attr('href') + url;
		}
		window.location.href = url;
	},

	exporting: {
		csvURL: function(url) {
			return $.add.arg(url, "output=csv");
		},
		excelURL: function(url) {
			return $.add.arg(url, "output=xls");
		}
	}
});