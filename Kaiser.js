/*
	name: Kaiser 
	author: xuquanhua
	versions: 1.0.0
	date: 2015-09-25
*/
/********************* 框架 begain  ********************/


(function(window) {
	// 一些工具 简易变量
	var class2type = {};

	//Kaiser 函数对象;
	var Kaiser = function (selector) {
		/* 1、返回 init函数对象；因为 init 函数的原型 指向 Kaiser的原型，所以 对外作用域中，Kaiser()拥有 Kaiser.prototype;
		 2、 init可用于 Kaiser('body'),DOM 操作；
		 */
		return new Kaiser.fn.init(selector);
	}

	// 数据缓存
	Kaiser.catchDataArray = {};

	// Kaiser.fn 是Kaiser的原型
	Kaiser.fn = Kaiser.prototype = {
		// 还原 构造函数 constructs　为　Kaiser ;
		constructs: Kaiser,
		//拥有类数组方法
		length: 0,
		init: function (selector) {
			//return this;
			var _arguments0 = arguments[0]
			if (!_arguments0) {
				return this;
			}
			//querySelectorAll 返回类数组， 类型和 document.getElementById()
			//var _all = document.querySelectorAll(_arguments0)
			//if(_all.length>=1){
			//	return Kaiser.makeArray(_all, this, _arguments0)
			//}
			var getElementsByClass = function (searchClass) {
				var classElements = new Array(),
					node = document,
					tag = '*',
					els = node.getElementsByTagName(tag),
					elsLen = els.length,
					pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
				for (i = 0, j = 0; i < elsLen; i++) {
					if (pattern.test(els[i].className)) {
						classElements[j] = els[i];
						j++;
					}
				}
				return classElements;
			}
			var select = selector.match(/#(\w+)/);
			//id
			if (select) {
				ele = document.getElementById(select[1])
				this[0] = ele;
				this.context = document;
				this.selector = selector;
				this.length = 1;
				return this;
			} else {
				//class
				select = selector.match(/.(\w+)/);
				var _all = '';
				//ie8及以下不支持 getElementsByClassName
				if (document.getElementsByClassName) {
					_all = document.getElementsByClassName(select[1])
				} else {
					_all = getElementsByClass(select[1])
				}
				if (_all.length >= 1) {
					return Kaiser.makeArray(_all, this, _arguments0)
				}
			}
		},
		//拥有类数组方法
		splice: function () {}
	};
	// init 函数的原型 指向 Kaiser的原型 (复制/指针)
	Kaiser.fn.init.prototype = Kaiser.fn;
	// extend  是拓展方法； Kaiser.extend 拓展类方法; Kaiser.fn.extend 
	Kaiser.extend = Kaiser.fn.extend = function () {
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !Kaiser.isFunction(target)) {
			target = {};
		}

		// extend Kaiser itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && ( Kaiser.isObject(copy) || (copyIsArray = Kaiser.isArray(copy)) )) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Kaiser.isArray(src) ? src : [];

						} else {
							clone = src && Kaiser.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = Kaiser.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		// Return the modified object
		return target;
	};

	//内部框架拓展
	//拓展 类方法 Kaiser.each 调用
	Kaiser.extend({
		//是函数
		isFunction: function (obj) {
			return Kaiser.type(obj) === "function";
		},
		//是数组
		isArray: Array.isArray || function (obj) {
			return Kaiser.type(obj) === "array";
		},
		//是空对象
		isEmptyObject: function (obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},
		//是对象
		isObject: function (obj) {
			return typeof(obj) === "object";
		},
		// Kaiser.each
		each: function (obj, callback, args) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);

			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);

						if (value === false) {
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				}
			}

			return obj;
		},
		//是什么类型
		type: function (obj) {
			if (obj == null) {
				return obj + "";
			}
			return typeof obj === "object" || typeof obj === "function" ?
			class2type[toString.call(obj)] || "object" :
				typeof obj;
		},
		// results is for internal usage only
		makeArray: function (arr, results, selector) {
			var _this = this,
				ret = results || [];
			if (arr != null && arr.length) {
				for (var i = 0; i < arr.length; i++) {
					ret[i] = arr[i];
					ret['length'] = i + 1;
					ret['context'] = document;
					ret['selector'] = selector;
				}
			}
			return ret;
		},
		// 获取 window height width  @有待验证
		getWindowWH: function () {
			var _height = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
			return {
				width: document.body.clientWidth,
				height: _height
			}
		},
		//对href 取参数
		getParam: function (href, key) {
			var _href = href + '',
				regexp = eval("/(\\?|\\&)" + key + "=([^\\&]+)/i"),
				value = _href.match(regexp);
			return (value && value[2]) ? value[2] : ''
		},
		// string -->  json
		parseJSON: function(string){
			// Attempt to parse using the native JSON parser first
			if ( window.JSON && window.JSON.parse ) {
				return window.JSON.parse( string );
			}
			return eval("(" + string + ")");
		},
		// json-->string
		parse: function(obj){
			if (window.JSON) { //如果是IE8+ 浏览器(ff,chrome,safari都支持JSON对象)，使用JSON.stringify()来序列化
				return JSON.stringify(obj);
			}
			var t = typeof(obj);
			if (t != "object" || obj === null) {
				if (t == "string") {
					var strRet = '';
					for (var i = 0; i < obj.length; i++) {
						if (obj.charAt(i) == '\"' || obj.charAt(i) == '\\') {
							strRet += '\\';
						}
						strRet += obj.charAt(i);
					}
					return '"' + strRet + '"';
				}
				return String(obj);
			} else {
				var n, v, json = [],
					arr = (obj && obj.constructor == Array);
				var self = arguments.callee;
				for (n in obj) {
					v = obj[n];
					t = typeof(v);
					if (obj.hasOwnProperty(n)) {
						if (t == "string") {
							var strRet = '';
							for (var i = 0; i < v.length; i++) {
								if (v.charAt(i) == '\"' || v.charAt(i) == '\\') {
									strRet += '\\';
								}
								strRet += v.charAt(i);
							}
							v = '"' + strRet + '"';
						} else if (t == "object" && v !== null) {
							v = self(v);
						}
						json.push((arr ? "" : '"' + n + '":') + String(v));
					}
				}
				return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
			}
		},

		//2、缓存 （在开发）
		// 用对象形式 缓存数据
		data: function (dataName, dataValue) {
			var _this = this;
			if (arguments[1]) {
				_this.catchDataArray[arguments[0]] = dataValue
				return;
			} else {
				return _this.catchDataArray[arguments[0]];
			}
		},
		// 用对象形式 清除缓存数据
		removeData: function (dataName) {
			var _this = this;
			if (!arguments[0]) return;
			var _data = _this.catchDataArray[arguments[0]]
			_this.catchDataArray[arguments[0]] = null
			return _data;
		}
	})

	/* dialog ui
	 参数:  1 弹窗 id ,没有时 create 一个；(可选)
	 2 关闭xx 的class ;   (可选)
	 3 submit_id, 提交的id ; (可选)
	 4 取消的 id ; (可选)
	 5 content 可以是 '<br />' (可选)
	 6 closeFn xx 的回调 (可选)
	 7 submitFn 提交 的回调 (可选)
	 8 resetFn 取消 的回调 (可选)
	 */
	Kaiser.extend({
		dialogShow: function (id, close_id, submit_id, reset_id, content, closeFn, submitFn, resetFn) {
			var _this = this
			this.add_wrap()
			if (id) {
				Kaiser.divToCenter(id)
				var _div = Kaiser('#' + id)
				var _next_index = _this.all_z_index_stack.slice().pop() * 1 + 1000;
				_div[0].style.zIndex = _next_index
				//_div[0].style.top = '10px'
				_div[0].style.display = 'block';
				_this.all_z_index_stack.push(_next_index);
			}

			if (close_id) {
				var _close_div = Kaiser('#' + close_id)
				//这里有个bug，有空再改

				var close_id_dialog = function () {
					Kaiser.dialogClose(id, close_id, submit_id, true)
					if (typeof(closeFn) == 'function') {
						var _closeFn = function () {
							_this.all_z_index_stack.pop();
							closeFn()
						}
						_closeFn()
					}
				}
				var close_id_data_dialog = Kaiser.data(close_id + 'dialog')
				if (close_id_data_dialog) {
					Kaiser.removeData(close_id + 'dialog')
					_close_div[0].removeEventListener('click', close_id_dialog, false)
				}
				Kaiser.data(close_id + 'dialog', close_id_dialog)
				_close_div[0].addEventListener('click', close_id_dialog, false)
			}
			if (typeof(submitFn) == 'function') {
				var _submitBtn = Kaiser('#' + submit_id)

				var submit_id_dialog = submitFn

				var submit_id_data_dialog = Kaiser.data(submit_id + 'dialog')
				if (submit_id_data_dialog) {
					Kaiser.removeData(submit_id + 'dialog')
					_submitBtn[0].removeEventListener('click', submit_id_dialog, false)
				}
				Kaiser.data(submit_id + 'dialog', submit_id_dialog)
				_submitBtn[0].addEventListener('click', submit_id_dialog, false)
			}
			if (content) {
				var _message = document.createElement('div')
				var _text = document.createTextNode(content)
				_message.appendChild(_text)
				_message.id = 'Kaiser_message';
				_message.style.width = '230px';
				_message.style.height = '70px';
				_message.style.borderRadius = '4px';
				_message.style.fontSize = '16px';
				_message.style.color = '#7b0110';
				_message.style.fontWeight = 'bold';
				_message.style.padding = '20px';
				_message.style.lineHeight = '35px';
				_message.style.backgroundColor = '#FBEECC';
				_message.style.textAlign = 'center';
				_message.style.position = 'fixed';
				_message.style.zIndex = '10000';
				document.body.appendChild(_message)
				Kaiser.divToCenter('Kaiser_message')
			}
		},
		remove_wrap: function (layer) {
			var _this = this,
				_wrap_last = _this.z_index_stack.pop(),
				_wrap = document.createElement('div');
			if (!_wrap_last) return;
			_num = _wrap_last.charAt(_wrap_last.length - 1)
			var Kaiser_myWrap_num = Kaiser('#Kaiser_myWrap' + _num)
			Kaiser_myWrap_num[0].parentNode.removeChild(Kaiser_myWrap_num[0]);
			_this.all_z_index_stack.pop();
		},
		add_wrap: function () {
			var _this = this,
				_wrap_last = _this.z_index_stack.slice().pop(),
				Kaiser_myWrap_index = 2000,
				next_num = 1,
				_wrap = document.createElement('div');
			if (_wrap_last) {
				_num = _wrap_last.charAt(_wrap_last.length - 1)
				next_num = _num * 1 + 1
				Kaiser_myWrap_index = _this.all_z_index_stack[_this.all_z_index_stack.length - 1] + 1000;
			}
			_wrap.id = 'Kaiser_myWrap' + next_num;
			_wrap.style.backgroundColor = '#000';
			_wrap.style.opacity = '0.4';
			_wrap.style.width = Kaiser.getWindowWH().width + 'px';
			_wrap.style.height = Kaiser.getWindowWH().height + 'px';
			_wrap.style.position = 'fixed';
			_wrap.style.zIndex = Kaiser_myWrap_index;
			_wrap.style.left = '0px';
			_wrap.style.top = '0px';
			document.body.appendChild(_wrap)
			_this.z_index_stack.push(_wrap.id)
			_this.all_z_index_stack.push(Kaiser_myWrap_index)
		},

		dialogClose: function (id, close_id, submit_id, isCleanWrap) {
			var _this = this;
			if (id) {
				var _div = Kaiser('#' + id)
				_div[0].style.display = 'none';
				_this.all_z_index_stack.pop();
				_this.remove_wrap()
			}
			if (close_id) {
				var _close_idBtn = Kaiser('#' + close_id)
				var _dataFn = Kaiser.data(close_id + 'dialog')
				console.log(_dataFn)
				if (_dataFn) {
					_close_idBtn[0].removeEventListener('click', _dataFn, false)
				}
			}
			if (submit_id) {
				var _submit_btn = Kaiser('#' + submit_id)
				var _submit_idFn = Kaiser.data(submit_id + 'dialog')
				if (_submit_idFn) {
					_submit_btn[0].removeEventListener('click', _submit_idFn, false)
				}
			}
		},
		showLoading: function () {
			var _wrap = document.createElement('div')
			_wrap.id = 'Kaiser_Loading';
			_wrap.style.backgroundColor = '#000';
			_wrap.style.opacity = '0.4';
			_wrap.style.width = Kaiser.getWindowWH().width + 'px';
			_wrap.style.height = Kaiser.getWindowWH().height + 'px';
			_wrap.style.position = 'fixed';
			_wrap.style.zIndex = '500000';
			_wrap.style.left = '0px';
			_wrap.style.top = '0px';
			document.body.appendChild(_wrap)

			var _loading = document.createElement('div')
			_loading.id = 'Kaiser_Loading_img';
			_loading.style.background = '#fff url(../images/icon/loadingmin.gif) no-repeat center center';
			_loading.style.width = '68px';
			_loading.style.height = '68px';
			_loading.style.borderRadius = '4px';
			_loading.style.position = 'fixed';
			_loading.style.zIndex = '5000000';
			document.body.appendChild(_loading)
			Kaiser.divToCenter('Kaiser_Loading_img')

		},
		hideLoading: function () {
			var _wrap = Kaiser('#Kaiser_Loading')
			_wrap[0].parentNode.removeChild(_wrap[0]);
			var _loading = Kaiser('#Kaiser_Loading_img')
			_loading[0].parentNode.removeChild(_loading[0]);
		},
		error: function (message, time) {
			var _time = time || '2500';
			var _message = message || '网络异常，提交失败';
			this.dialogShow('', '', '', '', message)
			setTimeout(function () {
				Kaiser.remove_wrap()
				var _Kaiser_message = Kaiser('#Kaiser_message')
				if (_Kaiser_message.length >= 1) {
					_Kaiser_message[0].parentNode.removeChild(_Kaiser_message[0]);
				}
			}, _time)
		},
		alert: function (message, time) {
			var _time = time || '2000';
			var _message = message || '警告';
			this.dialogShow('', '', '', '', message)
			setTimeout(function () {
				Kaiser.remove_wrap()
				var _Kaiser_message = Kaiser('#Kaiser_message')
				if (_Kaiser_message.length == 1) {
					_Kaiser_message[0].parentNode.removeChild(_Kaiser_message[0]);
				}
			}, _time)
		}
	})


	//拓展 原型方法
	Kaiser.fn.extend({
		//Kaiser('.title').each(function(index, element){})
		each: function (callback, args) {
			return Kaiser.each(this, callback, args);
		},
		//事件兼容
		// 	•获得event对象兼容性写法
		// 	event || (event = window.event);
		// •获得target兼容型写法
		// 	event.target||event.srcElement
		// •阻止浏览器默认行为兼容性写法
		// 	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		// •阻止冒泡写法
		// 	event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);

		on: function (type, fn) {
			return this.each(function () {
				var _this = this;
				Kaiser.Event.addEvent(this, type, function (event) {
					var event = event || window.event
					event = Kaiser.Event.fixEvent(event)
					fn.call(_this, event)
				})
			});
		}
	})

	//3、ajax（在开发）
	Kaiser.Ajax = {
		createXHR: function() {
			if (window.XMLHttpRequest) {	//IE7+、Firefox、Opera、Chrome 和Safari
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {   //IE6 及以下
				var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
				for (var i = 0,len = versions.length; i<len; i++) {
					try {
						return new ActiveXObject(version[i]);
						break;
					} catch (e) {
						//跳过
					}
				}
			} else {
				throw new Error('浏览器不支持XHR对象！');
			}
		},
		//封装ajax，参数为一个对象
		ajax: function(obj) {
			var xhr = Kaiser.Ajax.createXHR();	//创建XHR对象
			//通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
			obj.url = obj.url + '?rand=' + Math.random();
			obj.data = Kaiser.Ajax.params(obj.data);  //通过params()将名值对转换成字符串
			//若是GET请求，则将数据加到url后面
			if (obj.method === 'get') {
				obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
			}
			if (obj.async === true) {   //true表示异步，false表示同步
				//使用异步调用的时候，需要触发readystatechange 事件
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
						callback();		 //回调
					}
				};
			}
			//在使用XHR对象时，必须先调用open()方法，
			//它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
			xhr.open(obj.method, obj.url, obj.async);
			//设置datetype:'json','xml','html','script','jsonp','text'
			var allTypes = "*/".concat("*");
			var accepts = {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			}
			xhr.setRequestHeader(
				"Accept",
				obj.dataType && accepts[ obj.dataType ] ?
				accepts[ obj.dataType ] + ( obj.dataType !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					accepts[ "*" ]
			);
			if (obj.method === 'post') {
				//post方式需要自己设置http的请求头，来模仿表单提交。
				//放在open方法之后，send方法之前。
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(obj.data);		//post方式将数据放在send()方法里
			} else {
				xhr.send(null);		//get方式则填null
			}
			if (obj.async === false) {  //同步
				callback();
			}
			function callback() {
				if (xhr.status == 200) {  //判断http的交互是否成功，200表示成功
					if('json' == obj.dataType){
						var json = Kaiser.parseJSON(xhr.responseText)
						obj.success(json);			//回调传递参数
					}else{
						obj.success(xhr.responseText);
					}

				} else {
					obj.error(xhr.status, xhr.statusText);
				}
			}
		},
		//名值对转换为字符串
		params: function(data) {
			var arr = [];
			for (var i in data) {
				//特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
				arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
			}
			return arr.join('&');
		}
	}
	Kaiser.extend({
		ajax: function(options){
			var options = Kaiser.extend({
				method : 'post',
				url : '',
				data : {},
				success : function (message) {
					alert(message);
				},
				async : true
			},options);
			Kaiser.Ajax.ajax(options)
		}
	})
	
	//4、事件模型(在开发)
	Kaiser.Event = {
		addEvent: function(element, type, fn){
			if(element.addEventListener){
				element.addEventListener(type, fn, false)
			}else{
				element.attachEvent('on'+type, fn)
			}
		},
		removeEvent: function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false)
			}else{
				element.detachEvent(type, handler)
			}
		},
		fixEvent: function( event ) {
			// Support: IE<9
			// Fix target property (#1925)
			if (!event.target) {
				event.target = event.srcElement || document;
			}
			if (!event.preventDefault) {
				event.preventDefault = function(){
					event.returnValue = false
				}
			}
			if(!event.stopPropagation){
				event.stopPropagation = function(){
					event.cancelBubble = true;
				}
			}
			return event;
		}
	}
	
	/*
	  5、工具函数
	
	function isArray(obj) {  
		return Object.prototype.toString.call(obj) === '[object Array]';   
	}
	*/
	/*工具函数 begain*/
	
	// Populate the class2type map
	Kaiser.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = Kaiser.type( obj );
	
		if ( type === "function" ) {
			return false;
		}
	
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}

	function toString(){
		return Object.prototype.toString()
	}
	/*工具函数 end*/

	/*
	* 6、 promise
	* 7、 event trigger
	*
	*
	*
	* */

	// Kaiser 放到window作用域
	window.Kaiser = Kaiser;
})(window, undefined)

/********************* 框架 end  ********************/


/********************* demo begain  ********************/

//框架使用者 拓展类方法
//Kaiser.myextend()
Kaiser.extend({
	myextend: function(){
		return 'extend';
	}
})

//框架使用者 拓展原型方法
//Kaiser().my_prototype_extend()
Kaiser.fn.extend({
	my_prototype_extend: function(){
		return 'fn.extend'
	}
})


















































