import UsersSchema from "../../models/users.model.js"
import bcrypt from "bcrypt";
import generateToken from "../Auth/getUserData/tokenGenrate.js";
export const Signup = async (req, res) => {

const {name,email,password} =req.body

if(!name || !email || !password){
    return res.status(400).json({message: "Please fill all fields"})
}

const user = await UsersSchema.findOne({ email })

if (user) {
    return res.status(400).json({ message: "User already exists" })
}

const hasPassword = await bcrypt.hash(password, 10);
const newUser = new UsersSchema({
    name,
    email,
    password : hasPassword
})

await newUser.save()
  const token = generateToken(newUser._id);
return res.status(201).json({ message: "User created successfully", token });

}

export const  Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await UsersSchema.findOne({ email: email.toLowerCase() });

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

     const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: "Invalid credentials" });
}
  const token = generateToken(user._id); 
   // 👇 ✅ Cookie set करो
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,           // dev में false रखना पड़ सकता है
    sameSite: "None",       // dev में 'Lax' रखना ठीक है
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

    return res.status(200).json({ message: "Login successful", user, token });
}