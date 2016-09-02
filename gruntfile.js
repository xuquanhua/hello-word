module.exports = function(grunt) {
	grunt.file.defaultEncoding = 'utf8';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {
			online: 'ResFltIntlOnline/Booking/online'
		},
		uglify: {
			page: {
				options:{
					ASCIIOnly: true,
					maxLineLen: 0
				},
				files: [
					{
						expand: true,
						cwd: 'build/',
						src: '*.js',
						dest: '<%= dirs.online %>/home/'
					}
				]
			}
		},
		concat: {
			page:{
				options:{
					separator:'',
					banner:'(function($, w){\r\n',
					footer:'\r\n})(window.cQuery, window);'
				},
				files:{
					'build/seat.js':[
						'package/util/RegisterMod.js',
						'package/service/SeatService.js'
					],
					'build/RegisterMod.js':[
						'package/util/RegisterMod.js'
					],
					'build/complete.js':[
						'package/util/online/ajax.js',
						'package/util/online/drag.js',
						'package/util/online/bgiframe.js',
						'package/util/Window.js',
						'package/service/deliver/PCDSelectorService.js',
						'package/util/Ubt.js',
						'package/util/RegisterMod.js',
						'package/service/public/GiftShow.js',		//礼盒展示
						'package/util/online/emsTips.js',
						'package/action/CompleteAction.js'
					],
					'build/review.js':[
						'package/util/BuildTGQ.js',
						'package/util/online/getEndorseBack.js',
						'package/service/public/getEndorseText.js',//Hook getEndorseBack.js 中的方法
						'package/util/online/ajax.js',
						'package/util/online/drag.js',
						'package/util/online/bgiframe.js',
						'package/util/Window.js',
						'package/util/On.js',
						'package/service/public/PriceService.js',
						'package/util/RegisterMod.js',
						'package/util/SelectModel.js',
						'package/util/FnExtend.js',
						'package/service/public/TaskStayTimeService.js',
						'package/util/Ubt.js',
						'package/service/GetReservationResultService.js',
						'package/service/public/GiftShow.js',//礼盒展示
						'package/service/public/WifiShowAirport.js',//显示wifi取还件图片
						'package/util/online/emsTips.js',
						'package/action/ReviewAction.js'
					],
					'build/online.js':[
						'package/Online.js',
						'package/util/online/string.js',
						'package/util/online/event.js',
						'package/util/online/exchangeCity.js',
						'package/util/online/dom.js'
					],
					'build/index.js':[
						'package/service/IndexService.js',
						'package/service/public/ValidateService.js',
						'package/service/public/SearchWaitService.js',
						'package/util/Multipass.js',
						'package/config/RegisterMod.new.airline.js',
						'package/config/RegisterMod.new.address.js',
						'package/util/RegisterMod.js',
						'package/util/online/maskShow.js',
						'package/util/SeoSearchUrl.js',
						'package/service/index/SearchHotelService.js',
						'package/action/IndexAction.js'
					],
					'build/index_new.js':[
						'package/service/index/AjaxTabService.js',
						'package/util/online/validateMultiQuantity.js',//成人儿童一起定验证逻辑
						'package/util/online/emsTips.js',
						'package/service/IndexNewService.js',
						'package/service/public/ValidateService.js',
						'package/service/public/SearchWaitService.js',
						'package/util/Multipass.js',
						'package/config/RegisterMod.new.airline.js',
						'package/config/RegisterMod.new.address.js',
						'package/util/RegisterMod.js',
						'package/util/online/maskShow.js',
						'package/util/SeoSearchUrl.js',
						'package/util/ReportDefaultSearchData.js',
						'package/service/index/SearchHotelService.js',
						'package/service/index/SearchPrefereService.js',//搜索偏好
						'package/action/IndexNewAction.js'
					],
					'build/indexFuzzy.js':[
						'package/util/IsBack.js',
						'package/service/Fuzzy/Datepicker.js',
						'package/service/Fuzzy/IndexFuzzyService.js'
					],
					'build/flightQuery.js':['package/config/RegisterMod.new.address.js','package/util/RegisterMod.js','package/service/FlightQueryService.js'],
					'build/endorse.js':['package/util/RegisterMod.js','package/util/online/tmpl.js','package/util/SelectAddress.js','package/service/EndorseService.js','package/action/EndorseTicketAction.js','package/util/Window.js','package/util/online/bgiframe.js','package/util/online/drag.js'],
					//新版改签页
					'build/NewEndorse.js':[
						'package/util/RegisterMod.js',
						'package/util/online/drag.js',
						'package/util/online/bgiframe.js',
						'package/util/Window.js',
						'package/util/On.js',//对cQuery的扩展
						'package/util/FnExtend.js',
						'package/config/RegisterMod.new.airline.js',
						'package/service/NewEndorse/tmpl/origFlightTmpl.js',
						'package/service/NewEndorse/tmpl/simpleFlightTmpl.js',
						'package/service/NewEndorse/tmpl/checkFlightTmpl.js',
						'package/service/NewEndorse/tmpl/completeTmpl.js',
						'package/service/NewEndorse/NewEndorseService.js',
						'package/action/NewEndorseAction.js'
					],
					//首页特惠日历
					'build/calendar.js':['package/service/index/CalendarService.js'],
					//多程
					'build/multipass.js':['package/util/Multipass.js'],
					'build/showPicture.js':[
						'package/util/online/drag.js',
						'package/service/public/SlideService.js',
						'package/service/result/ShowPictureService.js'
					],
					'build/miniLoader.js':[//用于搜索结果提交加载的加载器
						'package/service/NewResult/simpleLoader.js'
					],
					'build/securityVerify.js':[//用于乘机人页下一步时,安全校验
						'package/service/public/SecurityVerify.js'
					],
					//搜索结果页新版
					'build/NewSearchResult.js':[
						'package/util/BuildTGQ.js',
						'package/util/online/getEndorseBack.js',
						'package/util/online/getStopoverVisaInfo.js',//用于获取过境签
						'package/config/RegisterMod.new.airline.js',
						'package/config/RegisterMod.new.address.js',
						'package/util/RegisterMod.js',
						'package/util/Multipass.js',
						'package/util/online/maskShow.js',
						'package/service/public/ValidateService.js',
						'package/util/online/validateMultiQuantity.js',//成人儿童一起定验证逻辑
						'package/util/online/showPriceTips.js',//成人儿童一起定显示价格浮层
						'package/util/SeoSearchUrl.js',
						'package/util/On.js',//对cQuery的扩展
						'package/config/SingleFilterConfig.js',//单程过滤参数
						'package/service/NewResult/Uniq.js',
						'package/service/NewResult/Filter.js',
						'package/service/NewResult/Matrix.js',
						'package/service/NewResult/AddtionService.js',//3+x产品
						'package/service/NewResult/NewResult.js',//对cQuery的扩展
						'package/service/NewResult/Page.js',//上一页,下一页
						'package/service/NewResult/searchHistory.js',
						'package/service/NewResult/TicketRecommend.js',//低价机票推荐
						'package/service/NewResult/LowReturnRecommend.js',//往返低价推荐
						'package/service/NewResult/DrecommendService.js',//单推往返(soto)
						'package/service/NewResult/tmpl/flightListTmpl.js',
						'package/service/NewResult/tmpl/priceTmpl.js',
						'package/service/NewResult/tmpl/matrixTmpl.js',
						'package/service/NewResult/tmpl/ticketRecommendTmpl.js',
						'package/service/public/GiftShow.js',//礼盒展示
						'package/util/online/emsTips.js',
						'package/action/NewResultAction.js'
					],
					//搜索无结果
					'build/NoResult.js':['package/service/NewResult/Noresult.js'],
					//UI2.0搜索结果页航司图片展示
					'build/NewResultShowPicture.js':[
						'package/service/public/SlideService.js',
						'package/service/result/ShowPictureService.js',
						'package/service/NewResult/NewResultShowPicture.js'
					],
					//UI2.0订单详情页
					'build/orderDetail.js':[
						'package/util/online/drag.js',
						'package/util/online/maskShow.js',
						'package/util/online/bgiframe.js',
						'package/util/Window.js',
						'package/util/RegisterMod.js',
						'package/util/Paging.js',
						'package/util/On.js',
						'package/util/FnExtend.js',
						'package/util/BuildTGQ.js',
						'package/service/public/GiftShow.js',//礼盒展示
						'package/service/deliver/NewPCDSelectorService.js',//新数据源
						'package/util/online/emsTips.js',
						'package/action/orderDetailAction.js'
					],
					//订单详情页报销凭证模块
					'build/orderDetailDelivery.js':['package/service/public/ContactService.js','package/util/online/emsTips.js','package/service/OrderDetailDelivery.js'],
					//发送订单信息&补发行程单
					'build/sendBill.js':[
						'package/util/RegisterMod.js',
						'package/service/public/ContactService.js',
						'package/service/deliver/PCDSelectorService.js',
						'package/service/deliver/NewPCDSelectorService.js',//新数据源
						'package/action/SendBillAction.js'
					],
					//搜索结果页
					'build/result.js':[
						'package/util/BuildTGQ.js',
						'package/util/online/getEndorseBack.js',
						'package/util/online/getStopoverVisaInfo.js',
						'package/util/online/maskShow.js',
						'package/util/SelectAddress.js',
						'package/config/RegisterMod.new.airline.js',
						'package/config/RegisterMod.new.address.js',
						'package/util/RegisterMod.js',
						'package/util/Multipass.js',
						'package/service/ResultService.js',
						'package/service/result/AsynResultService.js',
						'package/service/result/FilterAirService.js',
						'package/service/result/LowPriceKBService.js',
						'package/service/public/SearchWaitService.js',
						'package/service/public/ValidateService.js',
						'package/util/Ubt.js',
						'package/util/SeoSearchUrl.js',
						'package/action/ResultAction.js',
						'package/action/SingleResultAction.js'
					],
					'build/book.js':[
						'package/util/BuildTGQ.js',
						'package/util/XMoreProduct.js',
						'package/util/online/getEndorseBack.js',
						'package/service/public/getEndorseText.js',
						'package/config/RegisterMod.nationality.js',
						'package/util/RegisterMod.js',
						'package/util/FnExtend.js',
						'package/util/online/ajax.js',
						'package/util/online/drag.js',
						'package/util/online/maskShow.js',
						'package/util/online/bgiframe.js',
						'package/util/SelectModel.js',
						'package/util/Window.js',
						'package/util/Paging.js',
						'package/util/Ubt.js',
						'package/util/On.js',
						'package/util/Map.js',
						'package/util/IsBack.js',
						'package/service/OrderService.js',
						'package/service/public/ContactService.js',
						'package/service/public/PriceService.js',
						'package/service/public/ManCangService.js',
						'package/service/public/TaskStayTimeService.js',
						'package/service/public/GiftShow.js',//礼盒展示
						'package/service/order/ValidateService.js',
						'package/service/order/PassengerService.js',
						'package/service/order/InsuranceService.js',
						'package/service/order/XPromotionService.js',//X产品营销
						'package/service/order/ShuttleService.js',
						'package/service/order/CommonUserNameService.js',
						'package/service/order/DiscountCcodeService.js',
						'package/service/order/ChangePassenger.js',//更改乘客人数模块
						'package/service/deliver/TabService.js',
						'package/service/deliver/PCDSelectorService.js',
						'package/service/deliver/NewPCDSelectorService.js',//新数据源
						'package/service/WifiServiceV2.js',
						'package/util/online/emsTips.js',
						'package/service/NewDeliverService.js',
						'package/service/LoungeService.js',
						'package/service/order/BaggageService.js',
						'package/service/order/Destination.js',
						'package/service/order/HkgtrainService.js',
						'package/action/OrderAction.js'
					],
					//打印出行单
					'build/printItinerary.js':[
						'package/service/print/ItineraryService.js',
						'package/action/ItineraryAction.js'
					],
					//附加产品详情页
					'build/xProductDetail.js':[
						'package/util/RegisterMod.js',
						'package/util/online/bgiframe.js',
						'package/util/online/drag.js',
						'package/util/Window.js',
						'package/util/On.js',
						'package/util/Map.js',
						'package/service/public/WifiShowAirport.js',//显示wifi取还件图片
						'package/action/XProductDetailAction.js'
					],
					//在线提交退票申请
					'build/FltRefundTicket.js':[
						'package/util/Paging.js',
						'package/util/RegisterMod.js',
						'package/util/FnExtend.js',
						'package/service/public/ContactService.js',
						'package/service/deliver/PCDSelectorService.js',
						'package/service/deliver/NewPCDSelectorService.js',//新数据源
						'package/service/RefundTicket/Unsubscribe_XService.js',//X产品退订
						'package/action/FltRefundTicketNew.js'
					],
					//旧版本
					'build/public.js':'package/oldVersion/public.src.js'
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true,cwd: 'package/resource', src: '**/*.js', dest: '<%= dirs.online %>/home/'},
					{expand: true,cwd: 'package/template', src: '**/*.js', dest: '<%= dirs.online %>/home/'},
					{expand: true,cwd: 'package/oldVersion/tuna', src: '**/*.js', dest: '<%= dirs.online %>/home/'}
				]
			}
		},
		watch: {
			scripts: {
				files: ['package/**/*.js'],
				tasks: ['newer:copy', 'newer:concat', 'newer:uglify']
			}
		}
	});

	[
		'grunt-contrib-uglify',
		'grunt-contrib-watch',
		'grunt-contrib-concat',
		'grunt-contrib-copy',
		'grunt-newer'
	].forEach(function(v){
		grunt.loadNpmTasks(v);
	});

	grunt.registerTask('default', ['copy', 'concat', 'uglify']);
	grunt.registerTask('w', ['copy', 'concat', 'uglify', 'watch']);
	grunt.registerTask('build', ['newer:copy', 'newer:concat', 'newer:uglify']);
};
