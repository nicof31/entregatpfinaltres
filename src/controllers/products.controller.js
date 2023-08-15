import ProductsService from "../services/products.service.js";
import productsModel from "../dao/models/products.model.js";

class ProductsController {
    constructor(){
        this.productService = new ProductsService();
        this.productModel = productsModel;
    }

    getIdProducts = async (req, res) => {
        try {
            const product = await this.productService.getIdProducts(req);
            return res.status(200).json({status:"productController: success, el id buscado es:",message:{ product }});
        } catch (error) {
            console.log(`productController: No se puede procesar la peticion GET '${error}'`);
            return res.status(404).json({status:"error",message: `productController: No se puede procesar la peticion GET '${error}'`});
                }
    }

    getCombProducts = async (req, res) => {
        try {
            const productsPagination = await this.productService.getCombProducts(req);
            return res.status(200).json({ status: "productController: success", payload: productsPagination });
        } catch (error) {
            console.log(`productController: No se puede procesar la peticion GET '${error}'`);
            return res.status(404).json({status:"error",message: `productController: No se puede procesar la peticion GET '${error}'`});
        }
    }

    addToProduct = async (req, res) => {
        try {
        const crearProducto = req.body;
        if (!crearProducto.title || !crearProducto.description || !crearProducto.code || !crearProducto.price || !crearProducto.status || !crearProducto.category || !crearProducto.stock) {
        return res.status(400).json({
            status: "error",
            message: "Incomplete values",
        });
        } else {
        const addProduct = await this.productService.addToProduct(req);
        return res.status(201).json({
            status: "success",
            message: "Creación de producto exitosa",
            payload: addProduct,
        });
        }
        } catch (error) {
        console.log(`productController: No se puede procesar la petición POST '${error}'`);
        return res.status(404).json({
            status: "error",
            message: `No se puede procesar la petición POST: ${error.message}`,
        });
        }
    }

    updateProductsComplet = async (req,res) => {
        try {
            const actualizarProducto = req.body;
            if (!actualizarProducto.title || !actualizarProducto.description || !actualizarProducto.code || !actualizarProducto.price || !actualizarProducto.status || !actualizarProducto.category || !actualizarProducto.stock) {
            return res.status(400).json({status:"error",message:"productController: Incomplete values"});
            };
            const updateProductComp = await this.productService.updateProductsComplet(req);
            return res.status(200).json({ status: "productController: success", payload: updateProductComp});
        } catch (error){
            console.log(`productController: No se puede procesar la peticion PUT '${error}'`);
            return res.status(400).json({
                status: "error",
                message: `No se puede procesar la petición PUT: ${error.message}`,
              });
        }
    }

    updateProductsPatch = async (req,res) => {
        try {
        const newObjUpdate = await this.productService.updateProductsPatch(req)
        return res.status(200).json({ status: "productController: success", payload: newObjUpdate});
        } catch (error){
        console.log(`productController: No se puede procesar la peticion PATCH '${error}'`);
        return res.status(400).json({
            status: "error",
            message: `No se puede procesar la petición PATCH: ${error.message}`,
        });
        }
    }

    deleteProduct =  async(req, res) => {
        try {
            await this.productService.deleteProduct(req);
            return res.status(200).json({ status: "productController: success mongoose", message:"DELETE realizado exitosamente"});
        } catch (error) {
            console.log(`productsController: No se puede procesar la peticion Delete '${error}'`);
            return res.status(400).json({
                status: "error",
                message: `No se puede procesar la petición DELETE: ${error.message}`,
            });        
        }
    }

}

export default ProductsController;