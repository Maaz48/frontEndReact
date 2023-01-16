import React from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = ({ Component }) => {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!localStorage.getItem("isLogin")) {
            navigate("/createAccount")
        }
    }, [])

    return (
        <Component />
    )
}

export default PrivateRoutes