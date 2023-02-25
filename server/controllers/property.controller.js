import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//controllers
const getAllProperties = async (req, res) => {

}

const getPropertyDetail = async (req, res) => {

}

//The logic to create a property
const createProperty = async (req, res) => {

  try {
    //first we destructure the data we are getting from the frontend
    const { title, description, propertyType, price, location, photo, email } = req.body;

    // start a new session (this is a mongoose method).
    // sessions are used to ensure that what happens in the createProperty function is considered an atomic transaction.
    // this means that if something goes wrong, the entire transaction is rolled back and nothing is saved to the database. We can't get stuck in-between. 
    const session = await mongoose.startSession();
    session.startTransaction();

    //get user by email
    const user = await User.findOne({ email }).session(session);

    //if user does not exist, throw an error
    if (!user) throw new Error('User not found');

    //if there is a user, we get their photo and upload it to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    //create a new property
    //Property references the model we created in mongodb/models/property.js
    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      price,
      location,
      photo: photoUrl.url,
      creator: user._id,
    });

    //update the user and push the new property to make sure they are connected
    user.allProperties.push(newProperty._id);
    //save our session
    await user.save({ session });

    await session.commitTransaction(); //commit the transaction and we are ready to move on

    res.status(200).json({ message: 'Property created successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateProperty = async (req, res) => {

}

const deleteProperty = async (req, res) => {

}

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
}