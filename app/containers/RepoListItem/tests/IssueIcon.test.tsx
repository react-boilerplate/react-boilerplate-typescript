import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import IssueIcon from '../IssueIcon';

describe('<IssueIcon />', () => {
  it('should match the snapshot', () => {
    const { container } = render(<IssueIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const { container } = render(<IssueIcon />);
    expect(container.firstChild).toHaveAttribute('class');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const Icon = IssueIcon as any;
    const { container } = render(<Icon id={id} />);
    expect(container.firstChild).toHaveAttribute('id', id);
  });

  it('should adopt any attribute', () => {
    const Icon = IssueIcon as any;
    const { container } = render(<Icon attribute="test" />);
    expect(container.firstChild).toHaveAttribute('attribute');
  });
});
