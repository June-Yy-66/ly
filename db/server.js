/**
 * 作者：刘悦
 * 建立时间：2026-11-13
 * 使用大模型：GLM-5.3-Flash
 * 功能名称：诗词数据服务器——读取 db.json 并通过 HTTP 接口返回 poems 数据
 */
const ly_express = require('express');
const ly_fs = require('fs');
const ly_path = require('path');

const ly_app = ly_express();

// 允许跨域访问：页面可能与服务器不在同一端口/协议下运行
ly_app.use(function (ly_req, ly_res, ly_next) {
  ly_res.setHeader('Access-Control-Allow-Origin', '*');
  ly_next();
});

/**
 * 处理 /poems 请求：读取当前文件夹下的 db.json，把 poems 数据以 JSON 返回给前端
 */
ly_app.get('/poems', function (ly_req, ly_res) {
  const ly_file = ly_path.join(__dirname, 'db.json');
  ly_fs.readFile(ly_file, 'utf-8', function (ly_err, ly_data) {
    if (ly_err) {
      // 读取失败时返回 500 和错误信息
      ly_res.status(500).json({ error: '读取 db.json 失败' });
      return;
    }
    ly_res.json(JSON.parse(ly_data));
  });
});

// 监听 3004 端口启动数据服务器
ly_app.listen(3004, function () {
  console.log('诗词数据服务器已启动：http://127.0.0.1:3004/poems');
});
