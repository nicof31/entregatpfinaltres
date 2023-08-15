import MessagesService from "../services/messages.service.js";

class MessagesController {
    constructor(){
       this.messagesService = new MessagesService();
    }

    sendMessages = async (req,res) => {
        try {
            const sendNewMessages  = await this.messagesService.sendMessages(req);
            return res.status(201).send({ status: "messageController: success", message: `email send to ${sendNewMessages}` });
            } catch(error) {
            console.log(`messageController: Error proceso message:${error}`);
            return res.status(500).json({ status: "error messageController", message: "No se puede procesar la petición POST" });
        };
    }

    getMessages = async (req,res) => {
        try {
            const userEmail = req.user.email; 
            console.log("🚀 ~ file: messages.controller.js:23 ~ MessagesController ~ getMessages= ~ userEmail:", userEmail)
            const getMessages  = await this.messagesService.getMessages(userEmail);
            res.status(200).json(getMessages);
            } catch(error) {
            console.log(`messageController: Error proceso message:${error}`);
            return res.status(500).json({ status: "error messageController", message: "No se puede procesar la petición GET" });
        };
    }

}


export default MessagesController;