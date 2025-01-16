import { Product } from "../Model/Product.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";


// client - user see all product
const getProduct = asyncHandler(async (_, res) => {
    const products = await Product.find();

    if (!products || products.length === 0) {
        return res.status(404).json({ success: false, error: "No products found" });
    }

    res.status(200).json({ success: true, products });
    
});

// admin - add product
const addProduct = asyncHandler(async (req, res) => {
    const { name, description, images, price, stock, category } = req.body;
    if (!(name && description && images && price && stock && category)) {
        return res.status(400).json({ success: false, error: "All fields are requered!" });
    };

    if (description.length < 6) {
        return res.status(400).json({ success: false, error: "Description must be at least 6 characters" });
    };

    const newProduct = Product({
        name,
        description,
        images,
        price,
        stock,
        category
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product has been created successfully", newProduct });
});


export {
    addProduct,
    getProduct
}
