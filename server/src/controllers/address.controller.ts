import { addressModel } from "../models/address.model";
import { Response, Request } from "express";

export const addressController = {
    findMany: async (req: Request, res: Response) => {
        try {
            let { err, data } = await addressModel.findAll()
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
    update: async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let { status, data, message } = await addressModel.update(Number(id), req.body)
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
    create: async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let { status, data, message } = await addressModel.create(req.body)
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