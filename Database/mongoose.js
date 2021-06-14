const mongoose=require('mongoose')
mongoose.connect('mongodb://m220student:m220password@mflix-shard-00-00.2xezf.mongodb.net:27017,mflix-shard-00-01.2xezf.mongodb.net:27017,mflix-shard-00-02.2xezf.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-etr6yo-shard-0&authSource=admin&retryWrites=true&w=majority')
module.exports=mongoose