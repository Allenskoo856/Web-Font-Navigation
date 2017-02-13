//************************************开始数据遍历********************************************//
var oNavs = "";
var oFronts = "";

var nav_lists;
var oBject;
for(sum1 in FrontGuide['main']){

    //oBject解析的是[main]数组里面的第几个数组,方便设置锚点
    //sum1指的是main数组里面的第多少个
    oBject = FrontGuide['main'][sum1];

    // 动态解析json数据生成头部nav导航栏的a标签
    var oPageT1 = oBject['pageT1'];
    nav_lists = '<a href="#page_' + sum1 + '" class="item header_nav"><li>' + oPageT1 + '</li></a>';
    oNavs+= nav_lists;

    // 获得每一个导航页面的小组标题
    var pageC1 = oBject['pageC1'];

   //生成页面主体
    oFronts += '<div id="_page_' + sum1 + '" class="content_list"><div class="content_list_title">' + oPageT1 + '</div><div class="content_list_main"><div class="main_classify">';

    //第二次数据遍历PageC1,生成小组每行头部
    for(sum2 in pageC1){
        var oPage2 = pageC1[sum2];
        var oPageT2 = oPage2['pageT2'];

        var pageC2 = oPage2['pageC2'];

        oFronts += '<div class="main_classify_name">' + oPageT2 + '</div><div class="main_classify_war">';

        // 第三次数据遍历pageC2,生成每行的a链接与信息
        for(sum3 in pageC2){
            var oPage3 = pageC2[sum3];
            var oNames = oPage3['Name'];
            var oTitles = oPage3['Title'];
            var oHrefs = oPage3['Href'];
            var oNews = oPage3['New'];
            var oBuer = oPage3['Buer'];

          //进行判断是否增加字体图标   
            var nNt = "";
            if(oNews == 1){
                nNt = '<i class="Icon-New">NEW</i>'; //最近增加的图标
            }
            if (oBuer == 1) {
                nNt = '<i class="Icon-Buer">BUER</i>'; //我的网站的图标
            }
          
            oFronts += '<a title="' + oTitles + '" href="' + oHrefs + '" target="_blank"><div class="main_classify_list">' + oNames + '</div></a>' + nNt;
        }
        oFronts += "</div>";
    }
    oFronts += "</div></div></div>";
}
// 追加数据到内容之中
oFronts = '<div id="content_war" class="content_war war">' + oFronts + '</div>';

//填充导航栏的数据
 document.getElementById("header_nav").innerHTML = oNavs;
 document.getElementById("navbar-fixed").innerHTML = oNavs;
// 填充目录链接的数据
 document.getElementById("content").innerHTML = oFronts;

 //************************************数据遍历完成**************************************************//


//************************************开始JS 链接动态交互操作*********************************************//
// 等待DOM加载完成
$(document).ready(function(){
      
    //点击底部按钮返回顶部
    $(document).on('click','#backTop',function(){
        $("html, body").animate({"scroll-top":0},600,'easeInOutQuint');
    });
    
    //页面滚动到距顶部600px出现/消失返回顶部按钮
    $(window).scroll(function(){
        var targetTop = $(this).scrollTop();

        if(targetTop > 600){
            $('#backTop').animate({'right':'0'},200);
        }else if(targetTop <= 600){
            $('#backTop').stop();
            $('#backTop').animate({'right':'-40px'},200);
        }
    });
    
    //点击顶端导航目录跳转锚链接
    $(document).on('click','.header_nav',function(){
        var targetId = '_'+$(this).attr('href').substr(1);
        var targetHeight = document.getElementById(targetId).offsetTop;
        $("html, body").animate({"scroll-top": targetHeight-70},600,'easeInOutQuint');
        // 点击过后改变其颜色
        $('.header_nav li').css('color','#fff');
        $(this).find('li').css('color','#22F2C8');
    });
    
    //重新刷新页面时候,跳转到之前点击的主目录锚链接处
    var hrefId = '_' + location.href.split('#')[1];
    if(location.href.split('#')[1]){
        var hrefHeight = document.getElementById(hrefId).offsetTop;
        $("html, body").animate({"scroll-top": hrefHeight-70},600,'easeInOutQuint');
    }
});

    //内容的a标签显示title提示
    $("a[title]").each(function() {
        var a = $(this);
        var title = a.attr('title');
        if (title == undefined || title == "") return;
        a.data('title', title).removeAttr('title').hover(

        function() {
            var offset = a.offset();
            $("<div id=\"TitleTip\"></div>").appendTo($("body")).html(title).css({
                top: offset.top + a.outerHeight() + 10,
                left: offset.left + a.outerWidth()/2 + 1
            }).fadeIn(function() {
                var pop = $(this);
                setTimeout(function() {
                    pop.remove();
                }, pop.text().length * 800);
            });
        }, function() {
            $("#TitleTip").remove();
        });
    });
//************************************开始JS动态交互操作完毕*********************************************//


//************************************JQuery 动态减速插件*********************************************//
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });
//************************************JQuery 加速减速插件*********************************************//

