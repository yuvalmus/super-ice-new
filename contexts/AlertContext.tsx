import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import Alert from "@/components/common/alert/Alert";

type ButtonStyle = "default" | "cancel" | "destructive";

export interface AlertButton {
  text: string;
  onPress: () => void;
  style?: ButtonStyle;
}

export interface AlertOptions {
  title: string;
  message: string;
  buttons: AlertButton[];
}

interface AlertContextType {
  visible: boolean;
  options: AlertOptions;
  showAlert: (title: string, message: string, buttons: AlertButton[]) => void;
  hide: () => void;
}

const DEFAULT_OPTIONS: AlertOptions = {
  title: "",
  message: "",
  buttons: [],
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>(DEFAULT_OPTIONS);

  const show = useCallback((alertOptions: AlertOptions) => {
    if (!alertOptions.buttons.length) {
      console.warn("Alert must have at least one button");
      return;
    }
    setOptions(alertOptions);
    setVisible(true);
  }, []);

  // Helper to show a modal with given title, message, and buttons
  const showAlert = (
    title: string,
    message: string,
    buttons: AlertButton[]
  ) => {
    show({ title, message, buttons });
  };

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      visible,
      options,
      showAlert,
      hide,
    }),
    [visible, options, showAlert, hide]
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Alert
        visible={visible}
        title={options.title}
        message={options.message}
        buttons={options.buttons}
        onDismiss={hide}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
