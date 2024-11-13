import React, { useState } from 'react';

const Links = () => {
  const [links, setLinks] = useState(["Link 1", "Link 2", "Link 3"]);

  return (
    <div className="links-page">
      <h2>Links</h2>
      <button className="add-link-button">+ Add Link</button>
      {links.map((link, index) => (
        <div key={index} className="link-item">
          <input type="text" defaultValue="Text" />
          <input type="text" defaultValue="link" />
          <button className="delete-button">×</button>
        </div>
      ))}
    </div>
  );
};

export default Links;
