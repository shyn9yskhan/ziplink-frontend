import React, { useState } from 'react';

const Settings = () => {
  const [socialNetworks, setSocialNetworks] = useState(true);
  const [publicLink, setPublicLink] = useState(true);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="setting">
        <span>Social Networks</span>
        <input type="checkbox" checked={socialNetworks} onChange={() => setSocialNetworks(!socialNetworks)} />
      </div>
      <div className="setting">
        <span>Public Link</span>
        <input type="checkbox" checked={publicLink} onChange={() => setPublicLink(!publicLink)} />
      </div>
    </div>
  );
};

export default Settings;