import React, { useContext } from "react";
import { render, wait } from "@testing-library/react";
import {
  NotificationContext,
  NotificationContextProvider,
  defaultNotificationState
} from "contexts/NotificationContext";
import userEvent from "@testing-library/user-event";
import NotificationState from "types/NotificationState";

const activeNotificationState = {
  type: "warning",
  content: "Alert",
  isActive: true
};

describe("NotificationContext", () => {
  afterEach(() => jest.clearAllMocks());
  it("setNotification", async () => {
    let currentNotificationState: NotificationState;
    const TestComponent = () => {
      const { setNotification, notificationState } = useContext(
        NotificationContext
      );
      currentNotificationState = notificationState;
      return (
        <div>
          <button
            type="button"
            onClick={() =>
              setNotification(
                activeNotificationState.content,
                activeNotificationState.type
              )
            }
          >
            setNotification
          </button>
        </div>
      );
    };
    const { getByText } = render(<TestComponent />, {
      wrapper: ({ children }) => (
        <NotificationContextProvider>{children}</NotificationContextProvider>
      )
    });

    await wait(() => {
      expect(currentNotificationState).toEqual(defaultNotificationState);
    });

    const setNotificationButton = getByText("setNotification");
    userEvent.click(setNotificationButton);
    await wait(() => {
      expect(currentNotificationState).toEqual(activeNotificationState);
    });
  });
});
