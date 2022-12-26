const cardModel = require("../models/cartmodel")
const customerMoodel = require('../models/customermodel')

const { isValidObjectId, isValidCardNumber, isValidPhone, isValidString } = require("../valid/validation")


//====================================CREATE CARD================================================================//

const createCard = async function (req, res) {
    try {
        let data = req.body
        data.status = data.status.toUpperCase()
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "provide data to create" })
        }
        if (!isValidCardNumber(data.cardNumber)) return res.status(400).send({ status: true, msg: "provide valid card number" })
        let oldcart = await cardModel.findOne({ cardNumber: data.cardNumber, status: "ACTIVE" })
        if (oldcart) return res.status(400).send({ status: false, msg: "this card no already exist" })


        if (data.cardType !== "REGULAR" || data.cardType == "SPECIAL") {
            return res.status(400).send({ status: false, msg: "provide valid cardType info between REGULAR & SPECIAL" })
        }



        if (!isValidString(data.customerName)) return res.status(400).send({ status: false, msg: "provide valid customerName" })
        if (data.status) {
            if (data.status !== "ACTIVE" || data.status == "INACTIVE") {
                return res.status(400).send({ status: false, msg: "provide valid status info" })
            }
        }
        if (!isValidObjectId(data.customerID)) return res.status(400).send({ status: false, msg: "provide valid cutomerId" })


        const cardCreation = await cardModel.create(data)
        return res.status(201).send({ status: true, data: cardCreation })
    }
    catch (error) {
        return res.status(500).send({ status: true, msg: error.message })
    }
}

//=======================================GET CARD=================================================================//

const getCardDetails = async function (req, res) {
    try {

        const fetchData = await cardModel.find({ status: "ACTIVE" }).populate("customerID")
        return res.status(200).send({ status: true, Data: fetchData })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports = { createCard, getCardDetails }