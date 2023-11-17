import { Router } from "express";
import { getAll,getDetail,create,update,remove } from "../Controllers/products";
import { checkPermission } from "../middlewares/checkPermisson";

const productRouter = Router()
productRouter.get("/",getAll);
productRouter.get("/:id",getDetail);
productRouter.post("/",checkPermission,create);
productRouter.put("/:id",checkPermission,update);
productRouter.delete("/:id",checkPermission,remove)

export default productRouter;