import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal, Button } from 'react-bootstrap';
import { randomId } from '@mieuteacher/meomeojs';
import { convertToVND, createBuyAnimation } from '@mieuteacher/meomeojs';
import { Store } from "@/store";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import './receipt.scss';

export default function Receipt() {
  const [display, setDisplay] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const receiptStore = useSelector((store: Store) => store.receiptStore);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh'
  }

  useEffect(() => {
    console.log('receiptStore.receipts', receiptStore.receipts);
  }, [receiptStore.receipts]);

  return (
    <div className='receipt_page'>
      <div className='title'>
        <h1>ĐƠN HÀNG</h1>
      </div>
      <MDBTable striped bordered hover align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Số thứ tự</th>
            <th scope='col'>Mã đơn hàng</th>
            <th scope='col'>Tổng đơn hàng</th>
            <th scope='col'>Phương thức thanh toán</th>
            <th scope='col'>Tình trạng</th>
            <th scope='col'>Trạng thái đơn hàng</th>
            <th scope='col'>Thời gian</th>
            <th scope='col'>Chi tiết đơn hàng</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {receiptStore.receipts?.map((receipt, index) => {
            if (receipt.status != "delete") {
              return (
                <tr key={randomId()}>
                  <td>{index + 1}</td>
                  <td>#NHANTECH-PAY{receipt.id}</td>
                  <td>{convertToVND(receipt.total)}</td>
                  <td>{receipt.payMode == 'cash' ? 'Thanh toán khi nhận hàng' : 'Zalo Pay'}</td>
                  <td>
                    <MDBBadge color={receipt.paid ? 'success' : 'danger'} pill>
                      {receipt.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </MDBBadge>
                  </td>

                  <td>
                    {
                    receipt.status != 'shopping' && (
                      <>
                        {receipt.status == 'pending' && (
                          <MDBBadge color='secondary' pill>
                            Đơn hàng đang chờ duyệt ...
                          </MDBBadge>
                        )}
                           {receipt.status == 'accepted' && (
                          <MDBBadge color='secondary' pill>
                            Đơn hàng đã được duyệt <i className="fa-regular fa-circle-check"></i>
                          </MDBBadge>
                        )}
                        {receipt.status == 'shipping' && (
                          <MDBBadge color='secondary' pill>
                            Đơn hàng của bạn đang được vận chuyển ...
                          </MDBBadge>
                        )}
                        {receipt.status == 'done' && (
                          <MDBBadge color='success' pill>
                            Đơn hàng đã được giao 
                          </MDBBadge>
                        )}
                      </>
                    )
                  }
                  </td>

                  <td>
                    {receipt.paidAt ? new Date(Number(receipt.paidAt)).toLocaleString('en-GB', options) : new Date(Number(receipt.pending)).toLocaleString('en-GB', options)}
                  </td>
                  <td>
                    <button className='btn btn-primary' onClick={() => {
                      setDisplay(true);
                      setCurrentReceipt(receipt.detail);
                    }}>Chi tiết</button>
                  </td>
                </tr>
              );
            }
          })}
        </MDBTableBody>
      </MDBTable>

      {receiptStore.receipts.some(item => item.status == "delete") && (
        <>
          <div className='title'><h1>CÁC ĐƠN HÀNG ĐÃ BỊ HỦY</h1></div>
          <MDBTable striped bordered hover align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>Số thứ tự</th>
                <th scope='col'>Mã số hóa đơn</th>
                <th scope='col'>Tổng đơn hàng</th>
                <th scope='col'>Phương thức thanh toán</th>
                <th scope='col'>Tình trạng</th>
                <th scope='col'>Thời gian hủy đơn</th>
                <th scope='col'>Chi tiết đơn hàng</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {receiptStore.receipts?.map((receipt, index) => {
                if (receipt.status == "delete") {
                  return (
                    <tr key={randomId()}>
                      <td>{index + 1}</td>
                      <td>#NHANTECH-{receipt.id}</td>
                      <td>{convertToVND(receipt.total)}</td>
                      <td>{receipt.payMode == 'cash' ? 'Thanh toán khi nhận hàng' : 'Zalo Pay'}</td>
                      <td>
                        <MDBBadge color={receipt.paid ? 'success' : 'danger'} pill>
                          Đã hủy đơn
                        </MDBBadge>
                      </td>
                      <td>
                        {new Date(Number(receipt.updateAt)).toLocaleString('en-GB', options)}
                      </td>
                      <td>
                        <button className='btn btn-primary' onClick={() => {
                          setDisplay(true);
                          setCurrentReceipt(receipt.detail);
                        }}>Chi tiết</button>
                      </td>
                    </tr>
                  );
                }
              })}
            </MDBTableBody>
          </MDBTable>
        </>
      )}

      <Modal
        show={display}
        onHide={() => setDisplay(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin về đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='item_container_title'>
            <p>Hình ảnh</p>
            <p>Tên sản phẩm</p>
            <p>Giá tiền</p>
            <p>Số lượng</p>
          </div>
          {currentReceipt?.map(item => (
            <div className='item_container' key={randomId()}>
              <img src={item?.product.avatar} alt={item?.product.name} />
              <p>{item.product.name}</p>
              <p>{convertToVND(item.product.price)}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setDisplay(false)}>OK</Button>
        </Modal.Footer>
      </Modal>

      <div className="advertising">
        <div className="advertising_content">
          <div className="left">
            <img src="https://lh3.googleusercontent.com/p6yyd_uVRxEXYOVj1J8roBPV3Cso9BUXYP1gZDJ1nXyg2HJK3iNxV_Bmo4-ZLbUsney2CtCvUt-9WhTo5M58nuaAoX2wtfzW=w616-rw" alt="" />
          </div>
        </div>
      </div>

      <div className="advertising">
        <div className="advertising_content">
          <div className="left">
            <img src="https://lh3.googleusercontent.com/NPKiOOhPD1gK1EMeggU-fv7qJzEjb6eCwBXA7gur-4AxKAb7TDPcJ95aKKow1Jcs5wp6hUIiSXTPArfPOd79lZE19fBVvow=w616-rw" alt="" />
          </div>
          <div className="right">
            <img src="https://lh3.googleusercontent.com/0XMyTTi61mF36Dui7tOqZtKJzrjXpn5eco8OwVpijFExkTEJKyRpYmP9H3fbEDhi3sOZ5YA6BecKgWbTRTkbG8dPD88u5SMVeQ=w616-rw" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
