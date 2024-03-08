import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import PropTypes from 'prop-types';
import styles from './BorderedSection.module.scss';

function BorderedSection({ icon, title, children }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.headerBorderBefore}></div>
        {(icon || title) && (
          <div className={styles.headerTitle}>
            {icon && <SvgIcon component={icon} />}
            {title && <span className={styles.headerTitle}>{title}</span>}
          </div>
        )}
        <div className={styles.headerBorderAfter}></div>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
}

BorderedSection.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any.isRequired
};

export default BorderedSection;
