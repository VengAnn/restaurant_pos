const Menu = require("../models/menuModel");

const initialMenuItems = [
  // Starters
  { name: "Paneer Tikka", price: 250, category: "Starters", subCategory: "Vegetarian", categoryIcon: "🍲", categoryBgColor: "#b73e3e" },
  { name: "Chicken Tikka", price: 300, category: "Starters", subCategory: "Non-Vegetarian", categoryIcon: "🍲", categoryBgColor: "#b73e3e" },
  { name: "Tandoori Chicken", price: 350, category: "Starters", subCategory: "Non-Vegetarian", categoryIcon: "🍲", categoryBgColor: "#b73e3e" },
  { name: "Samosa", price: 100, category: "Starters", subCategory: "Vegetarian", categoryIcon: "🍲", categoryBgColor: "#b73e3e" },
  { name: "Aloo Tikki", price: 120, category: "Starters", subCategory: "Vegetarian", categoryIcon: "🍲", categoryBgColor: "#b73e3e" },
  { name: "Hara Bhara Kebab", price: 220, category: "Starters", subCategory: "Vegetarian", categoryIcon: "🍲", categoryBgColor: "#b73e3e" },

  // Main Course
  { name: "Butter Chicken", price: 400, category: "Main Course", subCategory: "Non-Vegetarian", categoryIcon: "🍛", categoryBgColor: "#5b45b0" },
  { name: "Paneer Butter Masala", price: 350, category: "Main Course", subCategory: "Vegetarian", categoryIcon: "🍛", categoryBgColor: "#5b45b0" },
  { name: "Chicken Biryani", price: 450, category: "Main Course", subCategory: "Non-Vegetarian", categoryIcon: "🍛", categoryBgColor: "#5b45b0" },
  { name: "Dal Makhani", price: 180, category: "Main Course", subCategory: "Vegetarian", categoryIcon: "🍛", categoryBgColor: "#5b45b0" },
  { name: "Kadai Paneer", price: 300, category: "Main Course", subCategory: "Vegetarian", categoryIcon: "🍛", categoryBgColor: "#5b45b0" },
  { name: "Rogan Josh", price: 500, category: "Main Course", subCategory: "Non-Vegetarian", categoryIcon: "🍛", categoryBgColor: "#5b45b0" },

  // Beverages
  { name: "Masala Chai", price: 50, category: "Beverages", subCategory: "Hot", categoryIcon: "🍹", categoryBgColor: "#7f167f" },
  { name: "Lemon Soda", price: 80, category: "Beverages", subCategory: "Cold", categoryIcon: "🍹", categoryBgColor: "#7f167f" },
  { name: "Mango Lassi", price: 120, category: "Beverages", subCategory: "Cold", categoryIcon: "🍹", categoryBgColor: "#7f167f" },
  { name: "Cold Coffee", price: 150, category: "Beverages", subCategory: "Cold", categoryIcon: "🍹", categoryBgColor: "#7f167f" },
  { name: "Fresh Lime Water", price: 60, category: "Beverages", subCategory: "Cold", categoryIcon: "🍹", categoryBgColor: "#7f167f" },
  { name: "Iced Tea", price: 100, category: "Beverages", subCategory: "Cold", categoryIcon: "🍹", categoryBgColor: "#7f167f" },

  // Soups
  { name: "Tomato Soup", price: 120, category: "Soups", subCategory: "Vegetarian", categoryIcon: "🍜", categoryBgColor: "#735f32" },
  { name: "Sweet Corn Soup", price: 130, category: "Soups", subCategory: "Vegetarian", categoryIcon: "🍜", categoryBgColor: "#735f32" },
  { name: "Hot & Sour Soup", price: 140, category: "Soups", subCategory: "Vegetarian", categoryIcon: "🍜", categoryBgColor: "#735f32" },
  { name: "Chicken Clear Soup", price: 160, category: "Soups", subCategory: "Non-Vegetarian", categoryIcon: "🍜", categoryBgColor: "#735f32" },
  { name: "Mushroom Soup", price: 150, category: "Soups", subCategory: "Vegetarian", categoryIcon: "🍜", categoryBgColor: "#735f32" },
  { name: "Lemon Coriander Soup", price: 110, category: "Soups", subCategory: "Vegetarian", categoryIcon: "🍜", categoryBgColor: "#735f32" },

  // Desserts
  { name: "Gulab Jamun", price: 100, category: "Desserts", subCategory: "Vegetarian", categoryIcon: "🍰", categoryBgColor: "#1d2569" },
  { name: "Kulfi", price: 150, category: "Desserts", subCategory: "Vegetarian", categoryIcon: "🍰", categoryBgColor: "#1d2569" },
  { name: "Chocolate Lava Cake", price: 250, category: "Desserts", subCategory: "Vegetarian", categoryIcon: "🍰", categoryBgColor: "#1d2569" },
  { name: "Ras Malai", price: 180, category: "Desserts", subCategory: "Vegetarian", categoryIcon: "🍰", categoryBgColor: "#1d2569" },

  // Pizzas
  { name: "Margherita Pizza", price: 350, category: "Pizzas", subCategory: "Vegetarian", categoryIcon: "🍕", categoryBgColor: "#285430" },
  { name: "Veg Supreme Pizza", price: 400, category: "Pizzas", subCategory: "Vegetarian", categoryIcon: "🍕", categoryBgColor: "#285430" },
  { name: "Pepperoni Pizza", price: 450, category: "Pizzas", subCategory: "Non-Vegetarian", categoryIcon: "🍕", categoryBgColor: "#285430" },

  // Alcoholic Drinks
  { name: "Beer", price: 200, category: "Alcoholic Drinks", subCategory: "Alcoholic", categoryIcon: "🍺", categoryBgColor: "#b73e3e" },
  { name: "Whiskey", price: 500, category: "Alcoholic Drinks", subCategory: "Alcoholic", categoryIcon: "🍺", categoryBgColor: "#b73e3e" },
  { name: "Vodka", price: 450, category: "Alcoholic Drinks", subCategory: "Alcoholic", categoryIcon: "🍺", categoryBgColor: "#b73e3e" },
  { name: "Rum", price: 350, category: "Alcoholic Drinks", subCategory: "Alcoholic", categoryIcon: "🍺", categoryBgColor: "#b73e3e" },
  { name: "Tequila", price: 600, category: "Alcoholic Drinks", subCategory: "Alcoholic", categoryIcon: "🍺", categoryBgColor: "#b73e3e" },
  { name: "Cocktail", price: 400, category: "Alcoholic Drinks", subCategory: "Alcoholic", categoryIcon: "🍺", categoryBgColor: "#b73e3e" },

  // Salads
  { name: "Caesar Salad", price: 200, category: "Salads", subCategory: "Vegetarian", categoryIcon: "🥗", categoryBgColor: "#5b45b0" },
  { name: "Greek Salad", price: 250, category: "Salads", subCategory: "Vegetarian", categoryIcon: "🥗", categoryBgColor: "#5b45b0" },
  { name: "Fruit Salad", price: 150, category: "Salads", subCategory: "Vegetarian", categoryIcon: "🥗", categoryBgColor: "#5b45b0" },
  { name: "Chicken Salad", price: 300, category: "Salads", subCategory: "Non-Vegetarian", categoryIcon: "🥗", categoryBgColor: "#5b45b0" },
  { name: "Tuna Salad", price: 350, category: "Salads", subCategory: "Non-Vegetarian", categoryIcon: "🥗", categoryBgColor: "#5b45b0" }
];

const seedMenu = async () => {
  await Menu.deleteMany({});
  console.log("  └─ Cleared existing menu items.");
  await Menu.insertMany(initialMenuItems);
  console.log(`  └─ Successfully seeded ${initialMenuItems.length} menu items.`);
};

module.exports = { seedMenu };
