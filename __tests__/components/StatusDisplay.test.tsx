// tests the StatusDisplay component
import React from 'react';
import renderer from 'react-test-renderer';
import StatusDisplay from '../../src/components/StatusDisplay';

describe('StatusDisplay component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StatusDisplay label="Recovered" status={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
