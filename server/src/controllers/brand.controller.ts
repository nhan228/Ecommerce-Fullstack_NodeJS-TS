import { brandModel } from "../models/brand.model";
import { Response, Request } from "express";

export const brandController = {
    findMany: async (req: Request, res: Response) => {
        try {
            let { err, data } = await brandModel.findAll()
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
            let { status, data, message } = await brandModel.update(Number(id), req.body)
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
            let { status, data, message } = await brandModel.create(req.body)
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