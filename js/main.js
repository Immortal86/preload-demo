const imgs = [
    'http://pic1.5442.com/2015/0531/10/01.jpg',
    'http://pic1.win4000.com/wallpaper/c/58b8e4bb4b134.jpg',
    'http://p4.gexing.com/shaitu/20130331/1938/515820436f20a.jpg',
    'http://s9.knowsky.com/bizhi/l/1-5000/2009528124851141494273.jpg',
    'http://s9.knowsky.com/bizhi/l/1-5000/2009528154431449393212.jpg',
    'http://s9.knowsky.com/bizhi/l/1-5000/2009528124944434344887.jpg',
    'http://s9.knowsky.com/bizhi/l/1-5000/2009528153927102755904.jpg',
    'http://pic1.win4000.com/wallpaper/f/595dd5627fb2f.jpg',
]
let index = 0,
    len = imgs.length;

$('.btn').on('click', function () {
    'prev' === $(this).data('control') ? index = Math.max(0, --index) : index = Math.min(len - 1, ++index);
    document.title = (index + 1) + '/' + len;
    $('img').attr('src', imgs[index]);
});

let $progress = $('.progress');

$.preload(imgs, {
    each(count) {
        $progress.text(Math.round(((count + 1) / len) * 100) + '%');
    },
    all() {
        $('.loading').hide();
        document.title = '1/' + len;
    }
});