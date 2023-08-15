import EmailService from "../services/email.service.js";

class EmailController {
    constructor(){
        this.emailService = new EmailService();
    }

    sendEmail = async (req, res) => {
        try {
          const sendNewEmail = await this.emailService.sendEmail(req);
          console.log("🚀 ~ file: email.controller.js:11 ~ EmailController ~ sendEmail= ~ sendNewEmail:", sendNewEmail)
          return res.status(200).send({ status: "mailController: success", message: `email send to ${req.body.email}` });
        } catch (error) {
          console.error(`cartsController: Error al procesar la petición POST: ${error}`);
          return res.status(500).json({ status: "error emailController", message: "No se puede procesar la petición POST" });
        }
      };

}


export default EmailController;