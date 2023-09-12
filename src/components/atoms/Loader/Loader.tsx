import { Spin } from 'antd';
import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div className="suspense-loading">
      <Spin size="large" />
    </div>
  );
});

export default Loader;
