import React from 'react';
import { Modal } from 'antd';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const WarningModal: React.FC = (props: any) => {
  const { showModal, content, confirm, cancel, danger, title } = props;
  return (
    <>
      <Modal
        className="warning-modal"
        title={title ? title : '警告'}
        open={showModal}
        onOk={confirm}
        onCancel={cancel}
        okText="确认"
        cancelText="取消"
      >
        {content ? (
          <>
            <div className="modal-content">
              <span className="modal-warning">
                <div
                  className={[
                    'warning-icon',
                    danger ? 'warning-icon-danger' : '',
                  ].join(' ')}
                >
                  <FontAwesomeIcon icon={faCircleExclamation} size="2x" />
                </div>
                <div className="warning-text ml-2">{content}</div>
              </span>
            </div>
          </>
        ) : (
          ''
        )}
        {props.children}
      </Modal>
    </>
  );
};

export default WarningModal;
