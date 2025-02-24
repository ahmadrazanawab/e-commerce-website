import { Product } from "../Model/Product.model.js";
import { asyncHandler } from "../Utility/asyncHandler.js";
import { uploadOnCloudinary } from "../Utility/cloudinary.js";


// client - user see all product
const getProduct = asyncHandler(async (_, res) => {
    const products = await Product.find();

    if (!products || products.length === 0) {
        return res.status(404).json({ success: false, error: "No products found" });
    }

    res.status(200).json({ success: true, products, });
    // console.log(products.length);
});

// admin - add product
const addProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, mrpPrice, disPercentage, category } = req.body;
    if (!(name && description && price && stock && category)) {
        return res.status(400).json({ success: false, error: "All fields are requered!" });
    };

    if (description.length < 6) {
        return res.status(400).json({ success: false, error: "Description must be at least 6 characters" });
    };

    const productImageLocalPath = req.files?.images[0]?.path;

    if (!productImageLocalPath) {
        return res.status(400).json({ success: false, error: "Product image file is required" })
    }
    const productImage = await uploadOnCloudinary(productImageLocalPath);

    const newProduct = Product({
        name,
        description,
        images: productImage.url,
        price,
        mrpPrice,
        disPercentage,
        stock,
        category
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product has been created successfully", newProduct });
});

// admin update product
// const updateProduct = asyncHandler(async (req, res) => {
//     const { name, description, price,mrpPrice,disPercentage, stock, category } = req.body;
//     // create new object product
//     let newProduct = {};

//     if (name) { newProduct.name = name };
//     if (description) { newProduct.description = description };
//     if (price) { newProduct.price = price };
//     if (stock) { newProduct.stock = stock };
//     if (category) { newProduct.category = category };

//     let product = await Product.findById(req.params.id);
//     if (!product) {
//         return res.status(404).json({ success: true, error: "Prodcut not found" });
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });

//     res.status(200).json({ success: true, message: "Prodcut has been updated successfully", product });
// });

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price,mrpPrice,disPercentage, stock, category } = req.body;

    // Create a new product object with only the provided values
    let newProduct = {};

    if (name) newProduct.name = name;
    if (description) newProduct.description = description;
    if (price) newProduct.price = Number(price); // Ensure numeric values
    if (mrpPrice) newProduct.mrpPrice = Number(mrpPrice);
    if (disPercentage) newProduct.disPercentage = Number(disPercentage);
    if (stock) newProduct.stock = Number(stock);
    if (category) newProduct.category = category;

    console.log("Updating product with data:", newProduct);

    // Find product by ID first
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Update the product in MongoDB
    product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });

    if (!product) {
        return res.status(500).json({ success: false, message: "Failed to update product" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product });
});


const deleteProduct = asyncHandler(async (req, res) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ success: true, error: "Prodcut not found" });
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Prodcut has been deleted" });
})

export {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}
