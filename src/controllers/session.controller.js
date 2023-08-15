import UserModel from "../dao/models/users.model.js"
import SessionService from "../services/session.service.js";
import cartsModel from "../dao/models/carts.model.js";
import { appConfig } from "../config/config.js";
const { JWT_COOKIE_NAME } = appConfig;

class SessionController {
    constructor(){
        this.userModel = UserModel;
        this.cartsModel = cartsModel;
        this.sessionService = new SessionService();
    }

    allToRegister = async (req, res) => {
      try {
          const addUser = await this.sessionService.allToRegister(req);
  
          if (addUser.error && addUser.error === "El correo electrónico ya está registrado") {
              return res.render("user/registererror", {
                  error: "El correo electrónico ya está registrado",
              });
          }
          console.log(`sessionController: Usuario con carrito registrado exitosamente: ${addUser}`);
          return res.redirect("/login");
      } catch (error) {
          console.error(`sessionController: Error en el registro de usuario: ${error}`);
          return res.render("user/registererror", { error: "sessionController: Ocurrió un error en el registro de usuario" });
      }
    }

    recoverUser = async (req, res) => {
      try {
          const { email } = req.body;
          const recoverResult = await this.sessionService.recoverUser(req);
          if (recoverResult.error) {
              return res.render("user/recovererror", {
                  error: `el usaurio con el mail: ${email} no existe`,
              });
          }
          console.log(`sessionController: Password cambiado correctamente ${recoverResult}`);
          return res.redirect("/login");
      } catch (error) {
          console.error(`sessionController: Ocurrió un error en cambio de Password: ${error}`);
          return res.render("user/recovererror", { error: "sessionController: Ocurrió un error en cambio de Password" });
      }
    }

    loginUser = async (req, res) => {
      try {       
        const token = await this.sessionService.loginUser(req);
        return res.cookie(JWT_COOKIE_NAME, token).redirect("/products");
      } catch (error) {
        console.error(`SessionController: No se puede procesar la petición POST '${error}'`);
        return res.render("user/loginerror", {
          error: "(401): Credenciales inválidas",
        });
       // return res.status(404).json({ status: "error", message: `SessionController: No se puede procesar la petición POST '${error}'` });
      }
    }

    loginGitHub = async (req, res) => {
      try {
        const token = await this.sessionService.loginGitHub(req, res); 
        console.log("🚀 ~ file: session.controller.js:66 ~ sessionController ~ loginGitHub= ~ token:", token)
        res
        .cookie(JWT_COOKIE_NAME, token, { httpOnly: true })
        .redirect("/products");
      } catch (error) {
        console.error(`SessionController: Error en el enrutamiento de GitHub callback: ${error}`);
        res.redirect("/login");
      }
    };

    githubCallback = async (req, res) => {
      try {
        const token = await this.sessionService.githubCallback(req, res);
        res
        .cookie(JWT_COOKIE_NAME, token, { httpOnly: true })
        .redirect("/products");
      } catch (error) {
        console.error(`SessionController: Error en el enrutamiento de GitHub callback: ${error}`);
        res.redirect("/login");
      }
    }


    logoutUser = async (req, res) => {
      try {
        console.error(`SessionController: sessión cerrada exitosamente`);
        res.clearCookie(JWT_COOKIE_NAME).redirect("/login");
      } catch (error) {
        console.error(`SessionController: Error al cerrar sesión: ${error}`);
        res.status(500).send({ error: "SessionController: Ocurrió un error al cerrar sesión" });
      }
    }
      
    //ok
    getCurrentUserInfo = async (req, res) => {
      try {
        const userInfo = await this.sessionService.getCurrentUserInfo(req.user);
        console.log(`SessionController: Solicitud consulta datos current procesada con exito`);     
        res.render("user/current", { user: userInfo });
        
      } catch (error) {
        console.error(`SessionController: No se puede obtener la información del usuario actual: ${error}`);
        return res.status(500).json({ status: "error", message: `SessionController: No se puede obtener la información del usuario actual: ${error}` });
      }
    };

    getTicketsByUser = async (req, res) =>{
      const userEmail = req.user.user.email;   
      try {
        const tickets = await this.sessionService.getTicketsByUser(userEmail);
        res.status(200).json(tickets);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los tickets" });
      }
    }
    
}


export default SessionController

