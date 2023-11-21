import { StoryObj } from '@storybook/react';

import { useCurrencyFormatter } from '../use-currency-formatter';

const Render = () => {
  const format = useCurrencyFormatter();

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <h1>Digits</h1>
        <span>
          <strong>1 digit:</strong> {format(1.6801231)}
        </span>
        <br />
        <span>
          <strong>2 digit:</strong> {format(10.0001231)}
        </span>
        <br />
        <span>
          <strong>3 digit:</strong> {format(100.0001231)}
        </span>
        <br />
        <span>
          <strong>4 digit:</strong> {format(1000.0001231)}
        </span>
        <br />
        <span>
          <strong>5 digit:</strong> {format(10000.0001231)}
        </span>
        <br />
        <span>
          <strong>6 digit:</strong> {format(100000.0001231)}
        </span>
        <br />
        <span>
          <strong>7 digit:</strong> {format(1000000.0001231)}
        </span>
        <br />
        <span>
          <strong>8 digit:</strong> {format(10000000.0001231)}
        </span>
        <br />
        <span>
          <strong>9 digit:</strong> {format(100000000.0001231)}
        </span>
        <br />
        <span>
          <strong>10 digit:</strong> {format(1000000000.0001231)}
        </span>
        <br />
        <span>
          <strong>11 digit:</strong> {format(10000000000.0001231)}
        </span>
        <br />
        <span>
          <strong>12 digit:</strong> {format(100000000000.0001231)}
        </span>
        <br />
        <span>
          <strong>13 digit:</strong> {format(1000000000000.0001231)}
        </span>
      </div>
      <div>
        <h1>Decimals</h1>
        <span>
          <strong>1 decimal:</strong> {format(0.1)}
        </span>
        <br />
        <span>
          <strong>2 decimal:</strong> {format(0.01)}
        </span>
        <br />
        <span>
          <strong>3 decimal:</strong> {format(0.001)}
        </span>
        <br />
        <span>
          <strong>4 decimal:</strong> {format(0.0001)}
        </span>
        <br />
        <span>
          <strong>5 decimal:</strong> {format(0.00001)}
        </span>
        <br />
        <span>
          <strong>6 decimal:</strong> {format(0.000001)}
        </span>
        <br />
        <span>
          <strong>7 decimal:</strong> {format(0.0000001)}
        </span>
        <br />
        <span>
          <strong>8 decimal:</strong> {format(0.00000001)}
        </span>
        <br />
        <span>
          <strong>9 decimal:</strong> {format(0.000000001)}
        </span>
        <br />
        <span>
          <strong>10 decimal:</strong> {format(0.0000000001)}
        </span>
        <br />
        <span>
          <strong>11 decimal:</strong> {format(0.00000000001)}
        </span>
        <br />
        <span>
          <strong>12 decimal:</strong> {format(0.000000000001)}
        </span>
        <br />
        <span>
          <strong>13 decimal:</strong> {format(0.0000000000001)}
        </span>
      </div>
    </div>
  );
};

export default {
  title: 'Hooks',
  parameters: {
    layout: 'centered'
  },
  args: {
    style: { minWidth: 300 }
  },
  render: Render
};

export const UseCurrencyFormatter: StoryObj = {};
