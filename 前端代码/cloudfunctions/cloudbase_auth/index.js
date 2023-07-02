const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userID = generateUserID()
  console.log(event)
  console.log(wxContext)
  console.log('1111111',userID)
  return {
    userID: userID,
        errCode: 0,
        errMsg: wxContext.FROM_OPENID,
    auth: JSON.stringify({
     sid: wxContext.FROM_APPID
   }),
  }
  function generateUserID() {
    // 生成用户ID的具体代码，可以使用uuid等方式
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let userID = '';
  for (let i = 0; i < 8; i++) {
    userID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return userID;
  }
}