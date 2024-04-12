import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import "./alerts.css";

export type AlertType = "success" | "error" | "info";

export interface AlertData {
  type: AlertType;
  message: string;
}

export interface AlertInfo extends AlertData {
  id: number;
}

export interface AlertProps extends AlertInfo {
  onRemove: (id: number) => void;
}

export default function Alert({ id, type, message, onRemove }: AlertProps) {
  const [transitionState, setTransitionState] = useState(false);

  const transitions = {
    entering: {
      opacity: 1,
      transform: "translate(-50%, 0)",
      // Declared as const to remove a ts error
      visibility: "visible" as const,
    },
    entered: {},
    exiting: {},
    exited: {},
    unmounted: {},
  };

  function autoRemove() {
    const timer = setTimeout(() => {
      setTransitionState(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }

  useEffect(() => {
    const enter = setTimeout(() => setTransitionState(true), 50);
    return () => clearTimeout(enter);
  }, []);

  return (
    <Transition
      in={transitionState}
      timeout={3000}
      onEntered={autoRemove}
      onExited={() => onRemove(id)}
    >
      {(state) => (
        <div className={`alert ${type}`} style={transitions[state]}>
          <i className="alert-icon el-icon-error"></i>
          <p className="content">{message}</p>
        </div>
      )}
    </Transition>
  );
}
