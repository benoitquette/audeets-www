import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import ButtonList from './ButtonsList';

describe('App component', () => {
  beforeEach(() => {
    cleanup();
  });
  it('should render a list with 1 button', async () => {
    // ARRANGE
    const strategies = [{ name: '11111', icon: '11111', url: `/1111` }];
    render(<ButtonList returnUrl="url" strategies={strategies} />);

    // ACT
    await screen.findByRole('link');

    // ASSERT
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
  it('should render a list with 2 buttons', async () => {
    // ARRANGE
    const strategies = [
      { name: '11111', icon: '11111', url: `/1111` },
      { name: '11111', icon: '11111', url: `/1111` }
    ];
    render(<ButtonList returnUrl="url" strategies={strategies} />);

    // ACT
    await screen.findAllByRole('link');

    // ASSERT
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
  it('should render a list of buttons', async () => {
    // ARRANGE
    const strategies = [
      { name: 'Google', icon: 'Google', url: `/api/auth/google` },
      { name: 'GitLab', icon: 'GitLab', url: `/api/auth/gitlab` },
      { name: 'GitHub', icon: 'GitHub', url: `/api/auth/github` }
    ];
    const result = render(<ButtonList returnUrl="url" strategies={strategies} />);

    // ACT
    await screen.findAllByRole('link');

    // ASSERT
    expect(result).toMatchInlineSnapshot(`
      {
        "asFragment": [Function],
        "baseElement": <body>
          <div>
            <div
              class="MuiStack-root css-3frvaj-MuiStack-root"
            >
              <a
                class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
                href="/api/auth/google?returnTo=url"
                tabindex="0"
              >
                <span
                  class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
                >
                  <img
                    alt="Google"
                    src="Google"
                  />
                </span>
                Google
                <span
                  class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                />
              </a>
              <a
                class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
                href="/api/auth/gitlab?returnTo=url"
                tabindex="0"
              >
                <span
                  class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
                >
                  <img
                    alt="GitLab"
                    src="GitLab"
                  />
                </span>
                GitLab
                <span
                  class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                />
              </a>
              <a
                class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
                href="/api/auth/github?returnTo=url"
                tabindex="0"
              >
                <span
                  class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
                >
                  <img
                    alt="GitHub"
                    src="GitHub"
                  />
                </span>
                GitHub
                <span
                  class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                />
              </a>
            </div>
          </div>
        </body>,
        "container": <div>
          <div
            class="MuiStack-root css-3frvaj-MuiStack-root"
          >
            <a
              class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
              href="/api/auth/google?returnTo=url"
              tabindex="0"
            >
              <span
                class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
              >
                <img
                  alt="Google"
                  src="Google"
                />
              </span>
              Google
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </a>
            <a
              class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
              href="/api/auth/gitlab?returnTo=url"
              tabindex="0"
            >
              <span
                class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
              >
                <img
                  alt="GitLab"
                  src="GitLab"
                />
              </span>
              GitLab
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </a>
            <a
              class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-fullWidth css-jc1r49-MuiButtonBase-root-MuiButton-root"
              href="/api/auth/github?returnTo=url"
              tabindex="0"
            >
              <span
                class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
              >
                <img
                  alt="GitHub"
                  src="GitHub"
                />
              </span>
              GitHub
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </a>
          </div>
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
