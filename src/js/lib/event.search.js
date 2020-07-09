define(['jquery', 'titleHover'], function($, titleHover) {
    var baseUrl = 'http://localhost/php-mysql/dumall.com';

    function searchRes() {
        // console.log('搜索加载');
        titleHover.getAjax(`${baseUrl}/interface/selectClass.php?searchVal=${searchVal}`).then((data) => {
            console.log(JSON.parse(data));
            location.href = './search.html';
            console.log(123);
            data = JSON.parse(data);
            if (data.code == 200) {

            } else {

            }
        })
    }
    return {
        searchRes: searchRes
    }

});