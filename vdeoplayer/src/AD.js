import React, { useState } from 'react';

const AD = () => {
  const [showAd, setShowAd] = useState(false);

  return (
    <div style={{ display: showAd ? 'block' : 'none' }}>
      <h1>This is an ad</h1>
      <button onClick={() => setShowAd(false)}>Close</button>
    </div>
  );
};

export default AD;