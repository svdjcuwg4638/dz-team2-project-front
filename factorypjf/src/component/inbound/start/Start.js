import React, { useEffect, useState } from 'react';
import Table from '../table/Table';
import MasterAddTable from './table/MasterAddTable';
import api from 'redux/api';
import DetailAddTable from './table/DetailAddTable';
import inboundClasses from '../../../style/inbound/inbound.module.css'

function Start() {

    //Database 마지막 bound_id가져온후 MasterForm과 DetailForm Bound_id대입
    useEffect(() => {
        async function getid() {
          try {
            const response = await api.get('/inbound/getid');
            const boundId = response.data;
            
            setMasterFormdata((prevData) => {
              const updatedFormData = [...prevData];
              updatedFormData[0].bound_id = boundId.data+1;
              return updatedFormData;
            });
    
            setDetailFormData((prevData) => {
              const updatedFormData = [...prevData];
              updatedFormData[0].bound_id = boundId.data+1;
              return updatedFormData;
            });       
            
            console.log('받은 bound_id: ' + boundId.data);
            setMaxBoundId(boundId.data+1);
            
            
          } catch (error) {
            console.log('Error = ' + error);
          }
        }
        getid();
      }, []);
      

      //Master에서 Click한 boundID
      const [BoundId, setClickBoundId] = useState(1);
      useEffect(()=>{
        console.log('클릭bound'+BoundId);
      },[BoundId]);

      //Server요청받은 MaxBoundId
      const [maxBoundId, setMaxBoundId] = useState(1);

      //Master에서 row추가시 bound_id 배열형태로 보관
      const [configBoundId, setConfigBoundId]= useState([maxBoundId]);
      
      //
      const [rowCount, setRowCount] = useState(1);
    
      const [masterFormdata, setMasterFormdata] = useState([
        {
          emp_id: 1,
          bound_id: "", 
          bound_no: "",
          bound_type: "",
          partner_name: "",
          bound_date: "",
        },
      ]);
    
      const [detailFormdata, setDetailFormData] = useState([
        {
          bound_id: "",
          item_code: "",
          item_name: "",
          amount: "",
          bound_date: "",
          description: "",
        },
      ]);
    
      const masterInputChangeHandler = (event) => {
        const { name, value } = event.target;
        setMasterFormdata((prevState) => ({ ...prevState, [name]: value }));
      };
    
      const detailInputChangeHandler = (event) => {
        const { name, value } = event.target;
        setDetailFormData((prevState) => ({ ...prevState, [name]: value }));
      };
    

    const grid01_headers = [
        { text: "선택", value: "select", width: "9%" },
        { text: "문서번호", value: "boundno", width: "9%" },
        { text: "유형", value: "type", width: "9%" },
        {
        text: "거래처",
        value: "partner",
        width: "9%",
        helper: true,
        gridTrigger: true,
        },
        { text: "입고예정일", value: "itemName", width: "9%", helper: true },
    ];

    const grid02_headers = [
        { text: "선택", value: "select", width: "9%" },
        { text: "품목코드", value: "item_code", width: "5%" },
        { text: "품목명", value: "item_name", width: "5%" },
        { text: "수량", value: "amount", width: "15%" },
        { text: "입고예정일", value: "bound_date", width: "8%", helper: true },
        { text: "비고", value: "description", width: "20%" },
    ];

    useEffect(() => {
        // console.log(masterFormdata);
        // console.log('테스트 = '+masterFormdata.length);
    }, [masterFormdata]);

    useEffect(()=> {
        console.log(masterFormdata);
    },[masterFormdata]);
    useEffect(() => {
        console.log(detailFormdata);
    }, [detailFormdata]);

    return (
        <div className={inboundClasses.wrap}>
            <p className={inboundClasses["sub-menu-name"]}>입고예정</p>
            <Table headers={grid01_headers}></Table>
            <MasterAddTable
                headers={grid01_headers}
                setMasterFormdata={setMasterFormdata}
                masterFormdata={masterFormdata}
                masterInputChangeHandler={masterInputChangeHandler}
                maxBoundId={maxBoundId}
                rowCount={rowCount}
                setRowCount={setRowCount}
                setClickBoundId={setClickBoundId}
                setMaxBoundId={setMaxBoundId}
                setConfigBoundId={setConfigBoundId}
                setDetailFormData={setDetailFormData}
            />
            <Table headers={grid02_headers}></Table>
            <DetailAddTable
                maxBoundId={maxBoundId}
                detailFormData={detailFormdata}
                setDetailFormData={setDetailFormData}
                rowCount={rowCount}
                BoundId={BoundId}
                configBoundId={configBoundId}
            />
            <button>삭제</button>
            <button>저장</button>
        </div>
    );
}

export default Start;