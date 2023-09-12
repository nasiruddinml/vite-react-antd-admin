import { memo } from 'react';
import { Card, Col, Row } from 'antd';
import PieChart from './components/PieCharts/PieCharts';

const Home = memo(() => {
  // const thme = theme.useToken();

  return (
    <div className="">
      <Row gutter={[12, 12]}>
        <Col lg={18} sm={24} xs={24}>
          <Card size="small" title="Region">
            <PieChart />
          </Card>
        </Col>
        <Col lg={6} sm={24} xs={24}>
          <Card size="small" title="Area">
            <PieChart />
          </Card>
        </Col>
        <Col lg={18} sm={24} xs={24}>
          <Card size="small" title="Territory">
            <PieChart />
          </Card>
        </Col>
        <Col lg={6} sm={24} xs={24}>
          <Card size="small" title="词云">
            <PieChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Home;
