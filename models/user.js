const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
// const validator = require('validator')
const bcrypt=require('bcryptjs')

const userSchema = new mongoose.Schema({
  username:
  {
type:String,
required:true
  },
  password: 
  {
      type:String,
      required:true

  },
  email:
  {
      type:String,
      required:true
  },
  tokens: [{
      token: {
          type: String,
          required: true
      }
  }],
});


userSchema.methods.generateToken=async function()
{
const user=this
console.log(user)
const token=jwt.sign({id:user._id},"abcd")
console.log(token)
user.tokens = user.tokens.concat({ token })
    await user.save()
console.log("user saved with token")
console.log(user)
    return token

}


userSchema.pre('save',async function (next)
{

    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,10)
    }
next()
})

userSchema.statics.findByCredentials=async (email,password)=>
    {
        var email=email.toString()
        var password=password.toString()

const user=await User.findOne({email})
if(!user)
{
    throw new Error('Please Signup then Login')
}
console.log("found")
isMatch=await bcrypt.compare(password, user.password)
if (!isMatch) {
    throw new Error('Unable to login,please check your password')
}

return user

    }
const users=mongoose.model('user', userSchema);
module.exports=users

