import productmodel from "../model/productModel.js";


const createMultiProduct = async (req, res) => {

    try {
        const saveProudct = await productmodel.insertMany(req.body)
        res.status(200).json({ status: "success", data: saveProudct, message: "Product Created Successfully" })

    }
    catch (error) {
        console.log(error)
        res.status(400).res.json({ message: "server Internal Error" })

    }

}

const createProduct = async (req, res) => {

    try {
        const saveProudct = new productmodel(req.body)
        await saveProudct.save()
        res.status(200).json({ status: "success", data: saveProudct, message: "Product Created Successfully" })

    }
    catch (error) {
        console.log(error)
        res.status(400).res.json({ message: "server Internal Error" })

    }

}

const getproduct = async (req, res) => {

    const getproduct = await productmodel.find()

    if (!getproduct) {

        res.status(200).json({ message: "no data found" })
    }

    res.status(200).json({ status: "success", data: getproduct })

}


export {createProduct, getproduct, createMultiProduct}
