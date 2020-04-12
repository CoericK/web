import { Button, Intent, Menu, ProgressBar, Popover } from "@blueprintjs/core";
import {
  differenceInMinutes,
  differenceInSeconds,
  isFuture,
  isPast,
} from "date-fns";
import * as React from "react";
import styled from "styled-components";
import PomodoroSession from "../../models/PomodoroSession";

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
    <Root {...props}>
      {session && isPast(session.focusStartsAt) ? (
        <MoreMenu
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
        >
          <Button icon="more" minimal />
        </MoreMenu>
      ) : null}

      <Phase>{loading ? "LOADING" : getPhaseText(session)}</Phase>

      <RemainingTime>{getTimerText(session)}</RemainingTime>

      <Progress
        intent={Intent.DANGER}
        stripes={false}
        value={getProgressRate(session)}
      />

      {!loading && getPhase(session) === PomodoroSessionPhase.beforeStart ? (
        <StartButton>Start First Session</StartButton>
      ) : null}
    </Root>
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

const Root = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-template-areas: ". phase menu" "remaining-time remaining-time remaining-time" "progress-bar progress-bar progress-bar" "start-button start-button start-button";
  justify-items: center;
  align-items: flex-start;
  min-width: 480px;
  padding: 16px 32px;
  background: #000000;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const MoreMenu = styled(Popover)`
  grid-area: menu;
`;

const Phase = styled.div`
  grid-area: phase;
  color: white;
  font-family: Rubik;
  font-size: 16px;
  text-align: center;
`;

const RemainingTime = styled.div`
  grid-area: remaining-time;
  color: white;
  font-family: Rubik;
  font-size: 48px;
  text-align: center;
`;

const Progress = styled(ProgressBar)`
  grid-area: progress-bar;
`;

const StartButton = styled(Button)`
  grid-area: start-button;
  margin-top: 16px;
`;
