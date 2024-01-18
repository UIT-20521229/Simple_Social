const messages = require('../models/messages');
const path = require('path');

class MessagesController {
    // [POST] /messages
    async send_messages(req, res) {
        const { text, user, receiveId } = req.body;
        let image = '';
        if (req.file !== undefined) {
            image = req.file.path;
        }
        const newMessage = new messages({
            text,
            user,
            image: image,
            createdAt: new Date(),
            receiveId,
        });

        newMessage.save()
            .then(() => {
                res.status(200).json({ message: "Message added!!!" })
            })
            .catch(err => {
                console.log("Error:", err);
                res.status(500).json({ message: "Message fail!!!" })
            });
    }
    // [GET] /messages/:sendId/:receiveId
    async get_chat_messages(req, res) {
        try {
            const { sendId, receiveId } = req.params;

            const message = await messages.find({
                $or: [
                    { user: sendId, receiveId: receiveId },
                    { user: receiveId, receiveId: sendId },
                ],
            }).populate("user", "name email image")
                .select("-__v")
                .sort({ createdAt: 'desc' })
                .lean();

            res.send(message)

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    // [DELETE] /messages
    async delete_messages(req, res) {
        try {
            const { messages } = req.body;

            if (!Array.isArray(messages) || messages.length === 0) {
                return res.status(400).json({ message: "invalid req body!" });
            }

            await messages.deleteMany({ _id: { $in: messages } });

            res.json({ message: "Message deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server" });
        }
    }
}

module.exports = new MessagesController();
