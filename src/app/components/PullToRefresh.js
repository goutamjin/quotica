
import React from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

const PullToRefreshCom = ({ children, tiggerRef }) => {

    const handleRefresh = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            tiggerRef((prevKey) => prevKey + 1);  // Update refreshKey to trigger re-render
          }, 1000);
        });
      };
      
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {children}
    </PullToRefresh>
  );
};

export default PullToRefreshCom;
