import React from 'react'

function SubTable({ filteredDetailData }) {
    console.log('디테일필터데이터는',filteredDetailData)
    return (
        <table>
            <tbody>
                {filteredDetailData.map((filteredDetailData, index) => (
                    <tr key={index}>
                        <td>{filteredDetailData.item_code}</td>
                        <td>{filteredDetailData.item_name}</td>
                        <td>{filteredDetailData.amount}</td>
                        <td>{filteredDetailData.unit_price}</td>
                        <td>{filteredDetailData.storage_code}</td>
                        <td>{filteredDetailData.location_code}</td>
                        <td>{filteredDetailData.detail_date}</td>
                        <td>{filteredDetailData.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}







export default SubTable