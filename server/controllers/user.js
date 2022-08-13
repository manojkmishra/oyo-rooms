import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import Room from '../models/Room.js';

export const register = tryCatch(async (req, res) => //use try cath syntax from utils
{ const { name, email, password } = req.body;
  //---------do the checks for password and if email exist
  if (password.length < 6)
    return res.status(400).json({success: false,message: 'Password must be 6 characters or more',});
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res.status(400).json({ success: false, message: 'User already exists!' });
  //-------save user as all checks done---bcrypt pass, photourl is empty
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({name,email: emailLowerCase,password: hashedPassword,});
  //----------send token and user info(from db) back to user with reg success message 
  const { _id: id, photoURL } = user; //only after user accessed token can be generated
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {expiresIn: '1h',});
    res.status(201).json({ success: true,result: { id, name, email: user.email, photoURL, token },});
});
//---------------------------------------------------
export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser) return res.status(404).json({ success: false, message: 'User does not exist!' });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });
  const { _id: id, name, photoURL } = existedUser;
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, { expiresIn: '1h', });
  res.status(200).json({ success: true, result: { id, name, email: emailLowerCase, photoURL, token },
  });
});
//---------------------update profile-------------------
export const updateProfile = tryCatch(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new: true, });
  const { _id: id, name, photoURL } = updatedUser;
  // To Do: update all the rooms records added by this user
  await Room.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, { expiresIn: '1h',});
  res.status(200).json({ success: true, result: { name, photoURL, token } });
});