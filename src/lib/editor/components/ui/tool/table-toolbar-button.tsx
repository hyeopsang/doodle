import { useState } from "react";
import { TablePlugin, useTableMergeState } from "@platejs/table/react";
import { KEYS } from "platejs";
import { useEditorPlugin, useEditorSelector } from "platejs/react";

export function TableToolbarButton() {
  const tableSelected = useEditorSelector(
    (editor) => editor.api.some({ match: { type: KEYS.table } }),
    []
  );

  const { editor, tf } = useEditorPlugin(TablePlugin);
  const [open, setOpen] = useState(false);
  const mergeState = useTableMergeState();

  const [tablePicker, setTablePicker] = useState({
    grid: Array.from({ length: 8 }, () => Array.from({ length: 8 }).fill(0)),
    size: { colCount: 0, rowCount: 0 },
  });

  const onCellMove = (rowIndex: number, colIndex: number) => {
    const newGrid = [...tablePicker.grid].map((row, i) =>
      row.map((_, j) => (i <= rowIndex && j <= colIndex ? 1 : 0))
    );

    setTablePicker({
      grid: newGrid,
      size: { colCount: colIndex + 1, rowCount: rowIndex + 1 },
    });
  };

  return (
    <div className="relative inline-block">
      {/* 메인 버튼 */}
      <button
        type="button"
        title="Table"
        className={`flex items-center gap-1 rounded-md px-3 py-1 text-sm border ${
          open ? "bg-gray-300" : "bg-gray-100"
        } hover:bg-gray-200`}
        onClick={() => setOpen((v) => !v)}
      >
        🗄️ 표
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute left-0 top-full mt-1 w-52 rounded-md border bg-white shadow z-50 p-2 flex flex-col gap-2">
          {/* Table Picker */}
          <div
            className="grid grid-cols-8 gap-0.5 cursor-pointer"
            onClick={() => {
              tf.insert.table(tablePicker.size, { select: true });
              editor.tf.focus();
            }}
          >
            {tablePicker.grid.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-4 h-4 border ${
                    value
                      ? "border-black bg-gray-700"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  onMouseMove={() => onCellMove(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
          <div className="text-center text-xs">
            {tablePicker.size.rowCount} x {tablePicker.size.colCount}
          </div>

          {/* Cell Actions */}
          <button
            type="button"
            disabled={!mergeState.canMerge}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.table.merge();
              editor.tf.focus();
            }}
          >
            🔗 Merge cells
          </button>
          <button
            type="button"
            disabled={!mergeState.canSplit}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.table.split();
              editor.tf.focus();
            }}
          >
            🧩 Split cell
          </button>

          {/* Row Actions */}
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.insert.tableRow({ before: true });
              editor.tf.focus();
            }}
          >
            ⬆️ Insert row before
          </button>
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.insert.tableRow();
              editor.tf.focus();
            }}
          >
            ⬇️ Insert row after
          </button>
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.remove.tableRow();
              editor.tf.focus();
            }}
          >
            ❌ Delete row
          </button>

          {/* Column Actions */}
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.insert.tableColumn({ before: true });
              editor.tf.focus();
            }}
          >
            ⬅️ Insert column before
          </button>
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.insert.tableColumn();
              editor.tf.focus();
            }}
          >
            ➡️ Insert column after
          </button>
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-gray-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.remove.tableColumn();
              editor.tf.focus();
            }}
          >
            ❌ Delete column
          </button>

          {/* Delete table */}
          <button
            type="button"
            disabled={!tableSelected}
            className="text-left text-sm hover:bg-red-100 p-1 rounded disabled:text-gray-400"
            onClick={() => {
              tf.remove.table();
              editor.tf.focus();
            }}
          >
            🗑️ Delete table
          </button>
        </div>
      )}
    </div>
  );
}
