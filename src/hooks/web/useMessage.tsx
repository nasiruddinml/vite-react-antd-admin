import type { ModalFuncProps } from 'antd';
import { message, Modal } from 'antd';

import { getIntlText } from '@/locales';

function createElMessageBox(message: string, title: string, options: ModalFuncProps) {
  Modal.error({ title, content: message, ...options });
}

export function createErrorModal(msg: string) {
  createElMessageBox(msg, getIntlText('api.errorTip'), { centered: true });
}

export function createErrorMsg(msg: string) {
  message.error(msg);
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg,
  };
}
