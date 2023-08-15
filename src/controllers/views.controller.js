import { appConfig } from "../config/config.js";
const { JWT_COOKIE_NAME } = appConfig;
import UserModel from "../dao/models/users.model.js";
import productsModel from "../dao/models/products.model.js";
import ViewsService from "../services/views.service.js";

class ViewsController {
    constructor(){
        this.userModel = UserModel;
        this.productsModel = productsModel; 
        this.viewService = new ViewsService();
    }

    getChatView = async (req,res) => { 
        try {
        const chat = "prueba chat web socket";
        return res.render('chat', { chat });
        } catch (error) {
        console.error(`ViewsController: No se puede obtener la vista de chat: ${error}`);
        return res.status(404).json({ status: "error", message: `ViewsController: No se puede obtener la vista de chat: ${error}` });
        }
    }

    getLoginView(req, res) {
        try {
        return res.render("user/login", {
            title: "Login",
            style: "home",
            logued: false,
        });
        } catch (error) {
        console.error("ViewsController: Error al renderizar la página de login:", error);
        return res.render("user/loginerror", { error: "Ocurrió un error al renderizar la página de login" });
        }
    }
  
    getHomePageView(req, res) {
        try {
        return res.render("user/login", {
            title: "Login",
            style: "home",
            logued: false,
        });
        } catch (error) {
        console.error("ViewsController: Error al renderizar la página de inicio:", error);
        return res.render("user/loginerror", { error: "Ocurrió un error al renderizar la página de inicio" });
        }
    }

    logout = async (req, res) => {
        try {
        res.clearCookie(JWT_COOKIE_NAME);
        res.redirect('/login');
        } catch (error) {
        console.error("ViewsController: Error al cerrar sesión:", error);
        res.status(500).send({ error: "ViewsController: Ocurrió un error al cerrar sesión" });
        }
    }

    getProductsView = async (req, res) => {
        try {
        const productsPagination = await this.viewService.getProductsView(req);
        res.render('products', productsPagination);
        } catch (error) {
        console.error(`Error al realizar la búsqueda paginada: ${error}`);
        return res.status(404).json({ status: "error", message: `Error al realizar la búsqueda paginada en BBBD ${error}` });
        }
    }

    getProfileView = (req, res) => {
        try {
        const { first_name, last_name, email, role } = req.user.user;
        const user = {
            first_name,
            last_name,
            email,
            role
        };
        res.render("user/profile", { user });
        } catch(error) {
        console.error(`ViewsController: Error al obtener la vista de perfil: ${error}`);
        return res.status(404).json({ status: "error", message: `ViewsController: Error al obtener la vista de perfil: ${error}` });
        }
    }

    getRegisterView = async (req, res) => {
        try {
        res.render("user/register", {
            title: "Registro",
            style: "home",
            logued: false,
        });
        } catch(error) {
        console.error(`ViewsController: Error al obtener la vista de registro: ${error}`);
        return res.status(500).json({ status: "error", message: `ViewsController: Error al obtener la vista de registro: ${error}` });
        }
    }

    getRecoverView = async (req, res) => {
        try {
        res.render("user/recover");
        } catch(error) {
        console.error(`ViewsController: Error al obtener la vista de recuperación de contraseña: ${error}`);
        return res.status(500).json({ status: "error", message: `ViewsController: Error al obtener la vista de recuperación de contraseña: ${error}` });
        }
    }

}



export default ViewsController;
