// tests the InformationDisplay component
import React from 'react';
import renderer from 'react-test-renderer';
import InformationDisplay from '../../src/components/InfomationDisplay';

describe('InformationDisplay component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InformationDisplay label="Name" value="Ronnie" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
