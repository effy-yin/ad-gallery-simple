(function($) {
    function Nav(wrapper, options) {
        var defaults = {
            adImg: '.ad-image',
            adTitle: '.ad-title',
            preBtn: '.ad-prev',
            nextBtn: '.ad-next',
            adThumbList:'.ad-thumb-list',
            thumbNum: 5,
            thumbWidth: 106,  
            auto: true,
            interval: 1000
        };
        this.options = $.extend(defaults, options);
        this.wrapper = $(wrapper);
        this.adImg = this.wrapper.find(this.options.adImg);
        this.adTitle = this.wrapper.find(this.options.adTitle);        
        this.preBtn = this.wrapper.find(this.options.preBtn);
        this.nextBtn = this.wrapper.find(this.options.nextBtn);
        this.adThumbList = this.wrapper.find(this.options.adThumbList);
        this.thumbNum = this.options.thumbNum;
        this.thumbWidth = this.options.thumbWidth;
        this.thumbLength = this.adThumbList.children().length;
        this.auto = this.options.auto;        
        this.interval = this.options.interval;

        this.init();
    }

    Nav.prototype = {
        cur: 0,
        loc: 0,
        timer: null,
        enable: true,
        init: function() {
            this.bindEvent();
            if (this.auto) {
                this.autoSlide();
            }
        },
        autoSlide: function() {
            var _this = this;
            _this.timer = setInterval(function() {
                _this.nextImage();
            }, _this.interval);
        },
        preImage: function() {            
            var _this = this;
            clearInterval(_this.timer);
            if (_this.enable) {
                _this.cur--;
                _this.loc--;
                if (_this.loc > 0) {
                    _this.locateImage();
                    if(_this.auto) _this.autoSlide();
                } else if (this.loc == 0 && this.cur > 0) {                    
                    _this.enable = false;
                    _this.adThumbList.animate({left:'+='+this.thumbWidth}, function() {                        
                        _this.loc++;
                        _this.locateImage();
                        _this.enable = true;
                        if(_this.auto) _this.autoSlide();
                    });
                } else if (_this.loc == 0 && _this.cur == 0) {
                    _this.loc++; 
                    _this.locateImage();
                    if(_this.auto) _this.autoSlide();
                } else {                    
                    _this.loc = _this.thumbNum-1;
                    _this.cur = _this.thumbLength -1;
                    _this.enable = false;
                    _this.adThumbList.animate({left: -this.thumbWidth*(this.thumbLength-this.thumbNum)}, function(){
                        _this.locateImage();
                        _this.enable = true;
                        if(_this.auto) _this.autoSlide();
                    })
                }  
             }
                
        },
        nextImage: function() {
            clearInterval(this.timer);
            var _this = this;
            if (_this.enable) {
                _this.cur++;
                _this.loc++;
                if (_this.loc <  _this.thumbNum - 1) {                
                    _this.locateImage();
                    if (_this.auto) _this.autoSlide();
                } else if (_this.loc ==  _this.thumbNum - 1 && _this.cur < _this.thumbLength - 1) {
                    _this.enable = false;
                    _this.adThumbList.animate({'left': '-=' + _this.thumbWidth}, function(){                        
                        _this.loc--;                  
                        _this.locateImage();
                        _this.enable = true;
                        if(_this.auto) _this.autoSlide();
                    });                       
                } else if (_this.loc ==  _this.thumbNum - 1 && _this.cur == _this.thumbLength - 1) {
                    _this.loc--;
                    _this.locateImage();
                    if (_this.auto) _this.autoSlide();
                } else {
                    _this.loc = 0;
                    _this.cur = 0;
                    _this.enable = false;
                    _this.adThumbList.animate({'left': 0}, function() {                                    
                        _this.locateImage();
                        _this.enable = true;
                        if (_this.auto) _this.autoSlide();
                    });
                }
            }
        },
        locateImage: function() {
            var _this = this;
            var curThumb = _this.adThumbList.children().eq(_this.cur);
            _this.adThumbList.children().removeClass('cur');
            curThumb.addClass('cur');
            _this.adImg.find('img').attr('src', curThumb.find('a').attr('href'));
            _this.adImg.find('a').attr('href', curThumb.find('img').attr('url'));
            _this.adTitle.html(curThumb.find('img').attr('alt'));            
        },
        bindEvent: function() {
            var _this = this;
            this.preBtn.click(function() {           
                _this.preImage();
            });
            this.nextBtn.click(function() {
                _this.nextImage();
            });

            _this.adThumbList.find('a').click(function(e) {

                var oldCur = _this.cur;
                _this.cur = $(this).parent().index();
                _this.loc = _this.cur - oldCur + _this.loc;

                if (_this.loc == 0 && _this.cur != 0) {
                    _this.loc++;
                    _this.cur++;
                    _this.preImage();
                } else {
                    _this.loc--;
                    _this.cur--;
                    _this.nextImage();
                }

                return false;
            });
        }        
    }

    window.Nav = Nav;
})(jQuery);


