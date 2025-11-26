/**
 * Eaglercraft Netherite Mod
 * Adds netherite armor, tools, ingots and smithing table to Eaglercraft
 */

// Assuming 'game' is a global object provided by Eaglercraft, no declaration is needed here.
// If 'game' needs to be imported or defined, that would be done here.
// For example:
// const game = eaglercraft.getGame(); // Hypothetical Eaglercraft API

// Register new items
function registerNetheriteItems() {
  // Register netherite ingot
  game.registerItem('netherite_ingot', {
    id: 750, // Using a custom ID that doesn't conflict with existing items
    name: 'Netherite Ingot',
    stackSize: 64,
    texture: {
      path: 'textures/items/netherite_ingot.png'
    }
  });

  // Register netherite armor
  game.registerItem('netherite_helmet', {
    id: 751,
    name: 'Netherite Helmet',
    stackSize: 1,
    durability: 407,
    armorPoints: 3,
    armorSlot: 'head',
    texture: {
      path: 'textures/items/netherite_helmet.png'
    }
  });

  game.registerItem('netherite_chestplate', {
    id: 752,
    name: 'Netherite Chestplate',
    stackSize: 1,
    durability: 592,
    armorPoints: 8,
    armorSlot: 'chest',
    texture: {
      path: 'textures/items/netherite_chestplate.png'
    }
  });

  game.registerItem('netherite_leggings', {
    id: 753,
    name: 'Netherite Leggings',
    stackSize: 1,
    durability: 555,
    armorPoints: 6,
    armorSlot: 'legs',
    texture: {
      path: 'textures/items/netherite_leggings.png'
    }
  });

  game.registerItem('netherite_boots', {
    id: 754,
    name: 'Netherite Boots',
    stackSize: 1,
    durability: 481,
    armorPoints: 3,
    armorSlot: 'feet',
    texture: {
      path: 'textures/items/netherite_boots.png'
    }
  });

  // Register netherite tools
  game.registerItem('netherite_sword', {
    id: 755,
    name: 'Netherite Sword',
    stackSize: 1,
    durability: 2031,
    damage: 8,
    texture: {
      path: 'textures/items/netherite_sword.png'
    }
  });

  game.registerItem('netherite_pickaxe', {
    id: 756,
    name: 'Netherite Pickaxe',
    stackSize: 1,
    durability: 2031,
    miningSpeed: 9,
    texture: {
      path: 'textures/items/netherite_pickaxe.png'
    }
  });

  game.registerItem('netherite_axe', {
    id: 757,
    name: 'Netherite Axe',
    stackSize: 1,
    durability: 2031,
    damage: 10,
    miningSpeed: 9,
    texture: {
      path: 'textures/items/netherite_axe.png'
    }
  });

  game.registerItem('netherite_shovel', {
    id: 758,
    name: 'Netherite Shovel',
    stackSize: 1,
    durability: 2031,
    miningSpeed: 9,
    texture: {
      path: 'textures/items/netherite_shovel.png'
    }
  });

  game.registerItem('netherite_hoe', {
    id: 759,
    name: 'Netherite Hoe',
    stackSize: 1,
    durability: 2031,
    texture: {
      path: 'textures/items/netherite_hoe.png'
    }
  });

  // Register smithing table block
  game.registerBlock('smithing_table', {
    id: 760,
    name: 'Smithing Table',
    hardness: 2.5,
    material: 'wood',
    texture: {
      top: 'textures/blocks/smithing_table_top.png',
      side: 'textures/blocks/smithing_table_side.png',
      bottom: 'textures/blocks/smithing_table_bottom.png'
    },
    onInteract: function(player) {
      openSmithingTableGUI(player);
    }
  });
}

// Create smithing table GUI
function openSmithingTableGUI(player) {
  const gui = new game.GUI('Smithing Table', 3, 3);
  
  // Add slots for diamond item, netherite ingot, and result
  gui.addSlot(1, 1, { filter: 'diamond_gear' });
  gui.addSlot(2, 1, { filter: 'netherite_ingot' });
  gui.addResultSlot(3, 1);
  
  // Set up crafting logic
  gui.onCraft = function(items) {
    const diamondItem = items[0];
    const netheriteIngot = items[1];
    
    if (!diamondItem || !netheriteIngot) return null;
    
    // Convert diamond gear to netherite
    const conversionMap = {
      'diamond_helmet': 'netherite_helmet',
      'diamond_chestplate': 'netherite_chestplate',
      'diamond_leggings': 'netherite_leggings',
      'diamond_boots': 'netherite_boots',
      'diamond_sword': 'netherite_sword',
      'diamond_pickaxe': 'netherite_pickaxe',
      'diamond_axe': 'netherite_axe',
      'diamond_shovel': 'netherite_shovel',
      'diamond_hoe': 'netherite_hoe'
    };
    
    const netheriteVersion = conversionMap[diamondItem.id];
    if (netheriteVersion && netheriteIngot.id === 'netherite_ingot') {
      return game.createItem(netheriteVersion, 1);
    }
    
    return null;
  };
  
  gui.open(player);
}

// Add crafting recipes
function addCraftingRecipes() {
  // Smithing table recipe
  game.addCraftingRecipe({
    pattern: [
      'II',
      'WW',
      'WW'
    ],
    items: {
      'I': 'iron_ingot',
      'W': 'wooden_planks'
    },
    result: {
      item: 'smithing_table',
      count: 1
    }
  });
  
  // Netherite ingot from ancient debris (furnace recipe)
  game.addFurnaceRecipe('ancient_debris', 'netherite_scrap', 2.0);
  
  // Netherite ingot crafting (4 netherite scrap + 4 gold ingots)
  game.addShapelessRecipe({
    ingredients: [
      { item: 'netherite_scrap', count: 4 },
      { item: 'gold_ingot', count: 4 }
    ],
    result: {
      item: 'netherite_ingot',
      count: 1
    }
  });
}

// Add netherite generation in the Nether
function addNetheriteGeneration() {
  game.registerOreGeneration({
    blockId: 'ancient_debris',
    dimension: 'nether',
    maxHeight: 22,
    minHeight: 8,
    veinSize: 3,
    veinsPerChunk: 1
  });
  
  // Additional rare veins higher up
  game.registerOreGeneration({
    blockId: 'ancient_debris',
    dimension: 'nether',
    maxHeight: 119,
    minHeight: 103,
    veinSize: 2,
    veinsPerChunk: 1,
    rarity: 0.5 // 50% chance per chunk
  });
}

// Initialize the mod
function initNetheriteMod() {
  console.log('Initializing Netherite Mod for Eaglercraft');
  registerNetheriteItems();
  addCraftingRecipes();
  addNetheriteGeneration();
  console.log('Netherite Mod initialized successfully');
}

// Register mod with Eaglercraft
game.registerMod({
  name: 'Netherite Mod',
  version: '1.0.0',
  author: 'Your Name',
  description: 'Adds netherite items and smithing table to Eaglercraft',
  init: initNetheriteMod
});
