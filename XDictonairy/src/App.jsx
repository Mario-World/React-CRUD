import React, { useState } from "react";

const XTable = () => {
  const [data, setData] = useState([
    { date: "2022-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-01", views: 100, article: "Article 1" },
    { date: "2023-09-02", views: 150, article: "Article 2" },
    { date: "2023-09-02", views: 120, article: "Article 3" },
    { date: "2020-09-03", views: 200, article: "Article 4" },
  ]);

  // ---------- Sort By Date ----------
  const sortByDate = () => {
    const sorted = [...data].sort((a, b) => {
      // first sort by date (latest first)
      const dateCompare = new Date(b.date) - new Date(a.date);
      if (dateCompare !== 0) return dateCompare;

      // if dates are same → sort by views (highest first)
      return b.views - a.views;
    });

    setData(sorted);
  };

  // ---------- Sort By Views ----------
  const sortByViews = () => {
    const sorted = [...data].sort((a, b) => {
      // first sort by views (highest first)
      const viewCompare = b.views - a.views;
      if (viewCompare !== 0) return viewCompare;

      // if views are same → sort by date (latest first)
      return new Date(b.date) - new Date(a.date);
    });

    setData(sorted);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Date and Views Table</h1>

      <button onClick={sortByDate} style={{ marginRight: "10px" }}>
        Sort by Date
      </button>

      <button onClick={sortByViews}>
        Sort by Views
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Views</th>
            <th>Article</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.views}</td>
              <td>{row.article}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default XTable;
