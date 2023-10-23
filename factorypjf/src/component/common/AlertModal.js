import ListTd from "component/layout/Table/ListTableData";
import { putAxios } from "function/axiosFuction";
import { useEffect } from "react";

import helperStyle from "style/common/helperModal.module.css";
import alertStyle from "style/common/alertStyle.module.css";

//======================모달 back =========================
function HelperBackdrop({ offModal }) {
  const clickHandler = (e) => {
    e.preventDefault();
    offModal();
  };
  return (
    <div onClick={clickHandler} className={helperStyle["back-drop"]}></div>
  );
}

function HelperOverlay({ modalState, onSubmit }) {
  useEffect(() => {
    console.log(modalState);
  });

  const submitHandler = (type) => {
    onSubmit(type);
  };

  return (
    <div className={alertStyle["alert_modal_overlay"]}>
      <h4 className={alertStyle["modal_title"]}>{modalState.headLine}</h4>
      <div className={alertStyle["modal_notice"]}>{modalState.title}</div>
      <div>
        {modalState.table.map((table, idx) => (
          <div>
            <div className={alertStyle['table_title']}>{table.name}</div>
            <div
              className={alertStyle["wrap-alert_table"]}
              key={idx}
              items={table.tableItem}
            >
              <table className={alertStyle["alert_table_head"]}>
                <thead>
                  <tr>
                    {table.header.map((el, headerCol) => (
                      <td key={headerCol}>{el.text}</td>
                    ))}
                  </tr>
                </thead>
              </table>
              <div className={alertStyle['wrap-alert_table_body']}>

              <table className={alertStyle["alert_table_body"]}>
                <tbody>
                  {table.tableItem.map((item, itemCol) => {
                    return (
                      <tr>
                        {table.header.map((el) => {
                          return <td>{item[el.value]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                  </div>
            </div>
          </div>
        ))}
      </div>
      <div className="wrap-btn">
        <button
          onClick={() => {
            submitHandler("cancel");
          }}
          className="btn_delete"
        >
          취소
        </button>
        <button
          onClick={() => {
            submitHandler("save");
          }}
          className="btn_save"
        >
          확인
        </button>
      </div>
    </div>
  );
}

//======================모달 root=========================
export default function HelperModal({
  offModal,
  modalState,
  onSelectCode,
  onSubmit,
}) {
  return (
    <>
      <div className={helperStyle["helper-modal"]}>
        <HelperBackdrop offModal={offModal} />
        <HelperOverlay
          offModal={offModal}
          modalState={modalState}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}
