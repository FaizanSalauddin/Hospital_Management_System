import Item from "../models/Items.js";

// 📌 GET all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 ADD item
export const addItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 UPDATE item
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 DELETE item
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📌 PURCHASE item
export const purchaseItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    if (item.quantity <= 0) {
      return res.status(400).json({ msg: "Out of stock" });
    }

    item.quantity -= 1;
    await item.save();

    res.json({ msg: "Purchased successfully", item });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};