import React, { useState } from 'react';

import { TrademarkCircleOutlined, ChromeOutlined, BranchesOutlined, ApartmentOutlined } from '@ant-design/icons';

import { Select } from 'antd';
import './index.less';

const SelectOption = Select.Option;

interface LayoutSelectorState {
  type: string;
}
interface LayoutSelectorProps {
  dispatch?: (props: any) => any; // eslint-disable-line
}
const layouts = [
  {
    type: 'random',
    icon: <TrademarkCircleOutlined />,
    name: '随机布局',
    options: {},
  },
  {
    type: 'concentric',
    name: '同心圆布局',
    icon: <ChromeOutlined />,
    options: {},
  },
  {
    type: 'force',
    name: '力导布局',
    icon: <BranchesOutlined />,
    options: {},
  },
  {
    type: 'tree',
    name: '层次布局',
    icon: <ApartmentOutlined />,
    disabled: true,
    options: {},
  },
];
const LayoutSelector: React.FC<LayoutSelectorProps> = (props) => {
  const { dispatch } = props;

  const [state, setState] = useState<LayoutSelectorState>({
    type: 'concentric',
  });
  const { type = 'concentric' } = state;

  const handleChange = (value: string) => {
    setState({
      ...state,
      type: value,
    });
    const layout = layouts.find((item) => {
      return item.type === value;
    }) || { type: 'concentric', options: {} };

    dispatch({
      type: 'graph/changeLayout',
      payload: {
        name: layout.type,
        options: layout.options,
      },
    });
  };
  return (
    <div className="layout-selector">
      <Select style={{ width: '120px' }} value={type} onChange={handleChange}>
        {layouts.map((item) => {
          const { type: layoutType, name, icon, disabled } = item;
          return (
            <SelectOption key={layoutType} value={layoutType} disabled={disabled}>
              {icon} &nbsp;{name}
            </SelectOption>
          );
        })}
      </Select>
    </div>
  );
};

export default LayoutSelector;
