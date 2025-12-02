export const viewKotItems =
    "create view VIEW_KOT_ITEMS as select " +
    "kot.id, kot.kotMasterId, " +
    "kot.itemId, kot.itemName, kot.qntyBilled, " +
    "kot.qntyCanceled, kot.unit, kot.price, kot.amount, " +
    "kot.isBilled, kot.cid, kot.createOn, " +
    "kot.modifyOn, kot.modifyBy, kot.isActive, " +
    "master.longDate, master.fyear, master.invoiceId, master.invoiceNo, " +
    "master.tableId, " +
    "master.tableName, master.waiterId, master.waiterName, master.kotStatus " +
    "from RESTRO_KOT_ITEMS kot " +
    "inner join RESTRO_KOT_MASTER master on master.id = kot.kotMasterId " +
    "where kot.isActive = 'Y' and master.isActive = 'Y' ";

export const viewKotMaster =
    "create view VIEW_KOT_MASTER as select " +
    "master.*, tbl.tableType " +
    "from RESTRO_KOT_MASTER as master " +
    "inner join RESTRO_TABLES tbl on tbl.id = master.tableId " +
    "where master.isActive = 'Y' ";