import React from "react";
import { List, Typography } from "antd";
const { Title } = Typography;

const ResultList = ({ results }) => {
  return results.length > 0 ? (
    <div className="list">
      <List
        itemLayout="horizontal"
        dataSource={results}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={
                <div dangerouslySetInnerHTML={{ __html: item.snippet }} />
              }
            />
          </List.Item>
        )}
      />
    </div>
  ) : (
    <Title className="error" level={5}>
      Brak wyników
    </Title>
  );
};

export default ResultList;
