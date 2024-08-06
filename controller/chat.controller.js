const Chat = require("../schemas/chat.schema");
const User = require("../schemas/user.shema");

exports.postChat = async(req, res) => {
    const {userId} = req.user;
    const user = await User.findById(userId);
    await Chat.create({
        message: req.body.message,
        userId
    })
    res.status(200).json({message: req.body.message})
}

exports.saveChat = async(socket, message) => {
    const { userId } = socket.user;
    const user = await User.findById(userId);
    if(!user) {
        socket.emit('Invalid User')
    }
    await Chat.create({
        message,
        userId
    })
    return {
        user: {
            id: user.id,
            name: user.name,
        },
        message: message,
        ts: new Date()
    }
}

exports.getChats = async(req, res) => {
    const chats = await Chat.aggregate([
        {
          $lookup: {
            from: 'users', // Name of the User collection in MongoDB
            localField: 'userId', // Field from the Chat collection
            foreignField: '_id', // Field from the User collection
            as: 'user' // Output array field
          }
        },
        {
          $unwind: '$user' // Unwind the array to get an object
        },
        {
          $project: {
            _id: 1,
            message: 1,
            timestamp: 1,
            'user.name': 1 // Include only the name field from the user
          }
        }
      ]);
      res.status(200).json(chats);
}