import axios from "axios";

import dotenv from "dotenv";
import Products from "../Models/Products";
import productSchema from "../Validations/product";
dotenv.config();

const { DB_URL } = process.env;
export const getAll = async (req, res) => {
  try {
    
    //Phân trang,sắp xếp
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;

    const options = {
      page:_page,
      limit:_limit,
      sort:{
        [_sort]:[_order] === "asc" ? 1 : -1,
      }
    }

    // const data =  await Products.find({})
    const data = await Products.paginate({},options)
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Hiển thị danh sách sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    // const datas = await axios.get(`${DB_URL}/products/${id}`);
    const data = await Products.find({_id: id})
    // Cach 2:
    // const data = await products.findById(id)
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Hiển thị chi tiết sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    // const { data } = await axios.put(`${DB_URL}/products/${id}`, body);

    const { error } = productSchema.validate(body, { abortEarly: true });
    if(error) {
      return res.status(400).json({
        message: error.details[0].message || "Please re-check data!!",
      });
    }
    console.log(error)
    const data = await Products.findByIdAndUpdate(id, body, { new: true})
    // Cach 2:
    // const data = await products.updateOne({_id: id}, body, { new: true})
    if (!data) {
      return res.status(404).json({
        message: "Cập nhật sản phẩm thất bại!",
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;

    const { error } = productSchema.validate(body, { abortEarly: true });
    if(error) {
      return res.status(400).json({
        message: error.details[0].message || "Please re-check data!!",
      });
    }
    // const { data } = await axios.post(`${DB_URL}/products`, body);
    const data = await Products.create(body)
    if (!data) {
      return res.status(404).json({
        message: "Thêm mới sản phẩm thất bại!",
      });
    }
    return res.status(200).json({
      message: "Thêm mới sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    // const { status } = await axios.delete(`${DB_URL}/products/${id}`);
    const data = await Products.findByIdAndDelete(id)
    if (!data) {
      return res.status(404).json({
        message: "Xoá sản phẩm thất bại!",
      });
    }
    return res.status(200).json({
      message: "Xoá sản phẩm thành công!",
      data
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Xoá sản phẩm thất bại!",
    });
  }
};