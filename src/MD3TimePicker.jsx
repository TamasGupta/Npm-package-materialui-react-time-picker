import { useCallback, useMemo, useRef, useState } from "react";

const DEFAULT_CLOCK_SIZE = 220;

function getThemeStyles(theme = {}, clockSize = DEFAULT_CLOCK_SIZE) {
  return {
    "--m3tp-overlay-bg": theme.overlayBackground,
    "--m3tp-dialog-bg": theme.dialogBackground,
    "--m3tp-dialog-color": theme.textColor,
    "--m3tp-dialog-radius": theme.dialogBorderRadius,
    "--m3tp-dialog-shadow": theme.dialogShadow,
    "--m3tp-label-color": theme.labelColor,
    "--m3tp-segment-bg": theme.segmentBackground,
    "--m3tp-segment-color": theme.segmentTextColor,
    "--m3tp-segment-active-bg": theme.segmentActiveBackground,
    "--m3tp-segment-active-color": theme.segmentActiveTextColor,
    "--m3tp-segment-hover-bg": theme.segmentHoverBackground,
    "--m3tp-border-color": theme.borderColor,
    "--m3tp-ampm-active-bg": theme.ampmActiveBackground,
    "--m3tp-ampm-active-color": theme.ampmActiveTextColor,
    "--m3tp-ampm-hover-bg": theme.ampmHoverBackground,
    "--m3tp-clock-face": theme.clockFaceBackground,
    "--m3tp-accent": theme.accentColor,
    "--m3tp-tick-color": theme.tickColor,
    "--m3tp-tick-active-color": theme.tickActiveColor,
    "--m3tp-button-color": theme.buttonColor,
    "--m3tp-button-hover-bg": theme.buttonHoverBackground,
    "--m3tp-font-family": theme.fontFamily,
    "--m3tp-clock-size": `${clockSize}px`,
    "--m3tp-tick-font-size": theme.tickFontSize,
  };
}

function getPointerDetails(event, clockRef) {
  const rect = clockRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

  if (angle < 0) angle += 360;

  return {
    angle,
    distance: Math.sqrt(dx * dx + dy * dy),
  };
}

function getHourFromAngle(angle) {
  return Math.round(angle / 30) % 12;
}

function formatDisplayHour(hour, format) {
  if (format === "24h") return String(hour).padStart(2, "0");
  return String(hour % 12 || 12).padStart(2, "0");
}

/**
 * Material Design 3 style clock-face time picker.
 */
