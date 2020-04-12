import { Button, Intent, Menu, ProgressBar, Popover } from "@blueprintjs/core";
import { differenceInMinutes, differenceInSeconds, isBefore } from "date-fns";
import * as React from "react";
import css from "./PomodoroTimer.module.css";

interface Props extends React.Attributes {
  session?: {
    type: "FOCUS" | "BREAK";
    startsAt: Date;
    endsAt: Date;
  };
  onRestartButtonClick?: () => void;
  onBreakButtonClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PomodoroTimer({
  session,
  onRestartButtonClick,
  onBreakButtonClick,
  className,
  ...props
}: Props) {
  const forceRerender = useForceRerender();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      forceRerender();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const isFinished = session && isBefore(session.endsAt, new Date());

  return (
    <div className={`${css.root} ${className}`} {...props}>
      <Popover
        content={
          <Menu>
            <Menu.Item
              icon="predictive-analysis"
              onClick={() => {}}
              text="Restart focus session"
            />
            <Menu.Item
              icon="glass"
              onClick={() => {}}
              text="Have a break right now"
            />
          </Menu>
        }
        className={css.menu}
      >
        <Button icon="more" minimal />
      </Popover>

      <div className={css.type}>{session ? session.type : ""}</div>

      <div className={css["remaining-time"]}>
        {session
          ? isFinished
            ? "Finished"
            : `${differenceInMinutes(session.endsAt, new Date())}:${`${
                differenceInSeconds(session.endsAt, new Date()) % 60
              }`.padStart(2, "0")}`
          : "00:00"}
      </div>

      <ProgressBar
        intent={Intent.DANGER}
        stripes={false}
        value={
          session
            ? isFinished
              ? 1
              : 1 -
                differenceInSeconds(session.endsAt, new Date()) /
                  differenceInSeconds(session.endsAt, session.startsAt)
            : 0
        }
        className={css["progress-bar"]}
      />

      <Button className={css["start-button"]}>Start First Session</Button>
    </div>
  );
}

function useForceRerender() {
  const [, setBlankState] = React.useState(Math.random());

  return React.useCallback(() => setBlankState(Math.random()), []);
}
