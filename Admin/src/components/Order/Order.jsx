import React from 'react'
import '../UserManager/UserManager.css'
const Order = () => {
  return (
    <div className="content-user">
        <div className="table-content">
          <div className="wrapper-title">
            <span className="sperator"></span>
            <span className="title-page">Lịch Sử Mua Hàng</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>ID Người Dùng</th>
                <th>Email</th>
                <th>Gói Cước</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {/* {historyOrders.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.idUser}</td>
                    <td>{item.email}</td>
                    <td>{item.nameMovie}</td>
                    <td>{item.seats.length}</td>
                    <td>{Number(item.price).toLocaleString("de-DE")}VND</td>
                    <td>
                      <AiFillDelete
                        onClick={() => handleDelete(item.id)}
                        className="btn-delete"
                      />
                      {showConfirmModal && (
                        <ModelComfirmDelete
                          onConfirm={handleConfirm}
                          onCancel={handleCancel}
                        />
                      )}
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Order