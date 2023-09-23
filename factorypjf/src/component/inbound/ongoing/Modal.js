function Modal({ isOpen, onClose, boundId, details = [] }) { // 기본값 설정
    // 연결된 bound_id를 기반으로 상세 정보를 필터링합니다.
    const matchingDetails = details.filter(detail => detail.bound_id === boundId);

    // Modal이 열리지 않았다면 아무 것도 렌더링하지 않습니다.
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                maxWidth: '500px',
                width: '80%',
                borderRadius: '10px',
            }}>
                <table>
                    <thead>
                        <tr>
                            <th>품목코드</th>
                            <th>품목명</th>
                            <th>수량</th>
                            <th>단가</th>
                            <th>총액</th>
                            <th>입고예정일</th>
                            <th>비고</th>
                            <th>창고</th>
                            <th>장소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchingDetails.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.item_code}</td>
                                <td>{detail.item_name}</td>
                                <td>{detail.amount}</td>
                                <td>{detail.unit_price_id}</td>
                                <td>{detail.tot_amount}</td>
                                <td>{detail.detail_date}</td>
                                <td>{detail.decription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default Modal