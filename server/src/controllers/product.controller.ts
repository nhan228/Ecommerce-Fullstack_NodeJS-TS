import { productModel } from "../models/product.model";
import { Response, Request } from "express";

export const productControlller = {
    findMany: async (req: Request, res: Response) => {
        try {
            let { err, data } = await productModel.findAll()
            if (err) {
                throw {
                    message: 'Sever bi loi',
                    err
                }
            }
            return res.status(200).json({
                message: 'ok',
                data
            })
        } catch (err: any) {
            return res.status(500).json({
                message: err.message && err.err || "sever bi loi 1"
            })
        }
    },

    delete: async (req: Request, res: Response) => {
        let id = Number(req.params.id)
        try {
            let { err, data } = await productModel.delete(id);
            if (err) {
                throw {
                    message: "bi loi roi",
                    err
                }
            }
            return res.status(200).json({
                message: 'ok',
                data
            })
        } catch (err: any) {
            return res.status(500).json({
                message: (err.message && err.err) || "Toi bi loi roi"
            })
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            let { err, data } = await productModel.create(req.body.newProduct, req.body.pictures);
            if (err) {
                throw {
                    message: "bi loi roi",
                    err
                }
            }
            return res.status(200).json({
                message: 'ok',
                data
            })
        } catch (err: any) {
            return res.status(500).json({
                message: (err.message && err.err) || "Toi bi loi roi"
            })
        }
    },

    updateDes: async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let { status, data, message } = await productModel.updateDes(Number(id), req.body)
            if (!status) {
                throw {
                    message
                }
            }
            return res.status(200).json({
                data,
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "LOI SERVER"
            })
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            let id = req.params.id;

            let { status, data, message } = await productModel.update(Number(id), req.body)
            console.log(req.body);
            
            if (!status) {
                throw {
                    message
                }
            }
            return res.status(200).json({
                data,
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "LOI SERVER"
            })
        }
    },

    deletePic: async (req: Request, res: Response) => {
        try {
            let id = req.params.id;

            let { status, data, message } = await productModel.deletePic(Number(id))
            if (!status) {
                throw {
                    message
                }
            }
            return res.status(200).json({
                data,
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "LOI SERVER"
            })
        }
    }
}