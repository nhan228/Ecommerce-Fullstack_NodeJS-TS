import { Request, Response } from "express"
import { receiptModel } from "../models/receipt.model"
import CryptoJS from "crypto-js"
import moment from "moment";
import axios from "axios";
import qs from "qs";
interface CustomRequest extends Request {
    tokenData: any; // Định nghĩa kiểu của 'tokenData' tại đây
}
const config = {
    appid: "553",
    key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
    key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
};
export const receiptController = {
    findMany: async (req: CustomRequest, res: Response) => {
        try {
            let { status, data, message } = await receiptModel.findMany(Number(req.tokenData.id))
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
                message: err.message || "Loi Server!"
            })
        }
    }
    ,
    delete: async (req: CustomRequest, res: Response) => {
        try {
            let { status, data, message } = await receiptModel.delete(Number(req.params.id))
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
                message: err.message || "Loi Server!"
            })
        }
    },
    update: async (req: CustomRequest, res: Response) => {
        try {
            let { status, data, message } = await receiptModel.update(req.body)
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
                message: err.message || "Loi Server!"
            })
        }
    }
    ,
    addToCart: async (req: CustomRequest, res: Response) => {
        try {
            let { status, data, message } = await receiptModel.addToCart(req.body, Number(req.tokenData.id))
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
    pay: async (req: Request, res: Response) => {
        try {
            let { status, data, message } = await receiptModel.pay(req.body, Number(req.params.receiptId))
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
    ,
    updateReceipt: async (req: Request, res: Response) => {
        try {
            let { status, data, message } = await receiptModel.updateReceipt(req.body, Number(req.params.receiptId))
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
    payZalo: async (req: Request, res: Response) => {
        try {
            const embed_data = { merchantinfo: "embeddata123" };
            const items = [{}];
            const transID = Math.floor(Math.random() * 1000000);
            const order = {
                appid: config.appid,
                apptransid: `${moment().format('YYMMDD')}_${Math.ceil(Date.now() * Math.random())}_${req.body.receiptId}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
                appuser: "PHUQUY",
                apptime: Date.now(), // miliseconds
                item: JSON.stringify(items),
                embeddata: JSON.stringify(embed_data),
                amount: Number(req.body.total),
                description: `PHUQUY.VN - Payment for the order #${transID}`,
                bankcode: "zalopayapp",
            };
            const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
            (order as any).mac = CryptoJS.HmacSHA256(data, config.key1).toString();
            let result = await axios.post("https://sandbox.zalopay.com.vn/v001/tpe/createorder", null, { params: order })
            console.log('result', result);

            if (result.data.returncode == 1) {
                return res.status(200).json({
                    qrCodeUrl: result.data.orderurl,
                    orderId: order.apptransid,
                    message: "Tạo mã QR thành công"
                })
            } else {
                throw {
                    message: "Tạo mã QR thất bại"
                }
            }

        } catch (err) {
            console.log('zalo err', err);
            return res.status(500).json({
                data: null,
                message: err.message || "Loi Server!"
            })
        }
    }
    ,
    payZaloCheck: async (req: Request, res: Response) => {
        try {
            let transID = req.params.zaloReceiptId;
            let postData = {
                appid: config.appid,
                apptransid: transID, // Input your app_trans_id
            }
            let data = postData.appid + "|" + postData.apptransid + "|" + config.key1; // appid|app_trans_id|key1
            (postData as any).mac = CryptoJS.HmacSHA256(data, config.key1).toString();
            let postConfig = {
                method: 'post',
                url: "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(postData)
            };
            let result = await axios(postConfig);
            if (result.data.returncode != 1) {
                throw {
                    message: "Thanh toan that bai!"
                }
            }
            return res.status(200).json({
                status: true
            })

        } catch (err) {
            console.log('err', err);
            return res.status(500).json({
                status: false,
                message: err.message || "Loi Server!"
            })
        }
    }
}