import * as XSLX from "xlsx";

export const writeJson2XLS = (data, filename) => {
    const wb = XSLX.utils.book_new();
    const ws = XSLX.utils.json_to_sheet(data);
    XSLX.utils.book_append_sheet(wb, ws, "sheet1");
    XSLX.writeFile(wb, filename);
}

