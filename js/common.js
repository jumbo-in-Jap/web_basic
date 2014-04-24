// common.js
// global value
    var DUMMY_SWAGGER_URL_DOMAIN = "http://www16095ui.sakura.ne.jp";
	var GOOGLE_ANALYTICS_ID = "UA-49394229-1";

    var _nowLoading = false;
    var _RequestParams = getParam();


//////////////////////////////// load Analytics

  // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
// 
  // ga('create', 'UA-49394229-1', 'sakura.ne.jp');
  // ga('send', 'pageview');

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', GOOGLE_ANALYTICS_ID]);
	_gaq.push(['_trackPageview']);
	var _googleAnalyticsTag = document.createElement('script'); 
	_googleAnalyticsTag.type = 'text/javascript'; 
	_googleAnalyticsTag.async = true;
	_googleAnalyticsTag.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var _s = document.getElementsByTagName('script')[0];
	_s.parentNode.insertBefore(_googleAnalyticsTag, _s);
	
	// tracking sample
	// _gaq.push(['_trackEvent', 'カテゴリ', 'アクション', 'ラベル', 1]);
	

//////////////////////////////// auto loader

        function AutoLoader(){
            this.init.apply(this, arguments);
        }
        AutoLoader.prototype = {
            threshold: 1,
            auto: true,
            page: 1,
            maxContentHeight: 1000000,
            loading: false,
            init: function(selector){
                this.window = $(window);
                this.target = $(selector);
                while (this.check()){
                    this.load();
                }
                this.autoLoad();
            },
            check: function(){
                if (!this.auto){
                    return;
                }
                var content = this.target.offset().top + this.target.height();
                var display = this.window.scrollTop() + this.window.height();
                // cl(content);
                // cl(display);
                if (content > this.maxContentHeight){
                    this.auto = false;
                }
                if (content - display < this.threshold && !_nowLoading ){// need to set global _nowLoading
                    return true;
                } else {
                    return false;
                }
            },
            load: function(){
                // 更新処理
                autoLoadAction();
            },
            autoLoad: function(){
                var self = this;
                self.window.scroll(function(){
                    if (self.check()){
                        if (this.loading){
                            return;
                        }
                        this.loading = true;
                        self.load();
                        // 仮に setTimeout で代用。AJAXなどでロードに時間がかかったときは onComplete などで処理します
                        setTimeout(function(){
                            this.loading = false;
                        }, 100);
                    }
                });
            }
        };

////////////////////////////////
var httpRequestJSONDefer =
{
	get: function(url, dataType, dataObj)
	{
                var defer = $.Deferred();
                $.ajax({
                    url: url,
                    data: dataObj,
                    dataType: dataType,
                    success: defer.resolve,
                    error: defer.reject
                });
                return defer.promise();
	},
	post: function(url, dataObj)
	{
                var defer = $.Deferred();
                $.ajax({
                    url: url,
                    data: dataObj,
                    type: "POST",
                    success: defer.resolve,
                    error: defer.reject
                });
                return defer.promise();
	}
}


////////////////////////////////
var httpRequest =
{
	get: function(url, dataType, dataObj, successCallback, failureCallback)
	{
		if(typeof successCallback === 'undefined') successCallback = defaultSuccessCallback;
		if(typeof failureCallback === 'undefined') failureCallback = defaultFailureCallback;
    	    $.ajax({
                  type: "GET",
                  scriptCharset: 'utf-8',
	      url: url,
	      dataType: dataType,
	      data: dataObj,
	      success: function(resData)
	      {
	      	successCallback(resData);
	      },
	      error: function(resData){
	      	failureCallback(resData);
	      }
	   });
	},
	post: function(url, dataType, dataObj, successCallback, failureCallback)
	{
		if(typeof successCallback === 'undefined') successCallback = defaultSuccessCallback;
		if(typeof failureCallback === 'undefined') failureCallback = defaultFailureCallback;
    	    $.ajax({
              type: "POST",
              scriptCharset: 'utf-8',
		      url: url,		      
		      dataType: dataType,
		      data: dataObj,
		      success: function(resData)
		      {
		      	successCallback(resData);
		      },
		      error: function(resData){
		      	failureCallback(resData);
		      }
		   });
	}
}

function defaultSuccessCallback(data)
{
	cl("success - httpRequest");
	cl(data);
}
function defaultFailureCallback(data)
{
	cl("failure - httpRequest");
	cl(data);
}
//////////////////////////////////////////////////////////////////////////////////////////////// - Utils
// page resource

function getParam() {
    if (1 < document.location.search.length) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
                var query = document.location.search.substring(1);
 
                // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');
 
                var result = new Object();
                for (var i = 0; i < parameters.length; i++) {
                    // パラメータ名とパラメータ値に分割する
            var element = parameters[i].split('=');
 
                    var paramName = decodeURIComponent(element[0]);
                    var paramValue = decodeURIComponent(element[1]);
 
                    // パラメータ名をキーとして連想配列に追加する
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result;
    }
    return null;
}
//////////////////////////////////////////////////////////////////////////////////////////////// - Utils
/// set push 
// http://hideack.hatenablog.com/entry/20120129/1327821318
// とりあえず一画面1pushにする
function _setPusher(channelName, eventName, method)
{              
   	var pusher = new Pusher('095b69a972144ba517c7');
    var channel = pusher.subscribe(channelName);
    channel.bind(eventName,method);	
}

//////////////////////////////////////////////////////////////////////////////////////////////// - Utils

function cl(obj)
{
	console.log(obj);
}

function dump(dumped)
{
	$.each(dumped, function(key, value){ cl(key);cl(value);});
}

//////////////////////////////////////////////////////////////////////////////////////////////// - Utils
// other method
    function getYoutubeMovieTag(url)
    {
    	if(!url)return;
    	var textArr = url.split("/");
    	var tag = textArr[textArr.length - 1];
    	tag = tag.replace("watch?v=","");
    	return tag;
    }
    
    function getYoutubeThumbnail(url, num)
    {
    	var tag = getYoutubeMovieTag(url);
    	return "http://i.ytimg.com/vi/"+tag+"/"+num+".jpg";
    }
    function getYoutubeThumbnails(url)
    {
    	var tag = getYoutubeMovieTag(url);
    	var thumbnails = [getYoutubeThumbnail(url,0),getYoutubeThumbnail(url,1),getYoutubeThumbnail(url,2)]
    	return thumbnails;
    }
    
    function changedShowedCount()
    {
    	var lv = localStorage.lv;
    	var exp = localStorage.exp;
    	
    	exp--;
    	
    	if(exp == 0)
    	{
    		lv++;	
    		exp = 5;
    	}
    	localStorage.lv = lv;
    	localStorage.exp = exp;
    	
    }
    
//////////////////////////
///// animation method

function setFadeImage(selecterName)
{
	$('.'+selecterName+' img:gt(0)').hide();
	var timerId = setInterval(function() {
		$('.'+selecterName+' :first-child').fadeOut().next('img').fadeIn().end().appendTo('.'+selecterName);
	},1000 + getRandFromRange(1000,2000));
	cl(timerId);
	$("."+selecterName).attr('time',timerId);
}

function String2DOM(s)
{
	cl(s);
    var n = document.createElement("div");
    n.innerHTML = s;
    return n.firstChild;
}
//////////////////////////
//// math medthod
function getRandFromRange(lower, upper)
{
	var range = upper - lower;
	return Math.floor( Math.random() * range );
}

function nl2br(str) {
    return str.replace(/[\n\r]/g, "<br />");
}
