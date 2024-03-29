import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import { Store } from '@/store'
import Container from './components/Container'

import './admin.scss'

export default function Admin() {
    const [menuState, setMenuState] = useState(false);
    const userStore = useSelector((store: Store) => store.userStore)
    const acceptRole = ["admin", "master"]
    
    useEffect(() => {
        if (!userStore.data) {
            alert("Permission Denine")
            window.location.href = "/"
            return
        }

        if (!acceptRole.find(item => item == userStore.data.role)) {
            alert("Permission Denine")
            window.location.href = "/"
            return
        }
    }, [userStore.data])
    return (
        <>
            {
                acceptRole.find(item => item == userStore.data.role) && (
                    <div style={{ color: 'black' }} className='admin_page'>
                        <Navbar menuState={menuState} setMenuState={setMenuState} userStore={userStore} />
                        <Container menuState={menuState} userStore={userStore} />
                    </div>
                )
            }
        </>
    )
}
