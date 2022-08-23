
(function b(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ?
		module.exports = factory() : typeof define === 'function' && define.amd ?
			define(factory) : (global = global || self, global.Vue = factory());

})(this, function () {
	'use strict'
	// 创建一个空对象  并且冻结
	//Object.freeze() 方法可以冻结一个对象。
	//一个被冻结的对象再也不能被修改；
	//冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，
	//不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。
	//此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。
	var emptyObject = Object.freeze({});

	// 判断值是 null 和 undefined
	//undefined 和 null 是 Javascript 中两种特殊的原始数据类型(Primary Type)，它们都只有一个值，分别对应 undefined 和 null
	function isUndef(v) {
		return v === undefined || v === null;
	}

	// 判断值不是 null 和 undefined
	function isDef(v) {
		return v !== undefined && v !== null;
	}

	// 判断是否是真值
	function isTrue(v) {
		return v === true;
	}

	// 判断是否假
	function isFalse(v) {
		return v === false;
	}

	/**
	 * 判断是否是原始类型的值
	 */
	function isPrimitive(value) {
		return (typeof (value) === 'string' || typeof (value) === 'number' || typeof (value) === 'boolean' || typeof (value) === "symbol");
	}
	/**
	 * 快速对象检查-主要用于告知
	 *当我们知道值时，从原始值中提取对象
	 *是符合JSON的类型
	 * @param {Object} value
	 */
	function isObject(obj) {
		return obj !== null && typeof (obj) === "object"
	}

	//获取值的原始类型字符串。，[object Object].
	var _toString = Object.prototype.toString;

	// 获取数据类型
	function toRawType(value) {
		return _toString.call(value).slice(8, -1);
	}

	// 判断是否是纯对象
	function isPlainObject(obj) {
		return _toString.call(obj) === '[object Object]'
	}

	// 判断是否是正则
	function isRefExp(v) {
		return _toString.call(v) === '[object RegExp]';
	}

	//检查val是否是有效的数组索引。
	// isFinite  检测指定参数是否为无穷大。
	function isValidArrayIndex(val) {
		var n = parseFloat(String(val));
		return n >= 0 && Math.floor(n) === n && isFinite(val);
	}

	// 拍段是否是promise 函数
	function isPromise(val) {
		return (isDef(val) && typeof val.then === "function" && typeof val.catch === "function");
	}

	//JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
	//JSON.stringify(value[, replacer[, space]])
	//value:必需， 要转换的 JavaScript 值（通常为对象或数组）。

	// replacer:可选。用于转换结果的函数或数组。
	// 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
	//如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

	// space:
	//可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 也可以使用非数字，如：\t。
	function toString(val) {
		return val == null ? '' : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) ?
			JSON.stringify(val, null, 2) :
			String(val);
	}
	// NaN==> Not a number
	// 全局属性 NaN 的值表示不是一个数字（Not-A-Number） 
	//NaN 如果通过 ==、 !=、 ===、以及 !== 与其他任何值比较都将不相等--包括与其他 NaN 值进行比较。
	//必须使用 Number.isNaN() 或 isNaN() 函数。在执行自比较之中：也只有 NaN 不等于它自己。


	//isNaN()  方法用于判断传递的值是否为 NaN，如果值为 NaN 则返回 true，否则返回 false
	//当我们向isNaN传递一个参数，它的本意是通过Number()方法尝试将这参数转换成Number类型，如果成功返回false，如果失败返回true。
	// 所以isNaN只是判断传入的参数是否能转换成数字，并不是严格的判断是否等于NaN。

	//Number.isNaN()
	//判断传入的参数是否严格的等于NaN(也就是 ===)。
	//Number.isNaN() 方法用于判断传递的值是否为 NaN，并且检查其类型是否为 Number，如果值为 NaN 且类型为 Number，则返回 true，否则返回 false。



	//isNaN() 和 Number.isNaN() 之间的区别：
	//Number.isNaN不存在类型转换的行为。
	//如果当前值是 NaN，或者将其强制转换为数字后将是 NaN，则前者isNaN()将返回 true。而后者Number.isNaN() 仅当值当前为 NaN 时才为 true：

	function toNumber(val) {
		var n = parseFloat(val);
		return isNaN(n) ? val : n;
	}

	//制作一个映射并返回一个函数，用于检查 在那张映射上。
	function makeMap(str, expectsLowerCase) {
		var map = Object.create(null);
		var list = str.split(',');
		for (var i = 0; i < list.length; i++) {
			map[list[i]] = true;
		}

		return expectsLowerCase ? function (val) {
			return map[val.toLowerCase()]
		} : function (val) {
			return map[val];
		}
	}


	//检查标记是否为内置标记。
	var isBuiltInTag = makeMap('slot,component', true);

	//检查属性是否为保留属性。
	var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

	// 数组中删除指定的值
	function remove(arr, item) {
		if (arr.length) {
			var index = arr.indexOf(item);
			if (index > -1) {
				return arr.splice(index, 1)
			}
		}
	}

	// 判断是否有自己的属性
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// 判断对象是否有自己的属性
	function hasOwn(obj, key) {
		return hasOwnProperty.call(obj, key)
	}

	// 创建缓存版本
	function cached(fn) {
		var cache = Object.create(null);
		return (function cachedFn(str) {
			var hit = cache[str];
			return hit || (cache[str] = fn(str))
		})
	}

	//. 匹配单个的任意字符
	// [范围] 匹配单个范围内的字符
	// [0-9] 匹配单个数字0-9
	// [a-zA-Z0-9_] 匹配单个的数字、字母下划线
	// [^范围] 匹配任意一个除括号范围内的字符
	// [^0-9] 匹配任意一个非数字字符
	// \w 匹配单个的数字、字母下划线 等价于 [a-zA-Z0-9_]
	// \W 匹配单个非数字、字母下划线
	// \d 匹配单个数字 等价于 [0-9]
	// \D 匹配单个非数字 等价于 [^0-9]
	// \w 匹配单个的数字、字母下划线 等价于 [a-zA-Z0-9_]
	// \s 匹配任意单个的空白字符
	// \S 匹配任意单个非空白字符
	// x? 匹配0个或者1个x
	// x+ 匹配至少一个x字符
	// x* 匹配任意个x字符
	// **x{m,n}**匹配至少m个，最多n个x字符，包括n
	// x{n} 必须匹配n个x字符
	// (xyz)+ 小括号括起来的部分是当做单个字符处理
	// 4.锚字符
	// ^ 行首匹配 必须以这个正则开头
	// $ 行尾匹配 必须以这个正则结尾
	// . 代表字符.的意思
	// * 代表字符*的意思
	var camelizeRE = /-(\w)/g;

	var camelize = cached(function (str) {
		return str.replace(camelizeRE, function (_, c) {
			return c ? c.toUpperCase() : '';
		})
	})

	//首字母字符串大写。
	var capitalize = cached(function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	})

	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cached(function (str) {
		return str.replace(hyphenateRE, '-$1').toLowerCase();
	})

	function polyfillBind(fn, ctx) {
		function boundFn(a) {
			var l = arguments.length;
			return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) :
				fn.call(a);
		}
		boundFn._length = fn.length;
		return boundFn;
	}

	// 改变this指向到 ctx
	function nativeBind(fn, ctx) {
		return fn.bind(ctx);
	}

	var bind = Function.prototype.bind ? nativeBind : polyfillBind;

	//将伪数组转换为实数组
	function toArray(list, start) {
		start = start || 0;
		var i = list.length - start;
		//Array 构造器会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 arrayLength 参数）
		var ret = new Array(i);
		while (i--) {
			ret[i] = list[i + start];
		}
		return ret;
	}

	// 把一个对象上的属性赋值到另一个对象上
	function extend(to, _from) {
		for (var key in _from) {
			to[key] = _from[key]
		}
		return to;
	}

	// 将对象数组 转成对象
	function toObject(arr) {
		var res = {};
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]) {
				extend(res, arr[i]);
			}
		}
		return res;
	}

	function noop(a, b, c) {
	}

	// 一直返回false
	var no = function (a, b, c) {
		return false;
	}

	// 返回传入 的值
	var identity = function (_) {
		return _;
	}

	//从编译器模块生成包含静态键的字符串。
	function genStaticKeys(modules) {
		return modules.reduce(function (keys, m) {
			return keys.concat(m.staticKeys || [])
		}, []).join(',')
	}

	//检查两个值是否大致相等-即，
	//深度比较2个值是否完全相等
	function looseEqual(a, b) {
		if (a === b) {
			return true;
		}
		var isObjectA = isObject(a);
		var isObjectB = isObject(b);
		// 当2个都是object
		if (isObjectA && isObjectB) {
			try {
				var isArrayA = Array.isArray(a);
				var isArrayB = Array.isArray(b);
				// 都是数组的时候
				if (isArrayA && isArrayB) {
					//array.every(function(currentValue,index,arr), thisValue)
					return a.length === b.length && a.every(function (e, i) {
						return looseEqual(e, b[i])
					})
				} else if (a instanceof Date && b instanceof Date) {
					// 都是时间类型的时候
					return a.getTime() === b.getTime();
				} else if (!isArrayA && !isArrayB) {
					// 不是数组 都是对象的时候
					var keyA = Object.keys(a);
					var keyB = Object.keys(b);
					a
					return keyA.length === keyB.length && keyA.every(function (key) {
						return looseEqual(a[key], b[key])
					})
				} else {
					return false;
				}
			} catch (error) {
				return false;
			}
		} else if (!isObjectA && !isObjectB) {
			return String(a) === String(b);
		} else {
			return false;
		}

	}

	// 深度查找一个值在数组中的索引
	// 返回数组中第一个匹配到的val值的索引(如果值是一个对象，这个数组必须包含相同的对象) 如果不存在返回-1

	function looseIndexOf(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (looseEqual(arr[i], val)) {
				return i;
			}
		}
		return -1;
	}

	//确保函数只调用一次。
	function once(fn) {
		var called = false;
		if (!called) {
			called = true;
			fn.apply(this, arguments)
		}
	}

	var SSR_ATTR = 'data-server-rendered'
})