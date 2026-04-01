import { useCallback, useMemo, useRef, useState } from "react";

/**
 * Material Design 3 style clock-face time picker.
 */
export default function MD3TimePicker({
  value = null,
  onChange,
  onClose,
}) {
  const initHour = value ? value.getHours() % 12 || 12 : 12;
  const initMinute = value ? value.getMinutes() : 0;
  const initAmpm = value ? (value.getHours() >= 12 ? "PM" : "AM") : "AM";

  const [mode, setMode] = useState("hour");
  const [hour, setHour] = useState(initHour);
  const [minute, setMinute] = useState(initMinute);
  const [ampm, setAmpm] = useState(initAmpm);
  const [dragging, setDragging] = useState(false);
  const clockRef = useRef(null);

  const CLOCK_R = 110;
  const HAND_R = 78;
  const DOT_R = 4;

  const hourTicks = useMemo(() => {
    const items = [];
    for (let i = 1; i <= 12; i += 1) items.push(i);
    return items;
  }, []);

  const minuteTicks = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i += 5) items.push(i);
    return items;
  }, []);

  const getAngle = (val, total) => ((val / total) * 360 - 90 + 360) % 360;

  const currentAngle =
    mode === "hour"
      ? getAngle(hour === 12 ? 0 : hour, 12)
      : getAngle(minute, 60);

  const handX = CLOCK_R + Math.cos((currentAngle * Math.PI) / 180) * HAND_R;
  const handY = CLOCK_R + Math.sin((currentAngle * Math.PI) / 180) * HAND_R;

  const tickPositions = (ticks, total, r) =>
    ticks.map((val) => {
      const angle = ((((val / total) * 360 - 90 + 360) % 360) * Math.PI) / 180;
      return {
        val,
        x: CLOCK_R + Math.cos(angle) * r,
        y: CLOCK_R + Math.sin(angle) * r,
      };
    });

  const hourPositions = tickPositions(hourTicks, 12, HAND_R);
  const minutePositions = tickPositions(minuteTicks, 60, HAND_R);
  const activeVal = mode === "hour" ? hour : minute;

  const getValueFromEvent = useCallback(
    (event) => {
      const rect = clockRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let angle = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;

      if (angle < 0) angle += 360;

      if (mode === "hour") {
        let nextHour = Math.round(angle / 30);
        if (nextHour === 0) nextHour = 12;
        if (nextHour > 12) nextHour = 12;
        setHour(nextHour);
        return;
      }

      let nextMinute = Math.round(angle / 6);
      if (nextMinute >= 60) nextMinute = 0;
      setMinute(nextMinute);
    },
    [mode],
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

  const handleMouseUp = (event) => {
    if (!dragging) return;
    setDragging(false);
    getValueFromEvent(event);
    if (mode === "hour") setTimeout(() => setMode("minute"), 150);
  };

  const handleConfirm = () => {
    let hours24 = hour % 12;
    if (ampm === "PM") hours24 += 12;

    const nextValue = new Date();
    nextValue.setHours(hours24, minute, 0, 0);
    onChange?.(nextValue);
  };

  return (
    <div className="m3tp-overlay" onClick={onClose}>
      <div className="m3tp-dialog" onClick={(event) => event.stopPropagation()}>
        <div className="m3tp-header">
          <span className="m3tp-label">Select time</span>
          <div className="m3tp-display">
            <button
              type="button"
              className={`m3tp-seg${mode === "hour" ? " active" : ""}`}
              onClick={() => setMode("hour")}
            >
              {String(hour).padStart(2, "0")}
            </button>

            <span className="m3tp-colon">:</span>

            <button
              type="button"
              className={`m3tp-seg${mode === "minute" ? " active" : ""}`}
              onClick={() => setMode("minute")}
            >
              {String(minute).padStart(2, "0")}
            </button>

            <div className="m3tp-ampm">
              <button
                type="button"
                className={ampm === "AM" ? "active" : ""}
                onClick={() => setAmpm("AM")}
              >
                AM
              </button>
              <button
                type="button"
                className={ampm === "PM" ? "active" : ""}
                onClick={() => setAmpm("PM")}
              >
                PM
              </button>
            </div>
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
              if (mode === "hour") setTimeout(() => setMode("minute"), 150);
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
            <circle cx={handX} cy={handY} r={16} className="m3tp-thumb" />

            {(mode === "hour" ? hourPositions : minutePositions).map(
              ({ val, x, y }) => (
                <g key={val}>
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`m3tp-tick${val === activeVal ? " m3tp-tick-active" : ""}`}
                    onClick={() => {
                      if (mode === "hour") {
                        setHour(val);
                        setTimeout(() => setMode("minute"), 150);
                        return;
                      }

                      setMinute(val);
                    }}
                  >
                    {mode === "minute" ? String(val).padStart(2, "0") : val}
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
