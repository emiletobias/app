import { Button, Form, Input, message, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { request } from 'umi';
import styles from './inviteModal.less';

const API =
  'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

export default function InviteModal(props) {
  const { isModalOpen, setIsModalOpen } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSuccessModalClose = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);

  const SubmitButton = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    const sendInvite = useCallback(async () => {
      const { fullName: name, email } = values;
      setConfirmLoading(true);
      try {
        const res = await request(API, {
          method: 'POST',
          data: {
            name,
            email,
          },
        });

        setConfirmLoading(false);
        setIsModalOpen(false);
        form.resetFields();
        setSuccessModalOpen(true);
      } catch (e) {
        if (e.response.status === 400) {
          messageApi.open({
            type: 'error',
            content: e.response.data.errorMessage,
          });
          setConfirmLoading(false);
        }
      }
    }, [values]);

    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        onClick={sendInvite}
        loading={confirmLoading ? true : false}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        open={isModalOpen}
        width={400}
        onCancel={handleCancel}
        footer={() => (
          <div className={styles.modalFooter}>
            <SubmitButton form={form}>Send</SubmitButton>
          </div>
        )}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>Request an invite</div>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            style={{
              width: '100%',
              margin: '10px',
            }}
          >
            <Form.Item
              name="fullName"
              label=""
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: 'Full name is required!',
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.length >= 3) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Full name needs to be more than 3 characters!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
            <Form.Item
              name="email"
              label=""
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                },
                {
                  type: 'email',
                  message: 'Email is not valid!',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="confirmEmail"
              dependencies={['email']}
              label=""
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('email') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Confirm email do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Confirm Email" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        centered
        open={successModalOpen}
        width={400}
        onCancel={handleSuccessModalClose}
        footer={() => (
          <div className={styles.modalFooter}>
            <Button onClick={handleSuccessModalClose}>OK</Button>
          </div>
        )}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>All done!</div>
          <div className={styles.modalText}>
            You will be one of the first to experience Broccoli & Co. when we
            launch.
          </div>
        </div>
      </Modal>
    </>
  );
}
