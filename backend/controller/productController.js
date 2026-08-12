const addProductController = async (req, res) => {

    const { title, price } = req.fields;

    // validation
    if (!title && !price ) {
        return res.json(
            {
                success: false,
                message: "All fields are required",

            });
    }
    return res.json(
        {
            success: true,
            message: "Product added successfully",
            data: req.body
        }
    )
}


module.exports = {
    addProductController
};