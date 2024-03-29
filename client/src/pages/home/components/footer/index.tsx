import React from 'react'
import './footer.scss'
export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className='footer_content'>
          <div>
            <p>Hỗ trợ Khách hàng</p>
            <ul>
              {["Thẻ ưu đãi", "Hướng dẫn mua online", "Ưu đãi dành cho Doanh nghiệp", "Chính sách trả góp", "Dịch vụ sửa chữa"].map(item => (
                <li key={Date.now() * Math.random()}>
                  <h3>{item}</h3>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p>Chính sách mua hàng</p>
            <ul>
              {["Điều kiện giao dịch chung", "Chính sách bảo hành", "Chính sách đổi trả", "Chính sách thanh toán", "Giao hàng và Lắp đặt tại nhà"].map(item => (
                <li key={Date.now() * Math.random()}>
                  <h3>{item}</h3>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p>Cộng đồng</p>
            <ul>
              <li>Liên lạc mua hàng (miễn phí):<a href="tel:18006867"> 0961992801</a></li>
              <li>Liên lạc hỗ trợ:  <a href="tel:18006867"> 0961992801</a></li>
              <li>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' />
                <span>Facebook</span>
              </li>

              <li>
                <img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052' /> <span>Youtube</span>
              </li>

              <li>
                <img src='https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png' />
                <span>Zalo</span>
              </li>
            </ul>
          </div>

          <div>
            <p>Email</p>
            <ul>
              {["Hỗ trợ Khách hàng:", "Liên hệ báo giá:", "Hợp tác phát triển:"].map(item => (
                <li key={Date.now() * Math.random()}>
                  <h6>{item}</h6>
                  <a href='fabook.com'>lthanhnhan941@gmail.com</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='footer_info'>
          <div className='left'>
            <p>Phương thức thanh toán</p>
            <div className='box'>
              <div className='tranfer'>
                <i className="fa-solid fa-qrcode"></i>
                <p>Qr Code</p>
              </div>

              <div className='tranfer'>
                <i className="fa-regular fa-money-bill-1"></i>
                <p>Tiền mặt</p>
              </div>

              <div className='tranfer'>
                <i className="fa-regular fa-clock"></i>
                <p>Trả góp</p>
              </div>

              <div className='tranfer'>
                <i className="fa-regular fa-credit-card"></i>
                <p>Internet <br/> Banking</p>
              </div>
            </div>
          </div>
          <div className='right'>
            <p>Danh sách các ngân hàng thanh toán online</p>
            <img src='https://shopfront-cdn.tekoapis.com/static/vnpay_banks.png' height={45} width={620}/>
          </div>
        </div>
      </div>
    </footer>
  )
}
