const Menu = require("../models/menuModel");
const createHttpError = require("http-errors");

/**
 * Retrieves menu items grouped by category.
 */
const getMenuItems = async (req, res, next) => {
  try {
    const groupedMenu = await Menu.aggregate([
      {
        $group: {
          _id: "$category",
          name: { $first: "$category" },
          bgColor: { $first: "$categoryBgColor" },
          icon: { $first: "$categoryIcon" },
          items: {
            $push: {
              _id: "$_id",
              id: "$_id", // mapped for frontend compatibility
              name: "$name",
              price: "$price",
              category: "$category",
              subCategory: "$subCategory"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          id: "$name",
          name: 1,
          bgColor: 1,
          icon: 1,
          items: 1
        }
      }
    ]);

    res.status(200).json({ success: true, data: groupedMenu });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates and saves a new menu item in the database.
 */
const addMenuItem = async (req, res, next) => {
  try {
    const { name, price, category, subCategory, categoryIcon, categoryBgColor } = req.body;
    if (!name || !price || !category) {
      const error = createHttpError(400, "Please provide name, price, and category!");
      return next(error);
    }

    const newMenuItem = new Menu({ name, price, category, subCategory, categoryIcon, categoryBgColor });
    await newMenuItem.save();
    res.status(201).json({ success: true, message: "Menu item added!", data: newMenuItem });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMenuItems, addMenuItem };
