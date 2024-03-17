import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Button from './ButtonsListItem';

describe('App component', () => {
  beforeEach(() => {
    cleanup();
  });
  it('should render a button with the name', async () => {
    // ARRANGE
    const name = 'testname';
    render(<Button name={name} fullWidth />);

    //ACT
    await screen.findByRole('button');

    // ASSERT
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByRole('button')).toHaveTextContent(name);
  });
  it('should render a button with no name', async () => {
    // ARRANGE
    const name = 'testname';
    render(<Button name={name} />);

    //ACT
    await screen.findByRole('button');

    // ASSERT
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByRole('button')).not.toHaveTextContent(name);
  });
  it('should render an icon with a alt name', async () => {
    // ARRANGE
    const icon = 'testicon';
    const name = 'testname';
    render(<Button name={name} icon={icon} />);

    //ACT
    await screen.findByRole('img');

    // ASSERT
    expect(screen.getByRole('img')).toBeDefined();
    expect(screen.getByRole('img')).toHaveAttribute('src', icon);
    expect(screen.getByRole('img')).toHaveAttribute('alt', name);
  });
  it('should render a button with a link', async () => {
    // ARRANGE
    const url = 'myurl';
    render(<Button url={url} />);

    //ACT
    await screen.findByRole('link');

    // ASSERT
    expect(screen.getByRole('link')).toBeDefined();
    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });
  it('should render a button', async () => {
    // ARRANGE
    const result = render(<Button name="name" url="url" fullWidth icon="icon" />);

    //ACT

    // ASSERT
    expect(result).toMatchInlineSnapshot(`
      {
        "asFragment": [Function],
        "baseElement": <body>
          <div>
            <a
              class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
              href="url"
              tabindex="0"
            >
              <span
                class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
              >
                <img
                  alt="name"
                  src="icon"
                />
              </span>
              name
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </a>
          </div>
        </body>,
        "container": <div>
          <a
            class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
            href="url"
            tabindex="0"
          >
            <span
              class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
            >
              <img
                alt="name"
                src="icon"
              />
            </span>
            name
            <span
              class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
            />
          </a>
        </div>,
        "debug": [Function],
        "findAllByAltText": [Function],
        "findAllByDisplayValue": [Function],
        "findAllByLabelText": [Function],
        "findAllByPlaceholderText": [Function],
        "findAllByRole": [Function],
        "findAllByTestId": [Function],
        "findAllByText": [Function],
        "findAllByTitle": [Function],
        "findByAltText": [Function],
        "findByDisplayValue": [Function],
        "findByLabelText": [Function],
        "findByPlaceholderText": [Function],
        "findByRole": [Function],
        "findByTestId": [Function],
        "findByText": [Function],
        "findByTitle": [Function],
        "getAllByAltText": [Function],
        "getAllByDisplayValue": [Function],
        "getAllByLabelText": [Function],
        "getAllByPlaceholderText": [Function],
        "getAllByRole": [Function],
        "getAllByTestId": [Function],
        "getAllByText": [Function],
        "getAllByTitle": [Function],
        "getByAltText": [Function],
        "getByDisplayValue": [Function],
        "getByLabelText": [Function],
        "getByPlaceholderText": [Function],
        "getByRole": [Function],
        "getByTestId": [Function],
        "getByText": [Function],
        "getByTitle": [Function],
        "queryAllByAltText": [Function],
        "queryAllByDisplayValue": [Function],
        "queryAllByLabelText": [Function],
        "queryAllByPlaceholderText": [Function],
        "queryAllByRole": [Function],
        "queryAllByTestId": [Function],
        "queryAllByText": [Function],
        "queryAllByTitle": [Function],
        "queryByAltText": [Function],
        "queryByDisplayValue": [Function],
        "queryByLabelText": [Function],
        "queryByPlaceholderText": [Function],
        "queryByRole": [Function],
        "queryByTestId": [Function],
        "queryByText": [Function],
        "queryByTitle": [Function],
        "rerender": [Function],
        "unmount": [Function],
      }
    `);
  });
});