//************************************导航栏JS特效以及搜索框特效*********************************************//
    // 搜索框的 logo 的动态效果展示
    $('#logo').hover(function(){
        $(this).addClass('fa-spin text-red-inverted');
    }, function(){
        $(this).removeClass('fa-spin text-red-inverted');
    });

    // 等待DOM加载完毕
    $(document).ready(function(){
         // 下拉宽度后显示固定的导航栏
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });
    });

    // 定义相对路径链接
     var urlPrefix = 'http://nav.zonglun.xin';
    //var urlPrefix = 'http://localhost/wukeda';
    var previous_search_option = "";

    // 搜索框 JS操作
    $.getJSON(urlPrefix + '/data/search_data.json', function(data) {
        // 搜索框的数据遍历和填充
        for (var i in data.search_services) {
            $('#search-services').append(
                $('<option>')
                    .attr('id', data.search_services[i].id)
                    .attr('value', data.search_services[i].id)
                    .attr('data-url', data.search_services[i].url)
                    .attr('data-suffix', data.search_services[i].suffix)
                    .html(data.search_services[i].name)
            );
        };
        $('#search-services').dropdown();
        $.cookie("previous_search_option", $('#search-services').val(), { expires: 3 });
        if ($.cookie("previous_search_option") == null) {
            $.cookie("previous_search_option", $('#search-services').val(), { expires: 3 });
        }else{
            $('#search-services').dropdown('set selected', $.cookie("previous_search_option"));
        }
    });

    // 下面五个 按钮注册点击 事件
    function btn_onclick(btn_id) {
        btn_id.click(function(){
            var service = $('#' + $('#search-services').val());
            var query = $('#search-query').val();
            var btn_url = $(this).data('url');
            var btn_suffix = $(this).data('suffix');
            query = encodeURIComponent(query);
            if (query) {
                window.open(btn_url + query + btn_suffix,'_blank');
                //console.log(btn_url + query + btn_suffix);
            } else {
                $('#search-div').addClass('error');
                $('#search-query').attr('placeholder', '请输入搜索内容');
            };
        });
    }
    btn_onclick($('#Google'));
    btn_onclick($('#baidu'));
    btn_onclick($('#xaiomuc'));
    btn_onclick($('#cailiaoren'));
    btn_onclick($('#zhihu'));

    // Go 按钮点击事件注册
    $('#search-button').click(function() {
        var service = $('#' + $('#search-services').val());
        var query = $('#search-query').val();
        query = encodeURIComponent(query);
        if (query) {
             $.cookie("previous_search_option", $('#search-services').val(), { expires: 3 });
            window.open(service.attr('data-url') + query + service.attr('data-suffix'), '_blank');
        } else {
            $('#search-div').addClass('error');
            $('#search-query').attr('placeholder', '请输入搜索内容');
        };
    });

    // Go 按钮点击选中样式
    $('#search-query').click(function() {
        $(this).select();
    });

    // Go 按钮点击选中样式
    $(document).ready(function() {
        $('#search-query').focus();
    });
    // 键盘回车键控制
    $(window).keyup(function(event) {
        var windowTop = $(window).scrollTop();
        var windowHeight = $(window).innerHeight();
        var windowBottom = windowTop + windowHeight;
        var searchBoxTop = $('#search-div').offset().top;
        var searchBoxHeight = $('#search-div').innerHeight();
        var searchBoxBottom = searchBoxTop + searchBoxHeight;
        if (event.key == 'Enter' && searchBoxBottom > windowTop && searchBoxTop < windowBottom) {
            var service = $('#' + $('#search-services').val());
            var query = $('#search-query').val();
            query = encodeURIComponent(query);
            if (query) {
                $.cookie('previous_search_option', $('#search-services').val(), { expires: 3 });
                window.open(service.attr('data-url') + query + service.attr('data-suffix'), '_blank');
            } else {
                $('#search-div').addClass('error');
                $('#search-query').attr('placeholder', '请输入搜索内容').focus();
            };
        };
    });

    //输入为空时候提示错误
    $('#search-query').keyup(function(event) {
        if (event.key) {
            if ($('#search-query').val()) {
                $('#search-div').removeClass('error');
                $('#search-query').attr('placeholder', '立即搜索');
            };
        };
    });

    //下拉搜索框智能提示,调用百度搜索函数
    var sugParams = {
        "XOffset": -3, //提示框位置横向偏移量,单位px
        "YOffset": -2, //提示框位置纵向偏移量,单位px
        // "width": $('#search-query').innerWidth(), //提示框宽度，单位px
        "fontColor": "rgba(0, 0, 0, 0.87)", //提示框文字颜色
        "fontColorHI": "rgba(0, 0, 0, 0.87)", //提示框高亮选择时文字颜色
        "fontSize": "14px", //文字大小
        "fontFamily": "Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif", //文字字体
        "borderColor": "rgba(34, 36, 38, 0.14902)", //提示框的边框颜色
        "bgcolorHI": "rgba(0, 0, 0, 0.05)", //提示框高亮选择的颜色
        "sugSubmit": false //选中提示框中词条时是否提交表单
    };
    BaiduSuggestion.bind('search-query', sugParams);

//**********************************导航栏JS特效以及搜索框特效 END*********************************************//
