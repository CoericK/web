import { Button, Intent, Menu, ProgressBar, Popover } from "@blueprintjs/core";
import {
  differenceInMinutes,
  differenceInSeconds,
  isFuture,
  isPast,
} from "date-fns";
import * as React from "react";
import PomodoroSession from "../../models/PomodoroSession";
import css from "./PomodoroTimer.module.css";

interface Props extends React.Attributes {
  session?: PomodoroSession;
  loading?: boolean;
  onRestartButtonClick?: () => void;
  onBreakButtonClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PomodoroTimer({
  session,
  loading = false,
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

  return (
    <div className={`${css.root} ${className}`} {...props}>
      {session && isPast(session.focusStartsAt) ? (
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
      ) : null}

      <div className={css.type}>{getPhaseText(session)}</div>

      <div className={css["remaining-time"]}>{getTimerText(session)}</div>

      <ProgressBar
        intent={Intent.DANGER}
        stripes={false}
        value={getProgressRate(session)}
        className={css["progress-bar"]}
      />

      {!loading && getPhase(session) === PomodoroSessionPhase.beforeStart ? (
        <Button className={css["start-button"]}>Start First Session</Button>
      ) : null}
    </div>
  );
}

function useForceRerender() {
  const [, setBlankState] = React.useState(Math.random());

  return React.useCallback(() => setBlankState(Math.random()), []);
}

enum PomodoroSessionPhase {
  beforeStart,
  focus,
  break,
  finished,
  unknown,
}

function getPhaseText(session?: PomodoroSession): string {
  switch (getPhase(session)) {
    case PomodoroSessionPhase.beforeStart:
      return "AWAITING";
    case PomodoroSessionPhase.focus:
      return "FOCUS";
    case PomodoroSessionPhase.break:
      return "BREAK";
    case PomodoroSessionPhase.finished:
      return "FINISHED";
    case PomodoroSessionPhase.unknown:
      return "FINISHED";
  }
}

function getTimerText(session?: PomodoroSession): string {
  let endsAt: Date;

  switch (getPhase(session)) {
    case PomodoroSessionPhase.focus:
      endsAt = session!.focusEndsAt;
      break;
    case PomodoroSessionPhase.break:
      endsAt = session!.breakEndsAt;
      break;
    default:
      return "--:--";
  }

  const minutes = differenceInMinutes(endsAt, new Date());
  const seconds = differenceInSeconds(endsAt, new Date());

  return `${minutes}:${`${seconds % 60}`.padStart(2, "0")}`;
}

function getProgressRate(session?: PomodoroSession): number {
  let startsAt: Date;
  let endsAt: Date;

  switch (getPhase(session)) {
    case PomodoroSessionPhase.focus:
      startsAt = session!.focusStartsAt;
      endsAt = session!.focusEndsAt;
      break;
    case PomodoroSessionPhase.break:
      startsAt = session!.breakStartsAt;
      endsAt = session!.breakEndsAt;
      break;
    case PomodoroSessionPhase.beforeStart:
      return 0;
    default:
      return 1;
  }

  const duration = differenceInSeconds(endsAt, startsAt);
  const elapsed = differenceInSeconds(new Date(), startsAt);

  return elapsed / duration;
}

// TODO: move this to models/PomodoroSession
function getPhase(session?: PomodoroSession): PomodoroSessionPhase {
  if (!session || isFuture(session.focusStartsAt)) {
    return PomodoroSessionPhase.beforeStart;
  }

  if (isPast(session.focusStartsAt) && isFuture(session.breakStartsAt)) {
    return PomodoroSessionPhase.focus;
  }

  if (isPast(session.breakStartsAt) && isFuture(session.breakEndsAt)) {
    return PomodoroSessionPhase.break;
  }

  if (isPast(session.focusEndsAt) && isPast(session.breakEndsAt)) {
    return PomodoroSessionPhase.finished;
  }

  return PomodoroSessionPhase.unknown;
}
