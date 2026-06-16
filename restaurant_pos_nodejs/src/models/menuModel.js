const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., "Starters", "Main Course", "Beverages", "Soups", "Desserts", "Pizzas", "Alcoholic Drinks", "Salads"
    },
    subCategory: {
      type: String,   // e.g., "Vegetarian", "Non-Vegetarian", "Hot", "Cold", "Alcoholic"
    },
    categoryIcon: {
      type: String,   // e.g., "🍲", "🍛", "🍹"
      default: "🍽️"
    },
    categoryBgColor: {
      type: String,   // e.g., "#b73e3e", "#5b45b0"
      default: "#1a1a1a"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
