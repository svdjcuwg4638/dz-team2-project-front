import { useGlobalFilter, useTable } from 'react-table';
import Search from '../../Search';
import "../../../style/Table.css"

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data },useGlobalFilter);

  console.log(data);

  const emptyRows = new Array(Math.max(0, 13 - rows.length)).fill(null);

  return (
    <>
    <Search onSubmit={setGlobalFilter}/>
    <table className='table_scroll' {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
        {emptyRows.map((_, i) => (
          <tr key={i}>
            {columns.map((col, j) => (
              <td key={j}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default Table;