export default function MD3TimePicker({
  value = null,
  onChange,
  onClose,
  className = "",
  style,
  clockSize = DEFAULT_CLOCK_SIZE,
  theme,
  format = "12h",
}) {
  const initialHours24 = value ? value.getHours() : 0;
  const initialMinute = value ? value.getMinutes() : 0;
  const initialAmpm = initialHours24 >= 12 ? "PM" : "AM";

  const [mode, setMode] = useState("hour");
  const [hour24, setHour24] = useState(initialHours24);
  const [minute, setMinute] = useState(initialMinute);
  const [ampm, setAmpm] = useState(initialAmpm);
  const [dragging, setDragging] = useState(false);
  const clockRef = useRef(null);

  const is24Hour = format === "24h";
  const CLOCK_R = clockSize / 2;
  const OUTER_HAND_R = clockSize * 0.355;
  const INNER_HAND_R = clockSize * 0.235;
  const DOT_R = Math.max(4, clockSize * 0.018);
  const THUMB_R = Math.max(16, clockSize * 0.073);
  const rootStyle = {
    ...getThemeStyles(theme, clockSize),
    ...style,
  };

  const hourTicks = useMemo(() => {
    if (!is24Hour) {
      return Array.from({ length: 12 }, (_, index) => ({
        value: index + 1,
        label: String(index + 1),
        radius: OUTER_HAND_R,
      }));
    }

    const outerRing = Array.from({ length: 12 }, (_, index) => {
      const value = index === 0 ? 0 : index + 12;
      return {
        value,
        label: String(value).padStart(2, "0"),
        radius: OUTER_HAND_R,
      };
    });

    const innerRing = Array.from({ length: 12 }, (_, index) => {
      const value = index + 1;
      return {
        value,
        label: String(value).padStart(2, "0"),
        radius: INNER_HAND_R,
      };
    });

    return [...outerRing, ...innerRing];
  }, [INNER_HAND_R, OUTER_HAND_R, is24Hour]);

  const minuteTicks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        value: index * 5,
        label: String(index * 5).padStart(2, "0"),
        radius: OUTER_HAND_R,
      })),
    [OUTER_HAND_R],
  );

  const displayHour = formatDisplayHour(hour24, format);
  const activeHourValue = is24Hour ? hour24 : hour24 % 12 || 12;
  const hourHandRadius =
    is24Hour && activeHourValue >= 1 && activeHourValue <= 12
      ? INNER_HAND_R
      : OUTER_HAND_R;
  const currentAngle =
    mode === "hour"
      ? ((activeHourValue % 12) / 12) * 360 - 90
      : (minute / 60) * 360 - 90;
  const activeRadius = mode === "hour" ? hourHandRadius : OUTER_HAND_R;
  const handX = CLOCK_R + Math.cos((currentAngle * Math.PI) / 180) * activeRadius;
  const handY = CLOCK_R + Math.sin((currentAngle * Math.PI) / 180) * activeRadius;

  const tickPositions = (ticks, total) =>
    ticks.map(({ value: tickValue, label, radius }) => {
      const angle = ((((tickValue % total) / total) * 360 - 90 + 360) % 360) * (Math.PI / 180);
      return {
        value: tickValue,
        label,
        x: CLOCK_R + Math.cos(angle) * radius,
        y: CLOCK_R + Math.sin(angle) * radius,
      };
    });

  const hourPositions = tickPositions(hourTicks, 12);
  const minutePositions = tickPositions(minuteTicks, 60);

  const getValueFromEvent = useCallback(
    (event) => {
      const pointer = getPointerDetails(event, clockRef);
      if (!pointer) return;

      if (mode === "hour") {
        const rawHour = getHourFromAngle(pointer.angle);

        if (is24Hour) {
          const ringBoundary = (OUTER_HAND_R + INNER_HAND_R) / 2;
          const nextHour =
            pointer.distance < ringBoundary
              ? rawHour === 0
                ? 12
                : rawHour
              : rawHour === 0
                ? 0
                : rawHour + 12;

          setHour24(nextHour);
          setAmpm(nextHour >= 12 ? "PM" : "AM");
          return;
        }

        const nextHour = rawHour === 0 ? 12 : rawHour;
        setHour24((currentHour) => {
          const nextHours24 =
            (ampm === "PM" ? 12 : 0) + (nextHour % 12);
          return nextHours24;
        });
        return;
      }

      let nextMinute = Math.round(pointer.angle / 6);
      if (nextMinute >= 60) nextMinute = 0;
      setMinute(nextMinute);
    },
    [INNER_HAND_R, OUTER_HAND_R, ampm, is24Hour, mode],
  );

  const handleMouseDown = (event) => {
    event.preventDefault();
    setDragging(true);
    getValueFromEvent(event);
  };

  const handleMouseMove = (event) => {
    if (!dragging) return;
    getValueFromEvent(event);
  };

  const advanceToMinutes = () => {
    if (mode === "hour") setTimeout(() => setMode("minute"), 150);
  };

  const handleMouseUp = (event) => {
    if (!dragging) return;
    setDragging(false);
    getValueFromEvent(event);
    advanceToMinutes();
  };

  const handleConfirm = () => {
    const nextValue = new Date();
    const hours24 = is24Hour ? hour24 : (ampm === "PM" ? 12 : 0) + (hour24 % 12);
    nextValue.setHours(hours24, minute, 0, 0);
    onChange?.(nextValue);
  };

  const setHourFromClick = (nextHour) => {
    if (is24Hour) {
      setHour24(nextHour);
      setAmpm(nextHour >= 12 ? "PM" : "AM");
      advanceToMinutes();
      return;
    }

    const normalizedHour = nextHour % 12;
    setHour24((ampm === "PM" ? 12 : 0) + normalizedHour);
    advanceToMinutes();
  };

  return (
    <div className="m3tp-overlay" style={rootStyle} onClick={onClose}>
      <div
        className={`m3tp-dialog${className ? ` ${className}` : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="m3tp-header">
          <span className="m3tp-label">Select time</span>
          <div className="m3tp-display">
            <button
              type="button"
              className={`m3tp-seg${mode === "hour" ? " active" : ""}`}
              onClick={() => setMode("hour")}
            >
              {displayHour}
            </button>

            <span className="m3tp-colon">:</span>

            <button
              type="button"
              className={`m3tp-seg${mode === "minute" ? " active" : ""}`}
              onClick={() => setMode("minute")}
            >
              {String(minute).padStart(2, "0")}
            </button>

            {!is24Hour ? (
              <div className="m3tp-ampm">
                <button
                  type="button"
                  className={ampm === "AM" ? "active" : ""}
                  onClick={() => {
                    setAmpm("AM");
                    setHour24((currentHour) => currentHour % 12);
                  }}
                >
                  AM
                </button>
                <button
                  type="button"
                  className={ampm === "PM" ? "active" : ""}
                  onClick={() => {
                    setAmpm("PM");
                    setHour24((currentHour) => (currentHour % 12) + 12);
                  }}
                >
                  PM
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="m3tp-clock-wrap">
          <svg
            ref={clockRef}
            width={CLOCK_R * 2}
            height={CLOCK_R * 2}
            className="m3tp-clock"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => dragging && setDragging(false)}
            onTouchStart={(event) => {
              setDragging(true);
              getValueFromEvent(event);
            }}
            onTouchMove={getValueFromEvent}
            onTouchEnd={() => {
              setDragging(false);
              advanceToMinutes();
            }}
          >
            <circle
              cx={CLOCK_R}
              cy={CLOCK_R}
              r={CLOCK_R - 2}
              className="m3tp-face"
            />

            <line
              x1={CLOCK_R}
              y1={CLOCK_R}
              x2={handX}
              y2={handY}
              className="m3tp-hand"
            />
            <circle
              cx={CLOCK_R}
              cy={CLOCK_R}
              r={DOT_R}
              className="m3tp-center-dot"
            />
            <circle cx={handX} cy={handY} r={THUMB_R} className="m3tp-thumb" />

            {(mode === "hour" ? hourPositions : minutePositions).map(
              ({ value: tickValue, label, x, y }) => (
                <g key={`${mode}-${tickValue}`}>
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`m3tp-tick${tickValue === (mode === "hour" ? activeHourValue : minute) ? " m3tp-tick-active" : ""}`}
                    onClick={() => {
                      if (mode === "hour") {
                        setHourFromClick(tickValue);
                        return;
                      }

                      setMinute(tickValue);
                    }}
                  >
                    {label}
                  </text>
                </g>
              ),
            )}
          </svg>
        </div>

        <div className="m3tp-footer">
          <button
            type="button"
            className="m3tp-btn m3tp-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="button" className="m3tp-btn m3tp-ok" onClick={handleConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
