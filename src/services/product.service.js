import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

async function createProduct(repData) {
  let topLevel = await Category.findOne({ name: repData.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: repData.topLevelCategory,
      level: 1,
    });
  }

  let secondLevel = await Category.findOne({
    name: repData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = Category({
      name: repData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
  }

  let thirdLevel = await Category.findOne({
    name: repData.thirdLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: repData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
  }

  const product = new Product({
    title: repData.title,
    color: repData.color,
    description: repData.description,
    discountedPrice: repData.discountedPrice,
    discountPercent: repData.discountPercent,
    imageUrl: repData.imageUrl,
    brand: repData.brand,
    price: repData.price,
    sizes: repData.size,
    quantity: repData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
}

async function deleteProduct(productId) {
  const product = await findProducById(productId);

  await Product.findByIdAndDelete(productId);
  return "Product deleted successfully";
}

async function updateProduct(productId, repData) {
  return await Product.findByIdAndUpdate(productId, repData);
}

async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id", id);
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegex =
      colorSet.size > 0 ? newRegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").regex(colorRegex);
  }

  if (sizes) {
    const sizesSet = new Set(sizes);
    query.query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = (await query.where("discountedPrice").gte(minPrice)).filter(
      maxPrice
    );
  }

  if (minDiscount) {
    query = await query.where("discountedPercent").gt(minDiscount);
  }

  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "out_of_stock") {
      query = query.where("quantity").gt(1);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_height" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query - query.skip(skip).limit(pageSize);

  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
