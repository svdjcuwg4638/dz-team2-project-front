import React from 'react'

function SubTable({ searchDetailData }) {
    return (
        <table>
            <tbody>
                {searchDetailData.map((searchDetailData, index) => (
                    <tr key={index}>
                        {/* 예시로 몇 가지 속성만 추가하였습니다. 필요한 속성들을 추가로 입력해주세요. */}
                        <td>{searchDetailData.item_code}</td>
                        <td>{searchDetailData.item_name}</td>
                        <td>{searchDetailData.amount}</td>
                        <td>{searchDetailData.unit_price_id}</td>
                        <td>{searchDetailData.tot_amount}</td>
                        <td>{searchDetailData.tot_amount}</td>
                        <td>{searchDetailData.tot_amount}</td>
                        <td>{searchDetailData.tot_amount}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
}







export default SubTable