export type ModalType =
  | "account-modal"
  | "wallet-modal"
  | "side-modal"
  | "buildingpublic-modal"
  | "tokencreation-modal";

export const ModalParamManager = {
  "account-modal": {},
  "wallet-modal": {},
  "side-modal": {},
  "buildingpublic-modal": {},
  "tokencreation-modal": {
    token: undefined as string | undefined,
    strategy: undefined as string | undefined,
  },
};

export type ModalShape = {
  key: ModalType;
  params: (typeof ModalParamManager)[ModalType];
};
