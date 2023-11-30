/**
 * @typedef {Object} DataTableItem
 * @property {string} id - The ID of the item.
 * @property {string} text_column_1 - The first text column value.
 * @property {string} text_column_2 - The second text column value.
 * @property {string} text_column_3 - The third text column value.
 * @property {string} text_column_4 - The fourth text column value.
 * @property {string} text_column_5 - The fifth text column value.
 * @property {string} image_column - The image column value.
 */

// import { dummy_data } from "./dummy_data.js";

let currentPage = 1;
let totalPages = 1;

// Generates a blank table if no items are found.
document.addEventListener("DOMContentLoaded", function () {
    /**
     * Column headers
     * @type {Array<string>} header
     */
    const header = ["ID", "col 1", "col 2", "col 3", "col 4", "col 5", "image"];
    let headerRow = document.getElementById("col-head");
    headerRow.className = "border-b transition-colors hover:bg-muted/50";
    document.getElementById("col-head").innerHTML = "";

    header.forEach((header) => {
        let th = document.createElement("th");
        th.className =
            "h-10 p-4 text-left align-middle font-medium text-muted-foreground";
        th.textContent = header;
        headerRow.appendChild(th);
    });

    let tbody = document.getElementById("row-item");
    if (tbody.childElementCount < 1) {
        tbody.className = "[&_tr:last-child]:border-0";
        let row = document.createElement("tr");
        row.className = "border-b transition-colors hover:bg-muted/50 ";
        let td = document.createElement("td");
        td.colSpan = header.length;
        td.className = "h-24 text-center ";
        td.innerText = "No results.";

        row.appendChild(td);
        tbody.appendChild(row);
    }

    FetchData(1);

    document.getElementById("prev-btn").addEventListener("click", function () {
        FetchData(currentPage - 1);
    });

    document.getElementById("next-btn").addEventListener("click", function () {
        FetchData(currentPage + 1);
    });

    const downloadAsPdf = document.getElementById("pdf-btn");
    const pdfTable = document.getElementById("pdf-table");

    downloadAsPdf.addEventListener("click", () => {
        const tableClone = pdfTable.cloneNode(true);
        const wrapper = document.createElement("div");
        wrapper.appendChild(tableClone);

        const pdfContent = wrapper.innerHTML;

        const printWindow = window.open("", "", "width=600,height=600");
        printWindow.document.open();

        printWindow.document.write("<html><head><title>&nbsp;</title>");
        printWindow.document.write(
            '<link rel="stylesheet" href="../output.css">',
        );
        printWindow.document.write("</head><body>");
        printWindow.document.write(pdfContent);
        printWindow.document.write(
            '<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>',
        );

        printWindow.document.close();
    });
});

/** Fetches data by page
 * @async
 * @param {number} page
 */
async function FetchData(page) {
    const resp = fetch("utils/get_items.php?page=" + page).then((resp) =>
        resp.json(),
    );
    const response = await resp;
    totalPages = Math.ceil(response.totalRecords / 10);

    /**
     * Table item
     *
     * @type {Array<DataTableItem>} data
     */
    const data = response.data;

    let tbody = document.getElementById("row-item");
    document.getElementById("row-item").innerHTML = "";
    const headers = Object.keys(data[0]);
    tbody.className = "[&_tr:last-child]:border-0";

    data.forEach((item) => {
        let row = document.createElement("tr");
        row.className = "border-b transition-colors hover:bg-muted/50";
        headers.forEach((header) => {
            let td = document.createElement("td");
            if (header != "image_column") {
                td.className = "p-2 align-middle";
                td.textContent = item[header];
            } else {
                const img = document.createElement("img");
                img.src = item.image_column;
                td.className = "p-2 align-middle";
                img.className = "h-auto w-[150px] object-scale-down";
                td.appendChild(img);
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    currentPage = page;
    document.getElementById("prev-btn").disabled = currentPage <= 1;
    document.getElementById("next-btn").disabled = currentPage >= totalPages;
}
