import joi from "joi"
export const RegisterValidation =(req,res,next)=>{

const schema =joi.object({
        name: joi.string().min(4).max(100).required(),
           email: joi.string().email().required(),
             password: joi.string().min(4).max(100).required(),

    })
    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message: "bad reqeust",error})
    }
    next();
}

export const LoginValidation =(req,res,next)=>{

const schema =joi.object({
       
           email: joi.string().email().required(),
             password: joi.string().min(4).max(100).required(),

    })
    
    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message: "bad reqeust",error})
    }
 
    next();
}