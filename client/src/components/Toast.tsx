import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Toast() {
  const toast = useSelector((state: RootState) => state.toast);

  return (
    <>
      {toast.type && toast.message.length > 0 && (
        <div className="toast toast-center toast-top top-4">
          <div className={`alert alert-${toast.type}`}>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
