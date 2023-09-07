import React from "react";
import Modal from "./Modal";

const InputTable = ({ menulist }) => {
  return (
    <div style={{ position: "relative", top: "20px" }}>
      <table>
        <thead>
          <tr>
            {menulist.map((menu) =>
              menu.guide ? <th>{menu.name}(F2)</th> : <th>{menu.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr>
              {menulist.map((menu) =>
                menu.guide ? (
                  <td>
                    <Modal menu={menu} />
                  </td>
                ) : (
                  <td>
                    <input onFocus={(e) => console.log(e)}></input>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InputTable;
