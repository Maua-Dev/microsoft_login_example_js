import axios from 'axios';
import React, { useState } from 'react';
import UserInfo from './UserInfo';
import AuthButtons from './AuthButtons.js';
import { useMsal } from '@azure/msal-react';

const Login = () => {
    const { instance } = useMsal();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: ''
    });
    const [popupData, setPopupData] = useState({});
    const [showResponse, setShowResponse] = useState(false);

    const handleLogin = () => {
        instance.loginPopup({
            scopes: ['user.read']
        }).then(async response => {
            setPopupData(response.account);
            await axios.get(process.env.REACT_APP_API, {
                headers: {
                    "authorizationToken": `Bearer ${response.accessToken}`
                },
            }).then(response => {
                console.log(response.data);
                setUserInfo(response.data);
            }).catch(error => {
                let status_code = error.response.status;
                let message = error.response.data.message;
                console.log(status_code);
                console.log(message);
            });
        }).catch(error => {
            console.error(error);
        });
    };

    const handleLogout = () => {
        instance.logout({
            onRedirectNavigate: () => {
                return false;
            }
        }).then(response => {
            setUserInfo({ name: '', email: '' });
            setPopupData({});
        }).catch(error => {
            console.error(error);
        });
    };

    const toggleResponse = () => {
        setShowResponse(!showResponse); // Alternar visibilidade do JSON da resposta
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Microsoft Login</h2>
                <AuthButtons handleLogin={handleLogin} handleLogout={handleLogout} />
                <UserInfo userInfo={userInfo} />
                <button onClick={toggleResponse}>
                    {showResponse ? 'Ocultar JSON da Resposta' : 'Ver JSON da Resposta'}
                </button>
                {showResponse && (
                    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(popupData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
