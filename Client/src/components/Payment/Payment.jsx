import React from 'react';
import './Payment.css';

function Payment() {
  return (
    <div className="payment-form">
      <h2>Thanh toán gói xem phim VIP</h2>
      <form>
        <label htmlFor="cardNumber">Số thẻ</label>
        <input type="text" id="cardNumber" />

        <label htmlFor="expiryDate">Ngày hết hạn</label>
        <input type="text" id="expiryDate" />

        <label htmlFor="cvv">CVV</label>
        <input type="text" id="cvv" />

        <button type="submit">Thanh toán</button>
      </form>
    </div>
  );
}

export default Payment;
