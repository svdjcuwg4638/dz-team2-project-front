import React, { useState, useEffect, useRef } from "react";
import Table from "../../layout/Table/Table";
import axios from "axios";
import ListTable from "component/layout/Table/ListTableData";
import { ReactComponent as Arrow } from "img/rightArrow.svg";
import SearchHelperModal from "component/common/helper/SearchHelperModal";
import api from "redux/api";
import styles from "style/storage/inquiry.module.css";

const Inquiry = () => {
  // #region table headers
  const search_headers = [
    { text: "창고", value: "storage", helper: true },
    { text: "장소", value: "location", helper: true },
    { text: "카테고리", value: "category", helper: true },
    { text: "품목", value: "item", helper: true },
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
    { text: "창고", value: "storage_name", width: "9%", readonly: true },
    { text: "장소", value: "location_name", width: "15%", readonly: true },
    {
      text: "품목코드",
      value: "item_code",
      width: "7%",
      readonly: true,
    },
    { text: "품목명", value: "item_name", width: "9%", readonly: true },
    { text: "카테고리", value: "category", width: "9%", readonly: true },
    { text: "규격", value: "standard", width: "9%", readonly: true },
    { text: "단위", value: "unit", width: "5%", readonly: true },
    { text: "재고량", value: "total", width: "7%", readonly: true },
  ];
  // #endregion

  // #region states
  // grid items
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
  // #endregion

  // #region useEffect
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

    // #endregion

    // 카테고리 데이터 중복제거
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

  // 체크한 스토리지, 로케이션, 카테고리 기준 검색 함수
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

      console.log("params", params);
      const response = await api.get("/inventory/searchTable", {
        params: params,
      });
      const data = response.data.data;

      let tableItems = [];
      for (let i = 0; i < data.length; i++) {
        tableItems.push({
          item_code: data[i].item_code,
          item_name: data[i].item_name,
          category: data[i].category,
          standard: data[i].standard,
          unit: data[i].unit,
          partner_name: data[i].partner_name,
          total: data[i].total,
          storage_name: data[i].storage_name,
          location_name: data[i].location_name,
        });
      }
      setItems4(tableItems);
    } catch (error) {
      console.log(error);
    }
  };

  // 필요 데이터 가져옴
  const fetchData = async () => {
    try {
      // 스토리지 데이터 가져오기
      const storageResponse = await api.get(`/storage/all`);
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

      const locationResponse = await api.get(`/location/all`);
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
      const categoryResponse = await api.get(`/inventory/all`);
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

  // resultSection 데이터 핸들러
  const searchHandler = async () => {
    setItems4([]);

    try {
      // formData를 백엔드로 전송
      const response = await api.post("/inventory/searchForm", formData);

      const data = response.data.data;

      console.log("tata", data);
      let tableItems = [];
      for (let i = 0; i < data.length; i++) {
        tableItems.push({
          item_code: data[i].item_code,
          item_name: data[i].item_name,
          category: data[i].category,
          standard: data[i].standard,
          unit: data[i].unit,
          total: data[i].total,
          storage_name: data[i].storage_name,
          location_name: data[i].location_name,
        });
      }
      setItems4(tableItems);
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
    }
  };

  const [isSearchSectionVisible, setSearchSectionVisible] = useState(true);

  const toggleSearchSection = () => {
    setSearchSectionVisible(!isSearchSectionVisible);
  };

  return (
    <>
      <div className={styles.SectionContainer}>
        <div>
          <div>
            <div className={styles.toggleContainer}>
              <div
                className={`${styles.toggleButton} ${
                  isSearchSectionVisible ? styles.active : styles.inactive
                }`}
                onClick={toggleSearchSection}
              >
                폼 검색
              </div>
              <div
                className={`${styles.toggleButton} ${
                  isSearchSectionVisible ? styles.inactive : styles.active
                }`}
                onClick={toggleSearchSection}
              >
                테이블 검색
              </div>
            </div>
            {isSearchSectionVisible && (
              <div className={styles.btnBox}>
                <div className={styles.SearchSection}>
                  <SearchHelperModal
                    headers={search_headers}
                    formHandler={formHandler}
                  />

                  <div className="wrap-btn">
                    <button className="btn_save" onClick={searchHandler}>
                      조회
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isSearchSectionVisible && (
              <>
                <div className={styles.middlePart}>
                  <div className={styles.grid01}>
                    <Table headers={grid01_headers}>
                      <ListTable
                        items={grid01_items}
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
                    <Table headers={grid02_headers}>
                      <ListTable
                        items={grid02_items}
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
                    <Table headers={grid03_headers}>
                      <ListTable
                        items={grid03_items}
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
                <div className={styles.btnWrap}>
                  <button
                    className="btn_save"
                    onClick={(e) => inventoryInquirykFn(e)}
                  >
                    조회
                  </button>
                </div>
              </>
            )}

            <div
              className={`${styles.grid04} ${
                isSearchSectionVisible
                  ? styles.formresultStyle
                  : styles.tableresultStyle
              }`}
            >
              <Table headers={grid04_headers}>
                <ListTable items={grid04_items} />
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Inquiry;
