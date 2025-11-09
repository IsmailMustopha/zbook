import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  changeStock,
  listProduct,
  singleProduct,
  addProduct,
} from "../controllers/product.controller.js";
import authAdmin from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authAdmin, addProduct);
productRouter.get("/list", listProduct);
productRouter.post("/single", singleProduct);
productRouter.post("/stock", changeStock);

export default productRouter;
