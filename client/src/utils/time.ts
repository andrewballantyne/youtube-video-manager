export const hts = (h: number): number => mts(h * 60);
export const mts = (m: number): number => m * 60;

// TODO: Delete once we have duration in number
const asNumber = (duration: string) => {
  const sections = duration.split(', ');
  const { hour, minute, second } = sections.reduce<{
    hour?: number;
    minute?: number;
    second?: number;
  }>((acc, section) => {
    const [v, t] = section.split(' ');
    const [type] = t.match(/(hour|minute|second)/) ?? [];
    return {
      ...acc,
      [type]: parseInt(v, 10),
    };
  }, {});
  return hts(hour ?? 0) + mts(minute ?? 0) + (second ?? 0);
};

export const inDuration = (
  min: number,
  max: number,
  // TODO: Fix duration to be a full number
  durationString: string
): boolean => {
  const duration: number = asNumber(durationString);
  return duration > min && duration < max;
};
