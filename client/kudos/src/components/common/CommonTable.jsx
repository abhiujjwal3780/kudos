import React from "react";
import "./CommonTable.css";

const CommonTable = ({ columns, data }) => (
    <div className="common-table-container">
        <table className="common-table">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} style={{ textAlign: "center" }}>No data found.</td>
                    </tr>
                ) : (
                    data.map((row, idx) => (
                        <tr key={row.id || idx}>
                            {columns.map(col => (
                                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default CommonTable;