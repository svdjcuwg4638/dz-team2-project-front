import SearchHelperModal from "component/common/helper/SearchHelperModal";
import ListTableData from "component/layout/Table/ListTableData";
import React, { useEffect, useState } from "react";
import Table from "component/layout/Table/Table";
import styles from "style/storage/movementsList.module.css";
import axios from "axios";
import { ReactComponent as Arrow } from "img/rightArrow.svg";
import api from "redux/api";
export const MovementsList = () => {
  const search_outbound_headers = [
    { text: "출고창고", value: "storage", helper: true },
    { text: "출고장소", value: "location", helper: true },
  ];
  const search_inbound_headers = [
    { text: "입고창고", value: "storage", helper: true },
    { text: "입고장소", value: "location", helper: true },
  ];
  const search_etc_headers = [
    { text: "품목", value: "item", helper: true },
    { text: "담당자", value: "emp", helper: true },
  ];
  const table_headers = [
    { text: "이동일", value: "movement_date", width: "7%", readonly: true },
    { text: "품목", value: "item_name", width: "7%", readonly: true },
    { text: "출고창고", value: "outbound_storage_name", readonly: true },
    { text: "출고장소", value: "outbound_location_name", readonly: true },
    { text: "입고창고", value: "inbound_storage_name", readonly: true },
    { text: "입고장소", value: "inbound_location_name", readonly: true },
    { text: "이동재고", value: "movement", width: "7%", readonly: true },
    { text: "담당자", value: "emp_name", width: "9%", readonly: true },
    { text: "비고", value: "description", readonly: true },
  ];
  const [searchOutboundData, setSearchOutboundData] = useState([]);
  const [searchInboundData, setSearchInboundData] = useState([]);
  const [searchEtcData, setSearchEtcData] = useState([]);

  const [searchPeriod, setSearchPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  const [tableItems, setTableItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  const pageSize = 10; // 페이지당 아이템 수

  useEffect(() => {
    // 페이지가 변경될 때마다 API 호출
    fetchData(currentPage);
  }, [currentPage]);
  useEffect(() => {
    // Fetch all data when the component mounts
    fetchData(1, {}); // Fetch the first page of data
  }, []);

  const fetchData = async (page) => {
    try {
      let formDatas = {
        outbound_location_code: searchOutboundData["locationCode"],
        outbound_storage_code: searchOutboundData["storageCode"],
        inbound_location_code: searchInboundData["locationCode"],
        inbound_storage_code: searchInboundData["storageCode"],
        start_date: searchPeriod["startDate"],
        end_date: searchPeriod["endDate"],
        emp_id: searchEtcData["empCode"],
        item_code: searchEtcData["itemCode"],
      };
      const response = await api.get(`inventory/movement/search`, {
        params: {
          page: page,
          pageSize,
          ...formDatas, // Include search parameters if provided
        },
      });
      console.log("page", "pageSize", pageSize, "response", response);
      const countresponse = await api.get("/inventory/movement/totalcount", {
        params: formDatas,
      });
      setTotalPages(Math.ceil(countresponse.data.data / pageSize));
      console.log(countresponse.data.data, totalPages);
      setTableItems(response.data.data);
      console.log("현재 테이블", tableItems);
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
    }
  };

  const nextGroup1 = () => {
    if (totalPages > pageNumbers[4]) Pagination(pageNumbers[0] + 1);
  };
  const nextGroup5 = () => {
    if (totalPages > pageNumbers[pageNumbers.length - 1] + 5) {
      Pagination(pageNumbers[0] + 5);
    } else {
      if (totalPages - 4 > 0) Pagination(totalPages - 4);
      else Pagination(1);
    }
  };
  const prevGroup1 = () => {
    if (pageNumbers[0] > 1) Pagination(pageNumbers[0] - 1);
  };
  const prevGroup5 = () => {
    if (pageNumbers[0] > 5) Pagination(pageNumbers[0] - 5);
    else Pagination(1);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage); // Call fetchData with the new page number
  };

  const Pagination = (startpage) => {
    // Create a new array with page numbers from 1 to totalPages
    const newPageNumbers = [];
    if (startpage + 4 < totalPages)
      for (let i = startpage; i <= startpage + 4; i++) {
        newPageNumbers.push(i);
      }
    else
      for (let i = startpage; i <= totalPages; i++) {
        newPageNumbers.push(i);
      }

    setPageNumbers(newPageNumbers); // Update the state with the new array
  };

  // Update the pageNumbers array when totalPages changes
  useEffect(() => {
    Pagination(1);
  }, [totalPages]);

  return (
    <>
      {/* <div className={styles.headerCon}>
        <div className={styles.headerSection}>
          <h4 className={styles.header}>재고이동내역</h4>
        </div>
      </div> */}
      <div className={styles.SectionContainer}>
        <div>
          <div>
            <div>
              <div className={styles.inoutCon}>
                <div className={styles.left}>
                  <SearchHelperModal
                    headers={search_outbound_headers}
                    formHandler={setSearchOutboundData}
                  />
                </div>
                <Arrow width="30px" height="138" />

                <div className={styles.right}>
                  <SearchHelperModal
                    headers={search_inbound_headers}
                    formHandler={setSearchInboundData}
                  />
                </div>
              </div>
              <div className={styles.inoutCon}>
                <div className={styles.etcCon}>
                  <SearchHelperModal
                    headers={search_etc_headers}
                    formHandler={setSearchEtcData}
                  />
                  <div className={styles.dateCon}>
                    <label>재고이동일</label>
                    <div>
                      <input
                        onChange={(e) =>
                          setSearchPeriod({
                            ...searchPeriod,
                            startDate: e.target.value,
                          })
                        }
                        type="date"
                        min="1900-01-01"
                        max="9999-12-31"
                      ></input>

                      <span>~</span>
                      <div>
                        <label> </label>
                        <input
                          onChange={(e) =>
                            setSearchPeriod({
                              ...searchPeriod,
                              endDate: e.target.value,
                            })
                          }
                          type="date"
                          min="1900-01-01"
                          max="9999-12-31"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn_save"
                    onClick={(e) => {
                      fetchData(1);
                      setCurrentPage(1);
                    }}
                  >
                    조회
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.tableCon}>
              <Table className={styles.tableHeader} headers={table_headers}>
                <ListTableData
                  selectRowHandler={setSelectedRow}
                  emitItem={setTableItems}
                  items={tableItems}
                />
              </Table>
            </div>
            {pageNumbers.length > 0 && (
              <div className={styles.pagination}>
                <ul className={styles.PBtnCon}>
                  <button className={styles.pbtn} onClick={prevGroup5}>
                    &lt;&lt;
                  </button>
                  <button className={styles.pbtn} onClick={prevGroup1}>
                    &lt;
                  </button>
                  <div className={styles.PBtnBox}>
                    {pageNumbers.map((page) => (
                      <li key={page}>
                        <button
                          className={` ${
                            page !== currentPage ? styles.pbtn : styles.active
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  </div>
                  <button className={styles.pbtn} onClick={nextGroup1}>
                    &gt;
                  </button>
                  <button className={styles.pbtn} onClick={nextGroup5}>
                    &gt;&gt;
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
