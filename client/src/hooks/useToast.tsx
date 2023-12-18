import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Toast, setToast, resetToast } from "../redux/toastSlice";

export default function useToast() {
  const currToast = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    // Hide the toast after a certain duration
    currToast.type &&
      setTimeout(() => {
        dispatch(resetToast());
      }, 2500);
  }, [currToast]);

  const toast = (toast: Toast) => {
    dispatch(setToast(toast));
  };

  return toast;
}
