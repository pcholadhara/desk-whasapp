import {runQuery} from "../utils/db2.sqlite.run";
import {viewAddonMaster, viewInventoryMaster, viewVariantMaster} from "../views/view.inv";
import {viewKotItems, viewKotMaster} from "../views/view.restro";

export const checkViews = async () =>{
       //recreate all views.
       const resp0 = await runQuery(viewInventoryMaster); console.log(resp0);
}


