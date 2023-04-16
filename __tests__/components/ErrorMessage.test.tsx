// tests the ErrorMessage component
import React from 'react';
import renderer from 'react-test-renderer';

import ErrorMessage from '../../src/components/ErrorMessage';

describe('ErrorMessage component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ErrorMessage message="An error occurred" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
