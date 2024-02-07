import { urlApiUsers } from '~/config';

// assets
import Google from '~/assets/images/icons/google.svg';
import GitLab from '~/assets/images/icons/gitlab.svg';
import GitHub from '~/assets/images/icons/github.svg';

const strategies = [
  { name: 'Google', icon: Google, url: `${urlApiUsers}/api/auth/google` }
  // { name: 'GitLab', icon: GitLab, url: `${urlApiUsers}/api/auth/gitlab` },
  // { name: 'GitHub', icon: GitHub, url: `${urlApiUsers}/api/auth/github` }
];

export default strategies;
