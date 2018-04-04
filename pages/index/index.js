//index.js
//获取应用实例
const App = getApp()

Page({
  data: {
  },
  gotoMatter: function () {
    wx.navigateTo({
      url: '/pages/matter/index'
    });
  },
  onLoad: function () {
    var _this, oLaunchOption, scene, oMatter;
    oLaunchOption = App.globalData.launchOption;
    if (oLaunchOption.query.matter) {
      scene = oLaunchOption.query.matter;
      if (typeof scene === 'string') {
        scene = scene.split(',');
      }
    } else if (scene = oLaunchOption.scene) {
      if (typeof scene === 'string') {
        scene = scene.split('_');
      }
    }
    if (typeof scene === 'object' && scene.length === 2) {
      if (/enroll|mission/.test(scene[0])) {
        _this = this;
        wx.request({
          url: App.globalData.host + '/rest/site/fe/matter/wxa/matterGet?matter=' + scene[0] + ',' + scene[1],
          success: function (res) {
            console.log('res', res);
            var oMatter;
            if (res.data && res.data.data) {
              App.globalData.matter = oMatter = res.data.data;
              if (oMatter.pic) {
                if (oMatter.pic.indexOf('http') === -1) {
                  oMatter.pic = App.globalData.host + oMatter.pic;
                }
              }
              _this.setData({ matter: oMatter });
            }
          },
          fail: function () {
            console.log('fail');
          }
        });
      }
    }
  }
})
