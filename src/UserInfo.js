

import React from 'react';

const UserInfo = ({ userInfo }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Informações do Usuário</h2>
      <p style={{ fontWeight: 'bold' }}>Nome: {userInfo.name}</p>
      <p style={{ fontWeight: 'bold' }}>Email: {userInfo.email}</p>
    </div>
  );
};

export default UserInfo;
