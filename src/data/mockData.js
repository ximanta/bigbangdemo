export const mockInventory = [
  {
    id: 'inv1',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    category: 'Dairy',
    purchaseDate: '2023-10-20',
    expiryDate: '2023-10-28',
  },
  {
    id: 'inv2',
    name: 'Eggs',
    quantity: 12,
    unit: 'units',
    category: 'Dairy',
    purchaseDate: '2023-10-18',
    expiryDate: '2023-11-15',
  },
  {
    id: 'inv3',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    purchaseDate: '2023-10-22',
    expiryDate: '2023-10-26',
  },
  {
    id: 'inv4',
    name: 'Tomatoes',
    quantity: 500,
    unit: 'gram',
    category: 'Produce',
    purchaseDate: '2023-10-21',
    expiryDate: '2023-10-27',
  },
  {
    id: 'inv5',
    name: 'Chicken Breast',
    quantity: 600,
    unit: 'gram',
    category: 'Meat',
    purchaseDate: '2023-10-20',
    expiryDate: '2023-10-25',
  },
  {
    id: 'inv6',
    name: 'Rice',
    quantity: 1,
    unit: 'kg',
    category: 'Pantry',
    purchaseDate: '2023-09-01',
    expiryDate: '2024-12-31',
  },
];

export const mockRecipes = [
  {
    id: 'rec1',
    name: 'Classic Tomato Pasta',
    image: 'https://images.unsplash.com/photo-1551187440-66e3b9787e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRvbWF0b3xlbnwwfHx8fDE2OTgzNjY0NDZ8MA&ixlib=rb-4.0.3&q=80&w=400',
    ingredients: [
      { item: 'Pasta', quantity: 200, unit: 'gram' },
      { item: 'Tomatoes', quantity: 400, unit: 'gram' },
      { item: 'Garlic', quantity: 2, unit: 'cloves' },
      { item: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      { item: 'Basil', quantity: 10, unit: 'leaves' },
    ],
    instructions: [
      'Boil pasta according to package instructions.',
      'Sauté minced garlic in olive oil.',
      'Add chopped tomatoes and simmer for 15 minutes.',
      'Mix in cooked pasta and fresh basil.',
      'Serve hot.',
    ],
    tags: ['Italian', 'Vegetarian', 'Dinner', 'Quick'],
    favorite: true,
  },
  {
    id: 'rec2',
    name: 'Chicken Stir-fry',
    image: 'https://images.unsplash.com/photo-1512058564177-cc01ff0f6b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc3Rpci1mcnl8ZW58MHx8fHwxNjk4MzY2NDQ4fDA&ixlib=rb-4.0.3&q=80&w=400',
    ingredients: [
      { item: 'Chicken Breast', quantity: 300, unit: 'gram' },
      { item: 'Broccoli', quantity: 1, unit: 'head' },
      { item: 'Carrots', quantity: 2, unit: 'units' },
      { item: 'Soy Sauce', quantity: 3, unit: 'tbsp' },
      { item: 'Ginger', quantity: 1, unit: 'inch' },
    ],
    instructions: [
      'Cut chicken into strips and stir-fry until cooked.',
      'Add chopped broccoli and carrots, cook until tender-crisp.',
      'Mix in soy sauce and grated ginger.',
      'Serve with rice.',
    ],
    tags: ['Asian', 'Dinner', 'Healthy'],
    favorite: false,
  },
  {
    id: 'rec3',
    name: 'Scrambled Eggs with Toast',
    image: 'https://images.unsplash.com/photo-1626244793836-e0f31628d097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwxfHxzY3JhbWJsZWQlMjBlZ2dzfGVufDB8fHx8MTY5ODM2NjQ0OXww&ixlib=rb-4.0.3&q=80&w=400',
    ingredients: [
      { item: 'Eggs', quantity: 2, unit: 'units' },
      { item: 'Milk', quantity: 1, unit: 'tbsp' },
      { item: 'Butter', quantity: 1, unit: 'tsp' },
      { item: 'Bread', quantity: 2, unit: 'slices' },
    ],
    instructions: [
      'Whisk eggs with milk, salt, and pepper.',
      'Melt butter in a non-stick pan over medium heat.',
      'Pour in egg mixture. Stir gently until cooked to desired consistency.',
      'Toast bread and serve with scrambled eggs.',
    ],
    tags: ['Breakfast', 'Quick', 'Classic'],
    favorite: true,
  },
];

export const mockMealPlan = {
  '2023-10-23': {
    breakfast: 'rec3', // Scrambled Eggs with Toast
    lunch: null,
    dinner: 'rec1', // Classic Tomato Pasta
  },
  '2023-10-24': {
    breakfast: null,
    lunch: null,
    dinner: 'rec2', // Chicken Stir-fry
  },
  '2023-10-25': {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
};

export const mockShoppingList = [
  { id: 'sl1', name: 'Coffee', quantity: 1, unit: 'pack', category: 'Pantry', purchased: false },
  { id: 'sl2', name: 'Bananas', quantity: 1, unit: 'bunch', category: 'Produce', purchased: false },
  { id: 'sl3', name: 'Yogurt', quantity: 4, unit: 'cups', category: 'Dairy', purchased: true },
];

export const inventoryCategories = ['Dairy', 'Produce', 'Meat', 'Pantry', 'Bakery', 'Frozen', 'Beverages', 'Other'];
export const inventoryUnits = ['gram', 'kg', 'liter', 'ml', 'units', 'loaf', 'pack', 'bunch', 'bottle', 'can', 'box', 'tbsp', 'tsp'];
export const recipeTags = ['Italian', 'Vegetarian', 'Dinner', 'Quick', 'Asian', 'Healthy', 'Breakfast', 'Dessert', 'Soup'];
