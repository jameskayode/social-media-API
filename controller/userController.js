import User from "../models/userModel";
import bcrypt from "bcryptjs";

// Get all users
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
};

// User signup
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Add salt rounds for better security
    const user = new User({ name, email, password: hashedPassword ,blogs:[]}); // Correct property name to 'password'

    try {
        await user.save(); // Await for the save operation
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

    return res.status(201).json({ user });
};

// User login
export const login =async(req, res, next)=>{
    const { email,password} = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User with email does not existing" });
    }
    const isPassword=bcrypt.compareSync(password, existingUser.password);
    if (!isPassword) {
        return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({message: "User Login Successfully"})
}   
