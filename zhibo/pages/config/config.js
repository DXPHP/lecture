const ApiRootUrl = 'http://www.chair.com/index.php/api/';

module.exports = {

  IndexBanner: ApiRootUrl + 'Banner/List', //获取列表

  IndexUrl: ApiRootUrl + 'News/GetNewsListByPageType', //首页数据接口

  Login :ApiRootUrl + 'login/login', //登录

};