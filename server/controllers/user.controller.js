import User from '../mongodb/models/user.js';

//controller is just a function, and those are usually async since they take some time to do things with the database

const getAllUsers = async (req, res) => {

}

const createUser = async (req, res) => {

    try {
        //get data from the FE (req.body) and save it to the database
        const { name, email, avatar } = req.body;

        //check if user exists via their email
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        //if user does not exist, create a new user
        const newUser = await User.create({
            name,
            email,
            avatar
        })

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
}
   
}

const getUserInfoByID = async (req, res) => {

}

export {
    getAllUsers,
    createUser,
    getUserInfoByID,
}
