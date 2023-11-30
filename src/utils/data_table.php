<?php
// IGNORE THIS

declare(strict_types=1);

require  __DIR__ . '/get_items.php';

$data = "";

header('Content-Type: text/html; charset=utf-8');


$columnDef = ["ID", "col 1", "col 2", "col 3", "col 4", "col 5", "image"];

echo '<div class="rounded-md border ">';
echo '<div class="w-full overflow-auto">';
echo '<table class="w-auto caption-bottom ">';
echo '<thead class="[&_tr]:border-b">';
echo '<tr class="border-b transition-colors hover:bg-muted/50">';
foreach ($columnDef as $header) {
    echo '<th class="text-left h-10 p-4 align-middle font-medium text-muted-foreground">' . $header . '</th>';
}
echo '</tr>';
echo '</thead>';
echo '<tbody class="[&_tr:last-child]:border-0">';

foreach (json_decode($data) as $row) {
    echo '<tr class="border-b transition-colors hover:bg-muted/50">';
    foreach ($row as $rowItem) {
        echo '<td class="p-4 align-middle">' . $rowItem . '</td>';
    }
    echo '</tr>';
}

echo '</tbody>';
echo '</table>';
echo '</div>';
echo '</div>';
