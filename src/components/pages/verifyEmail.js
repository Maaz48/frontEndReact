import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const params = useParams()
    const navigate = useNavigate()
    React.useEffect(() => {
        fetch("http://localhost:5000/verifyEmail", {
            method: "POST",
            headers: { 'accept': "application/json", 'content-type': "application/json" },
            body: JSON.stringify({ id: params.id })
        })
            .then((data) => {
                return data.json()
            }).then((res) => {
                if (res.isFullfill) {
                    localStorage.setItem("user", JSON.stringify(res.items))
                    localStorage.setItem("isLogin", true)
                    navigate("/")
                } else {
                    console.log("email verification failed")
                    navigate("/")
                }
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>VerifyEmail</div>
    )
}

export default VerifyEmail