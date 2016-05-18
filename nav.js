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
        this.thumbLength = this.adThumbList.children().length;
        this.thumbWidth = this.options.thumbWidth;
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
            this.timer = setInterval(function() {
                _this.nextImage();
            }, _this.interval);
        },
        preImage: function() {            
            var _this = this;
            clearInterval(this.timer);    
            this.cur--;
            this.loc--;
            if (this.loc > 0) {
                this.locateImage();
                if(this.auto) this.autoSlide();
            } else if (this.loc == 0 && this.cur > 0) {                    
                this.enable = false;
                this.adThumbList.animate({left:'+='+this.thumbWidth}, function() {                        
                    _this.loc++;
                    _this.locateImage();
                    _this.enable = true;
                    if(_this.auto) _this.autoSlide();
                });
            } else if (this.loc == 0 && this.cur == 0) {
                this.locateImage();
                if(this.auto) this.autoSlide();
            } else {                    
                this.loc = this.thumbNum-1;
                this.cur = this.thumbLength -1;
                this.enable = false;
                this.adThumbList.animate({left: -this.thumbWidth*(this.thumbLength-this.thumbNum)}, function(){
                    _this.locateImage();
                    _this.enable = true;
                    if(_this.auto) _this.autoSlide();
                })
            }          
        },
        nextImage: function() {            
            var _this = this;
            clearInterval(this.timer);
            this.cur++;
            this.loc++;
            if (this.loc <  this.thumbNum - 1) {                
                this.locateImage();
                if (this.auto) this.autoSlide();
            } else if (this.loc ==  this.thumbNum - 1 && this.cur < this.thumbLength - 1) {
                this.enable = false;
                this.adThumbList.animate({'left': '-=' + this.thumbWidth}, function(){                        
                    _this.loc--;                  
                    _this.locateImage();
                    _this.enable = true;
                    if(this.auto) this.autoSlide();
                });                       
            } else if (this.loc ==  this.thumbNum - 1 && this.cur == this.thumbLength - 1) {
                this.locateImage();
                if (this.auto) this.autoSlide();
            } else {
                this.loc = 0;
                this.cur = 0;
                this.enable = false;
                this.adThumbList.animate({'left': 0}, function() {                                    
                    _this.locateImage();
                    _this.enable = true;
                    if (_this.auto) _this.autoSlide();
                });
            }
         
        },
        locateImage: function() {

            var curThumb = this.adThumbList.children().eq(this.cur);
            this.adThumbList.children().removeClass('cur');
            curThumb.addClass('cur');
            this.adImg.find('img').attr('src', curThumb.find('a').attr('href'));
            this.adImg.find('a').attr('href', curThumb.find('img').attr('url'));
            this.adTitle.html(curThumb.find('img').attr('alt'));            
        },
        bindEvent: function() {
            var _this = this;
            this.preBtn.click(function() {
                if (_this.enable)           
                    _this.preImage();
            });
            this.nextBtn.click(function() {
                if (_this.enable)
                    _this.nextImage();
            });

            this.adThumbList.find('a').click(function(e) {
                if (_this.enable)  {
                    var oldCur = _this.cur;
                    var oldLoc = _this.loc;
                    _this.cur = $(this).parent().index();
                    _this.loc = _this.cur - oldCur + oldLoc;
                    if (_this.cur < oldCur) {
                        _this.loc++;
                        _this.cur++;
                        _this.preImage();
                    } else {
                        _this.loc--;
                        _this.cur--;
                        _this.nextImage();
                    }
                }                   

                return false;
            });
        }        
    }

    window.Nav = Nav;
})(jQuery);


