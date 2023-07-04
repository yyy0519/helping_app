// 云函数入口文件
const cloud = require('wx-server-sdk')
//初始化
cloud.init({
  
    traceUser: true,
    env: "cloud1-8gv8ckqc038fb22a"
  })


// 云函数入口函数
exports.main = async (event, context) => {
    const db =cloud.database()
    const $ = db.command.aggregate
  return 
  


  db.collection('forhelp_info')
    .aggregate()
    .group({
      //不指定id字段是为了下面分组查找
      _id: null,
      status:"未开始",
      //categories是设置的字段，addToSet是添加字段，$name是获取数据库中的name字段数据
      loccategories: $.addToSet('$loc')
    })
    .end()
}
