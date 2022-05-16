"use strict";
const express = require('express');
const router = express.Router();
const ROController = require('../controller/RestockOrderController');
const DAO = require("../db/DAO")
const dao = new DAO();
const roc = new ROController(dao);

router.get("/restockOrders",roc.getRestockOrders);
router.get("/restockOrdersIssued",roc.getRestockOrdersIssued);
router.post("/restockOrder", roc.createRestockOrder);
router.get("/restockOrders/:id",roc.getRestockOrderById);
router.delete("/restockOrder/:id",roc.deleteRestockOrder);
router.put("/restockOrder/:id", roc.modifyRestockOrderState);
router.put("/restockOrder/:id/skuItems", roc.setSkuItems);
router.put("/restockOrder/:id/transportNote",roc.addTransportNote);
router.get("/restockOrders/:id/returnItems",roc.getReturnItems);


module.exports = router;