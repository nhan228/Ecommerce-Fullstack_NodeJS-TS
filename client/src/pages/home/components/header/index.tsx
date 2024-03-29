import React, { useState } from 'react'
import pictures from '@/pictures'
import { Store } from "@/store"
import { useSelector, useDispatch } from 'react-redux'
import MultiLanguage from './multiple_langue'
import { Dropdown } from 'react-bootstrap'
import { userAction } from '@slices/user.slice'
import { Modal } from 'antd'
import { logout } from '@services/firebase'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './header.scss'

export default function Header() {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const userStore = useSelector((store: Store) => store.userStore)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const productStore = useSelector((store: Store) => store.productStore)
  console.log('productStore', productStore);
  const categoryStore = useSelector((store: Store) => store.categoryStore)
  console.log('categoryStore', categoryStore);
  const brandStore = useSelector((store: Store) => store.brandStore)
  console.log('brandStore', brandStore);
  const receiptStore = useSelector((store: Store) => store.receiptStore)
  const navigate = useNavigate()

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  let icon = [
    {
      title: "Laptop",
      icon: "fa-solid fa-laptop"
    },
    {
      title: "PC",
      icon: "fa-solid fa-computer"
    },
    {
      title: "Điện thoại",
      icon: "fa-solid fa-mobile-screen"
    },
    {
      title: "Thiết bị âm thanh",
      icon: "fa-solid fa-volume-high"
    },
    {
      title: "Phụ kiện",
      icon: "fa-regular fa-keyboard"
    }

  ]
  return (
    <>
      <div className='sup_header'>
        <div className='sup_header_info'>
          <div className='info_container'>
            {
              [
                {
                  icon: "fa-solid fa-house",
                  text: "home",
                  link: ""
                },
                {
                  icon: "fa-solid fa-location-dot",
                  text: "location",
                  link: "location"
                },
                {
                  icon: "fa-solid fa-phone-volume",
                  text: "contact",
                  link: "contact"
                },
                {
                  icon: "fa-solid fa-headset",
                  text: "support",
                  link: "support"
                }
              ].map((item, index) => (
                <div key={index} onClick={() => navigate(`/${item.link}`)}>
                  <i className={item.icon}></i>
                  <span>{t(`topnav.${item.text}`)}</span>
                </div>
              ))
            }
          </div>
          <div className='multiple_language'>
            <i className="fa-solid fa-language">:</i>
            <MultiLanguage />
          </div>
        </div>
      </div>

      <header>
        <div className='header_content'>
          <div className='left'>
            <div className='logo_box'>
              <img src={pictures.logo} onClick={() => {
                window.location.href = "/";
              }} />
              <a><img src={pictures.text} width="401" height="97" alt="NHANTECH" onClick={() => {
                window.location.href = "/";
              }} /></a>
            </div>
            <nav>
              {
                categoryStore.data.map((item: any) => {
                  if (item.status) {
                    return (
                      <div style={{ zIndex: 100 }}
                        className={`item ${item.codeName && "sup"}`} key={Date.now() * Math.random()}>
                        <i style={{ color: '#82869e' }} className={icon.find(currentIcon => currentIcon.title == item.title) ? icon.find(currentIcon => currentIcon.title == item.title).icon : "game-controller-outline"}></i>
                        <div
                          style={{ zIndex: 9999 }}
                          onClick={() => {
                            navigate(`/category/${item.title}/all`)
                          }}>
                          <span style={{ color: '#82869e' }}>{item.title}</span>
                        </div>

                        {
                          brandStore.data && (
                            <div className='sup_menu'>
                              {
                                brandStore.data.map(supItem => {
                                  try {
                                    if (productStore.data.find(currentProduct => currentProduct.categoryId == item.id && currentProduct.brandId == supItem.id) && supItem.status) {
                                      return (
                                        <div onClick={() => {
                                          navigate(`/category/${item.title}/${supItem.title}`)
                                          console.log(supItem.title);
                                        }}
                                          key={Date.now() * Math.random()}
                                          className='sup_menu_item'>
                                          {supItem.title}
                                        </div>
                                      )
                                    }
                                  } catch (err) {
                                    console.log(err);
                                  }
                                }
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                })
              }
            </nav>
          </div>

          <div className='right'>
            <div className='search' onClick={handleSearchClick}>
              <input type="text" placeholder={t('navbar.search')} readOnly />
              <i className="item fa-solid fa-magnifying-glass" />
              {/* Modal */}
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                    <input type="text" placeholder="Search..." />
                  </div>
                </div>
              )}
            </div>

            <div className='cart_box' onClick={() => {
              navigate("/cart")
            }}>
              <i className="fa-solid fa-cart-shopping" style={{ color: '#82869E', fontSize: '22px' }}

              ></i>
              <span>
                {t("navbar.cartCount")}
                {
                  (() => {
                    const itemCount: number = receiptStore.cart?.detail?.reduce((total: number, cur: any) => total + cur.quantity, 0) || 0;
                    const productText: string = t("navbar.product").replace("*", itemCount > 1 ? "s" : "");
                    const result = <><strong> ({itemCount})</strong> {productText}</>;
                    return result;
                  })()
                }
              </span>
            </div>

            {
              userStore.data ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <div className='user_box'>
                      <img src={userStore.data.avatar} />
                      <span>
                        <strong>{t('navbar.hi')}:</strong>
                        <p>
                          {isNaN(Number(userStore.data.userName)) ? userStore.data.userName : userStore.data.email.split('@')[0]}!
                        </p>
                      </span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu >
                    <div onClick={() => {
                      window.location.href = "/admin"
                    }}>Admin</div>
                    <div>Profile</div>
                    <div onClick={() => {
                      window.location.href = "/receipts"
                    }}>Receipts</div>
                    <div onClick={() => {
                      Modal.confirm({
                        title: "Xác nhận",
                        content: "Bạn chắc chắn muốn đăng xuất!",
                        onOk: async () => {
                          await logout()
                          localStorage.removeItem("token")
                          dispatch(userAction.setData(null))
                        }
                      })
                    }}>Logout</div>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div onClick={() => {
                  window.location.href = '/authen';
                }} className='user_authentication'>
                  <i className="fa-regular fa-circle-user" />
                  <span>{t('navbar.login')} {t('navbar.signup')}</span>
                </div>
              )
            }
          </div>
        </div>
      </header>
    </>
  )
}
