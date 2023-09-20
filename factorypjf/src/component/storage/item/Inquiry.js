import React, { useState, useEffect, useRef } from "react";
import styles from "../../../style/storage/inquiry.module.css";
import AddTableData from "component/layout/Table/AddTableData";
import Table from "../../layout/Table/Table";
import axios from "axios";
import ListTable from "component/layout/Table/ListTableData";
import { ReactComponent as Arrow } from "img/rightArrow.svg";
import SearchHelperModal from "component/common/helper/SearchHelperModal";

const Inquiry = () => {
  const search_headers = [
    { text: "창고", value: "storage", helper: true },
    { text: "장소", value: "location", helper: true },
    { text: "카테고리", value: "category", helper: true },
    { text: "단위", value: "unit" },
    { text: "품목", value: "item", helper: true },
    { text: "거래처", value: "partner", helper: true },
  ];
  const grid01_headers = [
    { text: "선택", value: "select", width: "3%", readonly: true },
    { text: "창고명", value: "storage_name", width: "15%", readonly: true },
  ];
  const [grid01_items, setItems1] = useState([]);

  const grid02_headers = [
    { text: "선택", value: "select", width: "3%", readonly: true },
    { text: "장소", value: "location_name", width: "15%", readonly: true },
  ];
  const grid03_headers = [
    { text: "선택", value: "select", width: "3%", readonly: true },
    { text: "카테고리", value: "category", width: "15%", readonly: true },
  ];
  const grid04_headers = [
    { text: "창고명", value: "storage_name", width: "9%", readonly: true },

    { text: "장소", value: "location_name", width: "15%", readonly: true },

    {
      text: "품목코드",
      value: "item_code",
      width: "7%",
      helper: true,
      readonly: true,
    },

    { text: "품목명", value: "item_name", width: "9%", readonly: true },
    { text: "카테고리", value: "category", width: "9%", readonly: true },

    { text: "규격", value: "standard", width: "20%", readonly: true },

    { text: "단위", value: "unit", width: "5%", readonly: true },

    { text: "거래처명", value: "partner_name", width: "9%", readonly: true },

    { text: "수량", value: "total", width: "7%", readonly: true },
  ];

  const [grid02_items, setItems2] = useState([]);
  const [grid03_items, setItems3] = useState([]);
  const [grid04_items, setItems4] = useState([]);

  // 데이터 필터링을 위해 필요한 상태
  const [locationTableItems, setLocationTableItems] = useState([]);
  const [categoryTableItems, setCategoryTableItems] = useState([]);

  // 상위 컴포넌트에서 선택된 행 정보 관리
  const [selectedStorageRows, setSelectedStorageRows] = useState([]);
  const [selectedLocationRows, setSelectedLocationRows] = useState([]);
  const [selectedCategoryRows, setSelectedCategoryRows] = useState([]);

  // 폼테이블 데이터 저장
  const [formData, setFormData] = useState([]);
  // 첫화면, storage all조회;
  useEffect(() => {
    fetchData();
  }, []);

  // 선택된 스토리지에 해당하는 로케이션 데이터 필터링
  useEffect(() => {
    const selectedLocationRows = locationTableItems.filter((location) =>
      selectedStorageRows.some(
        (storage) => storage.storage_code === location.storage_code
      )
    );
    setItems2(selectedLocationRows);
  }, [selectedStorageRows, locationTableItems]);

  // 선택된 로케이션에 해당하는 카테고리 데이터 필터링
  useEffect(() => {
    const temp = categoryTableItems.filter((category) =>
      selectedLocationRows.some(
        (location) => location.location_code === category.location_code
      )
    );
    // 중복제거
    const selectedCategoryRows = Array.from(
      new Set(temp.map((item) => item.category))
    ).map((category) => temp.find((item) => item.category === category));
    setItems3(selectedCategoryRows);
  }, [selectedLocationRows, categoryTableItems]);

  // 체크박스 선택 상태 변경 함수
  const handleCheckboxChange = (item, setRows, rows) => {
    // 창고 체크박스 상태 변경일시 location 선택 초기화, grid02 데이터 초기화
    if (rows === selectedStorageRows) {
      setSelectedLocationRows([]);
      setItems2([]);
    } else if (rows === selectedLocationRows) {
      // 장소 체크박스 상태 변경일시 cateory 선택 초기화, grid03 데이터 초기화
      setSelectedCategoryRows([]);
      setItems3([]);
    }
    if (rows.includes(item)) {
      setRows(rows.filter((selectedItem) => selectedItem !== item));
    } else {
      setRows([...rows, item]);
    }
  };

  // 체크한 스토리지 로케이션 기준 검색 함수
  const inventoryInquirykFn = async (e) => {
    setItems4([]);
    try {
      // 선택된 storage와 location, category 데이터 추출
      const selectedStorageCodes = selectedStorageRows.map(
        (storage) => storage.storage_code
      );
      const selectedLocationCodes = selectedLocationRows.map(
        (location) => location.location_code
      );
      const selectedCategorys = selectedCategoryRows.map(
        (category) => category.category
      );

      const params = {
        storageCodes: selectedStorageCodes.join(","), // storage_code들을 콤마로 연결
        locationCodes: selectedLocationCodes.join(","), // location_code들을 콤마로 연결
        categorys: selectedCategorys.join(","), // category들을 콤마로 연결
      };

      const response = await axios.get(
        "http://localhost:8080/inventory/search",
        {
          params: params,
        }
      );
      const data = response.data.data;

      let tableItems = [];
      for (let i = 0; i < data.length; i++) {
        tableItems.push({
          item_code: data[i].item_code,
          item_name: data[i].item_name,
          category: data[i].category,
          standard: `${data[i].weight} *${data[i].length}* ${data[i].height}, ${data[i].volume}, ${data[i].weight}`,
          unit: data[i].unit,
          partner_name: data[i].partner_name,
          total: data[i].total,
          storage_name: data[i].storage_code,
          location_name: data[i].location_name,
        });
      }
      setItems4(tableItems);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      // 스토리지 데이터 가져오기
      const storageResponse = await axios.get(
        `http://localhost:8080/storage/all`
      );
      const storageData = storageResponse.data.data;
      let storageTableItems = [];
      for (let i = 0; i < storageData.length; i++) {
        storageTableItems.push({
          storage_code: storageData[i].storage_code,
          storage_name: storageData[i].storage_name,
        });
      }
      setItems1(storageTableItems);

      // 로케이션 데이터 가져오기
      let locationTableItems = [];

      const locationResponse = await axios.get(
        `http://localhost:8080/location/all`
      );
      const locationData = locationResponse.data.data;
      for (let i = 0; i < locationData.length; i++) {
        locationTableItems.push({
          storage_code: locationData[i].storage_code,
          location_code: locationData[i].location_code,
          location_name: locationData[i].location_name,
        });
      }
      setLocationTableItems(locationTableItems);

      //카테고리 데이터 가져오기
      const categoryResponse = await axios.get(
        `http://localhost:8080/inventory/all`
      );
      const categoryData = categoryResponse.data.data;
      let categoryTableItems = [];
      for (let i = 0; i < categoryData.length; i++) {
        categoryTableItems.push({
          location_code: categoryData[i].location_code,
          category: categoryData[i].category,
        });
      }
      setCategoryTableItems(categoryTableItems);
    } catch (error) {
      console.log(error);
    }
  };

  // 폼으로 받아온 데이터를 상태에 저장함
  const formHandler = (tableItems) => {
    setFormData(tableItems);
  };
  const searchHandler = () => {
    console.log(formData);
  };
  return (
    <div className={styles.SectionContainer}>
      <div>
        <div className={styles.headerSection}>
          <h4 className={styles.header}> 재고 조회</h4>
        </div>
        <div className={styles.container}>
          <div>
            <div className={styles.SearchSection}>
              <table>
                <tbody>
                  <SearchHelperModal
                    headers={search_headers}
                    formHandler={formHandler}
                  />
                </tbody>
              </table>
              <div className={styles.btnBox}>
                <button className={styles.btn} onClick={searchHandler}>
                  조회
                </button>
              </div>
            </div>
            <div className={styles.middlePart}>
              <div className={styles.grid01}>
                <Table maxHeight="150px" headers={grid01_headers}>
                  <ListTable
                    items={grid01_items}
                    selectedRows={selectedStorageRows}
                    onCheckboxChange={(item) =>
                      handleCheckboxChange(
                        item,
                        setSelectedStorageRows,
                        selectedStorageRows
                      )
                    }
                  />
                </Table>
              </div>
              <Arrow width="3%" height="175" />
              <div className={styles.grid02}>
                <Table maxHeight="150px" headers={grid02_headers}>
                  <ListTable
                    items={grid02_items}
                    selectedRows={selectedLocationRows}
                    onCheckboxChange={(item) =>
                      handleCheckboxChange(
                        item,
                        setSelectedLocationRows,
                        selectedLocationRows
                      )
                    }
                  />
                </Table>
              </div>
              <Arrow width="3%" height="175" />
              <div className={styles.grid03}>
                <Table maxHeight="150px" headers={grid03_headers}>
                  <ListTable
                    items={grid03_items}
                    selectedRows={selectedCategoryRows}
                    onCheckboxChange={(item) =>
                      handleCheckboxChange(
                        item,
                        setSelectedCategoryRows,
                        selectedCategoryRows
                      )
                    }
                  />
                </Table>
              </div>
            </div>
            <div className={styles.btnBox}>
              <button
                className={styles.btn}
                onClick={(e) => inventoryInquirykFn(e)}
              >
                조회
              </button>
            </div>
            <div className={styles.grid04}>
              <Table maxHeight="250px" headers={grid04_headers}>
                <ListTable items={grid04_items} />
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Inquiry;
