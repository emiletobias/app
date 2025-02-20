import { Outlet } from 'umi';
import styles from './index.less';
import './reset.less';

export default function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.company}>Broccoli & Co.</div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>Made with love in Melbourne.</div>
        <div className={styles.footerText}>
          © 2016 Broccoli & Co. All rights reserved.
        </div>
      </div>
    </div>
  );
}
