import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
     },
     enrollmentNo:{
        type:String,
        required:true,
        validate: {
            validator: function (v) {
                return v.length === 8;
            },
            message: props => `${props.value} is not an 8-character enrollment number!`
        },
        unique:true
     },
     semester:{
        type:Number,
        required:true
     },
     role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
      }

}, { timestamps: true })
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;
