import { useState, useEffect } from 'react';
import { getFarcasterUser } from '@farcaster/miniapp-sdk';

function App() {


  return (
    <div>
      <h1>Welcome to FarQuiz!</h1>
      {user && <p>Hello, {user.displayName}! (fid: {user.fid})</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
