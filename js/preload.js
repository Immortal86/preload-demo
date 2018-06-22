//图片预加载插件
(function ($) {
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.options = $.extend({}, Preload.DEFAULTS, options);

        this.options.order ? this._ordered() : this._unordered();
    }

    Preload.DEFAULTS = {
        order: false,//默认无序
        each: null,//每张图片加载完毕后执行
        all: null//所有图片加载完毕后执行
    }

    Preload.prototype._ordered = function () {
        let imgs = this.imgs,
            opts = this.options,
            len = imgs.length,
            count = 0;
            load();
        function load() {
            let imgObj = new Image();
            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);
                if (count >= len) {
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });
            imgObj.src = imgs[count];
        }

    }

    Preload.prototype._unordered = function () {//无序加载
        let imgs = this.imgs,
            opts = this.options,
            count = 0,
            len = imgs.length;
        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;
            let imgObj = new Image();
            $(imgObj).on('load error', function () {

                opts.each && opts.each(count);

                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            });
            imgObj.src = src;
        });
    }

    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    });
})(jQuery);