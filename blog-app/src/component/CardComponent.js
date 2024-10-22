import React from 'react';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const App = ({ title, description, imageUrl = "" }) => (
  <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
    <Card style={{ width: 300 }}>
      <div className="p-4">
        {imageUrl && (
          <img
            alt="example"
            src={imageUrl}
            className="w-full h-40 object-cover rounded-lg"
          />
        )}
      </div>

      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title={title}
        description={description}
      />
    </Card>
  </div>
);

export default App;
