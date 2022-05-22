import React from "react";
import { Tabs } from "antd";

import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";

const { TabPane } = Tabs;

const Analytics = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Категории" key="1">
                    <DoughnutChart />
                </TabPane>
                <TabPane tab="Динамика" key="2">
                    <LineChart />
                </TabPane>
                <TabPane tab="Статистика" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Analytics;
