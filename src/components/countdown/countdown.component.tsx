import type { FC } from "react";

import { useCountdown } from "../../utils/hooks";

export type CountdownProps = {
  endDate: number;
};

const Countdown: FC<CountdownProps> = ({ endDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(endDate);

  const expired = days + hours + minutes + seconds <= 0;

  return (
    <>
      {!expired && (
        <div>
          ({days}:{hours}:{minutes}:{seconds})
        </div>
      )}
    </>
  );
};

export default Countdown;
