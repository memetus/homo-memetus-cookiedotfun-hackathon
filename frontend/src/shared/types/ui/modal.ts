export type ModalType =
  | 'account-modal'
  | 'wallet-modal'
  | 'side-modal'
  | 'buildingpublic-modal';

export const ModalParamManager = {
  'account-modal': {},
  'wallet-modal': {},
  'side-modal': {},
  'buildingpublic-modal': {},
};

export type ModalShape = {
  key: ModalType;
  params: (typeof ModalParamManager)[ModalType];
};
