import React from 'react'

function MasterTable({ searchData =[], onRowClick  }) {
    console.log('searchData는',searchData)
    return (
        <table>
            <tbody>
                {searchData.map((searchData, index) => (
                    <tr key={index} onClick={() => onRowClick(searchData.bound_id)}>
                        <td>{searchData.bound_no}</td>
                        <td>{searchData.bound_category}</td>
                        <td>{searchData.partner_code}</td>
                        <td>{searchData.bound_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MasterTable