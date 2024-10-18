import { closeModal, updateModalAndState } from "@/store/slices/ui.slice";
import { useAppDispatch, useAppSelector } from "./useStore";

export const useUi = () => {
  const state = useAppSelector((state) => state.userInterface);
  const dispatch = useAppDispatch();

  const hideModal = () => dispatch(closeModal());
  const updateModal = (val) => dispatch(updateModalAndState(val));

  return {
    ...state,
    modalState: state.modalState,
    hideModal,
    updateModal,
  };
};
