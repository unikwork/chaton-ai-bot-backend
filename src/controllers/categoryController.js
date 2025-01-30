import db from "../config/db.config.js";
import { successRes, errorRes } from "../helpers/index.js";

const Category = db.Category;

const categoryList = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: { is_active: true },
            attributes: ["id", "name", "is_active"],
        });
        return successRes(res, 3001, categories);
    } catch (error) {
        console.log("error", error);        
        return errorRes(res, 9999, error.message);
    }
};

export { categoryList };
