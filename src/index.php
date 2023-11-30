<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./output.css" />
        <title>Data table</title>
        <script type="module" src="scripts/controllers.js"></script>
        <script type="module" src="scripts/dummy_data.js"></script>
    </head>

    <body class="">
        <div class="flex h-screen flex-col items-center gap-6 p-4">
                <p class="pt-2 text-5xl font-bold">Data table</p>
            <div class="w-9/12 space-y-4 px-6">
                <div class="flex justify-end gap-4">
                    <button class="btn" id="pdf-btn">Download</button>
                </div>
                <div class="rounded-md border" id="pdf-table">
                    <div class=" overflow-auto ">
                        <table class="w-full caption-bottom ">
                            <thead class="[&_tr]:border-b">
                                <tr id="col-head"></tr>
                            </thead>
                            <tbody id="row-item"></tbody>
                        </table>
                    </div>
                </div>
                <div class="flex w-full items-center justify-end space-x-2 pb-10">
                    <button class="btn-outline" id="prev-btn">Previous</button>
                    <button class="btn-outline" id="next-btn">Next</button>
                </div>
            </div>
        </div>
    </body>

</html>
