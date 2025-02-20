import InviteModal from '@/components/inviteModal';
import { Button } from 'antd';
import { useState } from 'react';
import styles from './index.less';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inviteContainer}>
        <div className={styles.title}>A better way to enjoy everyday.</div>
        <div className={styles.subTitle}>
          Be the first to know when we launch.
        </div>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: '20px' }}
          onClick={showModal}
        >
          Request an invite
        </Button>
      </div>
      <InviteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
