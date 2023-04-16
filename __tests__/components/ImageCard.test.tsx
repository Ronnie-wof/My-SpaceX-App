// tests the ImageCard component
import React from 'react';
import renderer from 'react-test-renderer';
import ImageCard from '../../src/components/ImageCard';

describe('ImageCard component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ImageCard uri="https://images2.imgbox.com/48/a8/LTqq8OrE_o.png" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
