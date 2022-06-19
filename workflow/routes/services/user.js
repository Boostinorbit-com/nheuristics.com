

const JobsSeeker = require('model/User')
module.exports.userInfo = function (condition,callback) {
    console.log(condition);
    select = "_id name email password mobile isActive";
    JobsSeeker.findOne(condition,select,callback);
}
module.exports.userAllInfo = function (condition,callback) {
    console.log(condition);
    select = "";
    JobsSeeker.findOne(condition,select,callback);
}
module.exports.AllUsersInfos = function (condition,callback) {
    console.log(condition);
    select = "";
    JobsSeeker.find(condition,select,callback);
}
module.exports.userUpdate = function (condition,updateData,callback) {
    let data = JSON.parse(JSON.stringify(updateData));
    JobsSeeker.updateOne(condition,data,callback);
    
}