import { useCallback as e, useMemo as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/style.css?inline
var o = ".m3tp-overlay{--m3tp-overlay-bg:#00000073;--m3tp-dialog-bg:#fff;--m3tp-dialog-color:#1c1b1f;--m3tp-dialog-radius:28px;--m3tp-dialog-shadow:0 8px 40px #0000002e;--m3tp-label-color:#49454f;--m3tp-segment-bg:#ece6f0;--m3tp-segment-color:#1c1b1f;--m3tp-segment-active-bg:#8a32fa;--m3tp-segment-active-color:#fff;--m3tp-segment-hover-bg:#e0d7f7;--m3tp-border-color:#79747e;--m3tp-ampm-active-bg:#e8def8;--m3tp-ampm-active-color:#21005d;--m3tp-ampm-hover-bg:#f3edf7;--m3tp-clock-face:#ece6f0;--m3tp-accent:#8a32fa;--m3tp-tick-color:#1c1b1f;--m3tp-tick-active-color:#fff;--m3tp-button-color:#8a32fa;--m3tp-button-hover-bg:#f3edf7;--m3tp-font-family:inherit;--m3tp-clock-size:220px;--m3tp-tick-font-size:14px;background:var(--m3tp-overlay-bg);z-index:99999;justify-content:center;align-items:center;animation:.18s m3tp-fade-in;display:flex;position:fixed;inset:0}@keyframes m3tp-fade-in{0%{opacity:0}to{opacity:1}}.m3tp-dialog{background:var(--m3tp-dialog-bg);color:var(--m3tp-dialog-color);border-radius:var(--m3tp-dialog-radius);width:min(calc(var(--m3tp-clock-size) + 100px), 92vw);box-shadow:var(--m3tp-dialog-shadow);-webkit-user-select:none;user-select:none;font-family:var(--m3tp-font-family);padding:24px;animation:.22s cubic-bezier(.34,1.26,.64,1) m3tp-slide-up}@keyframes m3tp-slide-up{0%{opacity:0;transform:translateY(24px)scale(.96)}to{opacity:1;transform:translateY(0)scale(1)}}.m3tp-header{margin-bottom:20px}.m3tp-label{color:var(--m3tp-label-color);letter-spacing:.4px;margin-bottom:10px;font-size:12px;font-weight:500;display:block}.m3tp-display{justify-content:space-around;align-items:center;gap:4px;display:flex}.m3tp-seg{background:var(--m3tp-segment-bg);font-size:clamp(28px, calc(var(--m3tp-clock-size) * .145), 36px);color:var(--m3tp-segment-color);width:clamp(68px, calc(var(--m3tp-clock-size) * .364), 88px);height:clamp(64px, calc(var(--m3tp-clock-size) * .327), 78px);cursor:pointer;letter-spacing:-1px;border:none;border-radius:12px;justify-content:center;align-items:center;font-weight:400;line-height:1;transition:background .15s,color .15s;display:flex}.m3tp-seg.active{background:var(--m3tp-segment-active-bg);color:var(--m3tp-segment-active-color)}.m3tp-seg:hover:not(.active){background:var(--m3tp-segment-hover-bg)}.m3tp-colon{font-size:clamp(28px, calc(var(--m3tp-clock-size) * .145), 36px);color:var(--m3tp-dialog-color);padding:0 2px;font-weight:300;line-height:1}.m3tp-ampm{border:1px solid var(--m3tp-border-color);height:clamp(64px, calc(var(--m3tp-clock-size) * .327), 78px);border-radius:10px;flex-direction:column;flex-shrink:0;margin-left:8px;display:flex;overflow:hidden}.m3tp-ampm button{color:var(--m3tp-label-color);cursor:pointer;background:0 0;border:none;flex:1;padding:0 14px;font-size:13px;font-weight:500;line-height:1;transition:background .15s,color .15s}.m3tp-ampm button:first-child{border-bottom:1px solid var(--m3tp-border-color)}.m3tp-ampm button.active{background:var(--m3tp-ampm-active-bg);color:var(--m3tp-ampm-active-color)}.m3tp-ampm button:hover:not(.active){background:var(--m3tp-ampm-hover-bg)}.m3tp-clock-wrap{justify-content:center;margin-bottom:20px;display:flex}.m3tp-clock{cursor:pointer;touch-action:none;width:var(--m3tp-clock-size);height:var(--m3tp-clock-size);border-radius:50%;display:block}.m3tp-face{fill:var(--m3tp-clock-face)}.m3tp-hand{stroke:var(--m3tp-accent);stroke-width:2px}.m3tp-center-dot,.m3tp-thumb{fill:var(--m3tp-accent)}.m3tp-tick{font-size:var(--m3tp-tick-font-size);fill:var(--m3tp-tick-color);cursor:pointer;pointer-events:all;font-weight:400}.m3tp-tick-active{fill:var(--m3tp-tick-active-color);font-weight:500}.m3tp-footer{justify-content:flex-end;gap:8px;display:flex}.m3tp-btn{cursor:pointer;letter-spacing:.1px;background:0 0;border:none;border-radius:20px;padding:10px 20px;font-size:14px;font-weight:500;transition:background .15s}.m3tp-cancel,.m3tp-ok{color:var(--m3tp-button-color)}.m3tp-cancel:hover,.m3tp-ok:hover{background:var(--m3tp-button-hover-bg)}", s = 220;
function c(e = {}, t = s) {
	return {
		"--m3tp-overlay-bg": e.overlayBackground,
		"--m3tp-dialog-bg": e.dialogBackground,
		"--m3tp-dialog-color": e.textColor,
		"--m3tp-dialog-radius": e.dialogBorderRadius,
		"--m3tp-dialog-shadow": e.dialogShadow,
		"--m3tp-label-color": e.labelColor,
		"--m3tp-segment-bg": e.segmentBackground,
		"--m3tp-segment-color": e.segmentTextColor,
		"--m3tp-segment-active-bg": e.segmentActiveBackground,
		"--m3tp-segment-active-color": e.segmentActiveTextColor,
		"--m3tp-segment-hover-bg": e.segmentHoverBackground,
		"--m3tp-border-color": e.borderColor,
		"--m3tp-ampm-active-bg": e.ampmActiveBackground,
		"--m3tp-ampm-active-color": e.ampmActiveTextColor,
		"--m3tp-ampm-hover-bg": e.ampmHoverBackground,
		"--m3tp-clock-face": e.clockFaceBackground,
		"--m3tp-accent": e.accentColor,
		"--m3tp-tick-color": e.tickColor,
		"--m3tp-tick-active-color": e.tickActiveColor,
		"--m3tp-button-color": e.buttonColor,
		"--m3tp-button-hover-bg": e.buttonHoverBackground,
		"--m3tp-font-family": e.fontFamily,
		"--m3tp-clock-size": `${t}px`,
		"--m3tp-tick-font-size": e.tickFontSize
	};
}
function l({ value: o = null, onChange: l, onClose: u, className: d = "", style: f, clockSize: p = s, theme: m }) {
	let h = o && o.getHours() % 12 || 12, g = o ? o.getMinutes() : 0, _ = o && o.getHours() >= 12 ? "PM" : "AM", [v, y] = r("hour"), [b, x] = r(h), [S, C] = r(g), [w, T] = r(_), [E, D] = r(!1), O = n(null), k = p / 2, A = p * .355, j = Math.max(4, p * .018), M = Math.max(16, p * .073), N = {
		...c(m, p),
		...f
	}, P = t(() => {
		let e = [];
		for (let t = 1; t <= 12; t += 1) e.push(t);
		return e;
	}, []), F = t(() => {
		let e = [];
		for (let t = 0; t < 60; t += 5) e.push(t);
		return e;
	}, []), I = (e, t) => (e / t * 360 - 90 + 360) % 360, L = v === "hour" ? I(b === 12 ? 0 : b, 12) : I(S, 60), R = k + Math.cos(L * Math.PI / 180) * A, z = k + Math.sin(L * Math.PI / 180) * A, B = (e, t, n) => e.map((e) => {
		let r = (e / t * 360 - 90 + 360) % 360 * Math.PI / 180;
		return {
			val: e,
			x: k + Math.cos(r) * n,
			y: k + Math.sin(r) * n
		};
	}), V = B(P, 12, A), H = B(F, 60, A), U = v === "hour" ? b : S, W = e((e) => {
		let t = O.current?.getBoundingClientRect();
		if (!t) return;
		let n = e.touches ? e.touches[0].clientX : e.clientX, r = e.touches ? e.touches[0].clientY : e.clientY, i = t.left + t.width / 2, a = t.top + t.height / 2, o = Math.atan2(r - a, n - i) * 180 / Math.PI + 90;
		if (o < 0 && (o += 360), v === "hour") {
			let e = Math.round(o / 30);
			e === 0 && (e = 12), e > 12 && (e = 12), x(e);
			return;
		}
		let s = Math.round(o / 6);
		s >= 60 && (s = 0), C(s);
	}, [v]);
	return /* @__PURE__ */ i("div", {
		className: "m3tp-overlay",
		style: N,
		onClick: u,
		children: /* @__PURE__ */ a("div", {
			className: `m3tp-dialog${d ? ` ${d}` : ""}`,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ a("div", {
					className: "m3tp-header",
					children: [/* @__PURE__ */ i("span", {
						className: "m3tp-label",
						children: "Select time"
					}), /* @__PURE__ */ a("div", {
						className: "m3tp-display",
						children: [
							/* @__PURE__ */ i("button", {
								type: "button",
								className: `m3tp-seg${v === "hour" ? " active" : ""}`,
								onClick: () => y("hour"),
								children: String(b).padStart(2, "0")
							}),
							/* @__PURE__ */ i("span", {
								className: "m3tp-colon",
								children: ":"
							}),
							/* @__PURE__ */ i("button", {
								type: "button",
								className: `m3tp-seg${v === "minute" ? " active" : ""}`,
								onClick: () => y("minute"),
								children: String(S).padStart(2, "0")
							}),
							/* @__PURE__ */ a("div", {
								className: "m3tp-ampm",
								children: [/* @__PURE__ */ i("button", {
									type: "button",
									className: w === "AM" ? "active" : "",
									onClick: () => T("AM"),
									children: "AM"
								}), /* @__PURE__ */ i("button", {
									type: "button",
									className: w === "PM" ? "active" : "",
									onClick: () => T("PM"),
									children: "PM"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ i("div", {
					className: "m3tp-clock-wrap",
					children: /* @__PURE__ */ a("svg", {
						ref: O,
						width: k * 2,
						height: k * 2,
						className: "m3tp-clock",
						onMouseDown: (e) => {
							e.preventDefault(), D(!0), W(e);
						},
						onMouseMove: (e) => {
							E && W(e);
						},
						onMouseUp: (e) => {
							E && (D(!1), W(e), v === "hour" && setTimeout(() => y("minute"), 150));
						},
						onMouseLeave: () => E && D(!1),
						onTouchStart: (e) => {
							D(!0), W(e);
						},
						onTouchMove: W,
						onTouchEnd: () => {
							D(!1), v === "hour" && setTimeout(() => y("minute"), 150);
						},
						children: [
							/* @__PURE__ */ i("circle", {
								cx: k,
								cy: k,
								r: k - 2,
								className: "m3tp-face"
							}),
							/* @__PURE__ */ i("line", {
								x1: k,
								y1: k,
								x2: R,
								y2: z,
								className: "m3tp-hand"
							}),
							/* @__PURE__ */ i("circle", {
								cx: k,
								cy: k,
								r: j,
								className: "m3tp-center-dot"
							}),
							/* @__PURE__ */ i("circle", {
								cx: R,
								cy: z,
								r: M,
								className: "m3tp-thumb"
							}),
							(v === "hour" ? V : H).map(({ val: e, x: t, y: n }) => /* @__PURE__ */ i("g", { children: /* @__PURE__ */ i("text", {
								x: t,
								y: n,
								textAnchor: "middle",
								dominantBaseline: "central",
								className: `m3tp-tick${e === U ? " m3tp-tick-active" : ""}`,
								onClick: () => {
									if (v === "hour") {
										x(e), setTimeout(() => y("minute"), 150);
										return;
									}
									C(e);
								},
								children: v === "minute" ? String(e).padStart(2, "0") : e
							}) }, e))
						]
					})
				}),
				/* @__PURE__ */ a("div", {
					className: "m3tp-footer",
					children: [/* @__PURE__ */ i("button", {
						type: "button",
						className: "m3tp-btn m3tp-cancel",
						onClick: u,
						children: "Cancel"
					}), /* @__PURE__ */ i("button", {
						type: "button",
						className: "m3tp-btn m3tp-ok",
						onClick: () => {
							let e = b % 12;
							w === "PM" && (e += 12);
							let t = /* @__PURE__ */ new Date();
							t.setHours(e, S, 0, 0), l?.(t);
						},
						children: "OK"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/index.js
var u = "materialui-react-time-picker-styles";
if (typeof document < "u" && !document.getElementById(u)) {
	let e = document.createElement("style");
	e.id = u, e.textContent = o, document.head.appendChild(e);
}
//#endregion
export { l as default };
