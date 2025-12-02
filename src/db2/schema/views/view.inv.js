const query0 = `p.id,
    p.batchNo,  p.itemId,
    i.itemType, i.itemTypeName,
    i.pid, i.itemCode, i.shortName, i.itemName,
    i.itemVariant, i.description,
    i.groupId, i.catId, i.groupName, i.catName,
    i.hsnCode, i.imageLink,
    i.supplyType, i.stock, i.variant, i.addons,
    i.unit, i.altUnit, i.unitConversion, i.unitDecimal,

    p.mfgDate, p.expDate, p.bestBefore, p.bestBeforeUnit,
    p.mrp, p.gstP, p.gstA, p.cessP, p.cessA,
    p.vatP, p.vatA, p.serviceP, p.serviceA,
    p.costInclTax, p.costExclTax, p.priceInclTax, p.priceExclTax,

    p.openingStock, p.openingValue,
    p.inwardStock, p.inwardValue, p.outwardStock, p.outwardValue,
    p.closingStock, p.closingValue,

    i.cid, i.createOn, i.modifyOn,
    i.updateOn, i.createBy, i.modifyBy, i.isActive`;

export const viewInventoryMaster = "create view "
    +" VIEW_INVENTORY_MASTER as select " + query0
    +" from RESTRO_INVENTORY_PRICE_N_STK p "
    +" inner join RESTRO_INVENTORY_MASTER i on i.id = p.itemId "
    +" WHERE i.itemType = 0 and i.isActive = 'Y' ";

export const viewVariantMaster = "create view "
    +" VIEW_VARIANT_MASTER as select " + query0
    +" from RESTRO_INVENTORY_PRICE_N_STK p "
    +" inner join RESTRO_INVENTORY_MASTER i on i.id = p.itemId "
    +" WHERE i.itemType = 1 and i.isActive = 'Y' ";


export const viewAddonMaster = "create view "
    +" VIEW_ADDON_MASTER as select " + query0
    +" from RESTRO_INVENTORY_PRICE_N_STK p "
    +" inner join RESTRO_INVENTORY_MASTER i on i.id = p.itemId "
    +" WHERE i.itemType = 2 and i.isActive = 'Y' ";

