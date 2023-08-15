import { Router } from "express";
import authToken from "../middleware/usersessiontoken.js";
import { passportCall } from "../utils/jwt.js";
import handlePolicies from "../middleware/handle-policies.middleware.js"
import CartsController from "../controllers/carts.controller.js";

const router = Router();
const cartController = new CartsController();


    //----------BUSQUEDA POR LIMIT----------------------
//http://localhost:8080/api/carts/
//http://localhost:8080/api/carts/?limit=2
router.get("/", [passportCall("jwt"), authToken], cartController.getAllCarts);

  //---------------------GET POPULATE---------------------
  //Opcion A: se usa para abrir el carrito http://localhost:8080/api/carts/:cid , esta opcion permite hacer la compra
  //Opcion B: se usa para abrir el historico carrito http://localhost:8080/api/carts/:cid/?historycart=true, esta opcion solo de vista
    //si se usa de postman verlo desd Preview pq la rta esta renderizada

router.get("/:cid", [passportCall("jwt"), authToken], cartController.getIdCarts);

//---------------------POST ADD CARTS ---------------------
    //aumentar cantidad y disminuir cantidad debe estar logueado
    //http://localhost:8080/api/carts/:pid/?accion=aumentar
    //http://localhost:8080/api/carts/:pid/?accion=disminuir
    //:pid= id de producto
    router.post("/:pid", [passportCall("jwt"), handlePolicies(["USER"]), authToken], cartController.addToCart);

//---------------------PURCHASE ---------------------
    //aumentar cantidad y disminuir cantidad debe estar logueado
    //http://localhost:8080/api/carts/${productId}/?accion=aumentar
    //http://localhost:8080/api/carts/:cid/purchase
    router.post("/:cid/purchase",[passportCall("jwt"), authToken],cartController.purchaseCart);

//---------------------PUT MODIFICAR CANTIDAD---------------------
  //  router.put("/:cid/products/:pid", [passportCall("jwt"), handlePolicies(["ADMIN","USER"])], cartController.updateCarts)
    router.put("/:cid/products/:pid", [passportCall("jwt"), authToken], cartController.updateCarts)


//---------------------PUT MODIFICAR COMPLETO---------------------
    router.put("/:cid", [passportCall("jwt"), authToken], cartController.updateCartsComplet)

//---------------------DELETE TODOS LOS PRODUCTOS DEL CARRITO---------------------
// http://localhost:8080/api/carts/:cid
    router.delete("/:cid", [passportCall("jwt"), authToken], cartController.deleteProductCarts)

//---------------------DELETE PRODUCTO DEL CARRITO---------------------
// http://localhost:8080/api/carts/:cid/products/:pid
    router.delete("/:cid/products/:pid", [passportCall("jwt"), authToken], cartController.deleteOneProdCarts)


    
export default router