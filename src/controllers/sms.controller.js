import SmsService from "../services/sms.service.js";

class SmsController {
    constructor(){
        this.smsService = new SmsService();
    }

    sendSms = async (req, res) => {
        try {
          const sendNewSms = await this.smsService.sendSms(req);
          return res.send({ status: "smsController: success", message: `sms send to ${req.body.phone}` });
        } catch (error) {
          console.error(`cartsController: Error al procesar la petición POST: ${error}`);
          return res.status(500).json({ status: "error smsController", message: "No se puede procesar la petición POST" });
        }
      };

}


export default SmsController;