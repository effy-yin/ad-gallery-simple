# ad-gallery-simple
## About
A simple version of image gallery inspired by ad-gallery
##Demo
*[Demo](http://htmlpreview.github.io/?https://github.com/dodoroy/ad-gallery-simple/blob/master/demo/index.html)*


![screen](https://raw.github.com/dodoroy/ad-gallery-simple/master/demo.png)
## Usage
1.Include jQuery and nav.js

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="nav.js"></script>
```
2.Create a HTML tag to hold the image gallery

```html
<div class="ad-gallery"></div>
```
3.Call wordbox()

```JavaScript
var nav  = new Nav('.ad-gallery', {
    adImg: '.ad-image',
    adTitle: '.ad-title',
    preBtn: '.ad-prev',
    nextBtn: '.ad-next',
    adThumbList:'.ad-thumb-list',
    thumbNum: 5,
    thumbWidth: 106,  
    auto: false,
    interval: 1000
});
```


## Credit
Created by [@dodo糯](http://weibo.com/dodoroy), *[blog](http://effy.me)*

Feel free to use, share and fork.

Enjoy!

