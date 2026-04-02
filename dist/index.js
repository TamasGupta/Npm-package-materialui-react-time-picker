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
function l(e, t) {
	let n = t.current?.getBoundingClientRect();
	if (!n) return null;
	let r = e.touches ? e.touches[0].clientX : e.clientX, i = e.touches ? e.touches[0].clientY : e.clientY, a = n.left + n.width / 2, o = n.top + n.height / 2, s = r - a, c = i - o, l = Math.atan2(c, s) * 180 / Math.PI + 90;
	return l < 0 && (l += 360), {
		angle: l,
		distance: Math.sqrt(s * s + c * c)
	};
}
function u(e) {
	return Math.round(e / 30) % 12;
}
function d(e, t) {
	return t === "24h" ? String(e).padStart(2, "0") : String(e % 12 || 12).padStart(2, "0");
}
function f({ value: o = null, onChange: f, onClose: p, className: m = "", style: h, clockSize: g = s, theme: _, format: v = "12h" }) {
	let y = o ? o.getHours() : 0, b = o ? o.getMinutes() : 0, x = y >= 12 ? "PM" : "AM", [S, C] = r("hour"), [w, T] = r(y), [E, D] = r(b), [O, k] = r(x), [A, j] = r(!1), M = n(null), N = v === "24h", P = g / 2, F = g * .355, I = g * .235, L = Math.max(4, g * .018), R = Math.max(16, g * .073), ee = {
		...c(_, g),
		...h
	}, z = t(() => {
		if (!N) return Array.from({ length: 12 }, (e, t) => ({
			value: t + 1,
			label: String(t + 1),
			radius: F
		}));
		let e = Array.from({ length: 12 }, (e, t) => {
			let n = t === 0 ? 0 : t + 12;
			return {
				value: n,
				label: String(n).padStart(2, "0"),
				radius: F
			};
		}), t = Array.from({ length: 12 }, (e, t) => {
			let n = t + 1;
			return {
				value: n,
				label: String(n).padStart(2, "0"),
				radius: I
			};
		});
		return [...e, ...t];
	}, [
		I,
		F,
		N
	]), B = t(() => Array.from({ length: 12 }, (e, t) => ({
		value: t * 5,
		label: String(t * 5).padStart(2, "0"),
		radius: F
	})), [F]), V = d(w, v), H = N ? w : w % 12 || 12, U = N && H >= 1 && H <= 12 ? I : F, W = S === "hour" ? H % 12 / 12 * 360 - 90 : E / 60 * 360 - 90, G = S === "hour" ? U : F, K = P + Math.cos(W * Math.PI / 180) * G, q = P + Math.sin(W * Math.PI / 180) * G, J = (e, t) => e.map(({ value: e, label: n, radius: r }) => {
		let i = (e % t / t * 360 - 90 + 360) % 360 * (Math.PI / 180);
		return {
			value: e,
			label: n,
			x: P + Math.cos(i) * r,
			y: P + Math.sin(i) * r
		};
	}), Y = J(z, 12), X = J(B, 60), Z = e((e) => {
		let t = l(e, M);
		if (!t) return;
		if (S === "hour") {
			let e = u(t.angle);
			if (N) {
				let n = (F + I) / 2, r = t.distance < n ? e === 0 ? 12 : e : e === 0 ? 0 : e + 12;
				T(r), k(r >= 12 ? "PM" : "AM");
				return;
			}
			let n = e === 0 ? 12 : e;
			T((e) => (O === "PM" ? 12 : 0) + n % 12);
			return;
		}
		let n = Math.round(t.angle / 6);
		n >= 60 && (n = 0), D(n);
	}, [
		I,
		F,
		O,
		N,
		S
	]), Q = (e) => {
		e.preventDefault(), j(!0), Z(e);
	}, te = (e) => {
		A && Z(e);
	}, $ = () => {
		S === "hour" && setTimeout(() => C("minute"), 150);
	}, ne = (e) => {
		A && (j(!1), Z(e), $());
	}, re = () => {
		let e = /* @__PURE__ */ new Date(), t = N ? w : (O === "PM" ? 12 : 0) + w % 12;
		e.setHours(t, E, 0, 0), f?.(e);
	}, ie = (e) => {
		if (N) {
			T(e), k(e >= 12 ? "PM" : "AM"), $();
			return;
		}
		let t = e % 12;
		T((O === "PM" ? 12 : 0) + t), $();
	};
	return /* @__PURE__ */ i("div", {
		className: "m3tp-overlay",
		style: ee,
		onClick: p,
		children: /* @__PURE__ */ a("div", {
			className: `m3tp-dialog${m ? ` ${m}` : ""}`,
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
								className: `m3tp-seg${S === "hour" ? " active" : ""}`,
								onClick: () => C("hour"),
								children: V
							}),
							/* @__PURE__ */ i("span", {
								className: "m3tp-colon",
								children: ":"
							}),
							/* @__PURE__ */ i("button", {
								type: "button",
								className: `m3tp-seg${S === "minute" ? " active" : ""}`,
								onClick: () => C("minute"),
								children: String(E).padStart(2, "0")
							}),
							N ? null : /* @__PURE__ */ a("div", {
								className: "m3tp-ampm",
								children: [/* @__PURE__ */ i("button", {
									type: "button",
									className: O === "AM" ? "active" : "",
									onClick: () => {
										k("AM"), T((e) => e % 12);
									},
									children: "AM"
								}), /* @__PURE__ */ i("button", {
									type: "button",
									className: O === "PM" ? "active" : "",
									onClick: () => {
										k("PM"), T((e) => e % 12 + 12);
									},
									children: "PM"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ i("div", {
					className: "m3tp-clock-wrap",
					children: /* @__PURE__ */ a("svg", {
						ref: M,
						width: P * 2,
						height: P * 2,
						className: "m3tp-clock",
						onMouseDown: Q,
						onMouseMove: te,
						onMouseUp: ne,
						onMouseLeave: () => A && j(!1),
						onTouchStart: (e) => {
							j(!0), Z(e);
						},
						onTouchMove: Z,
						onTouchEnd: () => {
							j(!1), $();
						},
						children: [
							/* @__PURE__ */ i("circle", {
								cx: P,
								cy: P,
								r: P - 2,
								className: "m3tp-face"
							}),
							/* @__PURE__ */ i("line", {
								x1: P,
								y1: P,
								x2: K,
								y2: q,
								className: "m3tp-hand"
							}),
							/* @__PURE__ */ i("circle", {
								cx: P,
								cy: P,
								r: L,
								className: "m3tp-center-dot"
							}),
							/* @__PURE__ */ i("circle", {
								cx: K,
								cy: q,
								r: R,
								className: "m3tp-thumb"
							}),
							(S === "hour" ? Y : X).map(({ value: e, label: t, x: n, y: r }) => /* @__PURE__ */ i("g", { children: /* @__PURE__ */ i("text", {
								x: n,
								y: r,
								textAnchor: "middle",
								dominantBaseline: "central",
								className: `m3tp-tick${e === (S === "hour" ? H : E) ? " m3tp-tick-active" : ""}`,
								onClick: () => {
									if (S === "hour") {
										ie(e);
										return;
									}
									D(e);
								},
								children: t
							}) }, `${S}-${e}`))
						]
					})
				}),
				/* @__PURE__ */ a("div", {
					className: "m3tp-footer",
					children: [/* @__PURE__ */ i("button", {
						type: "button",
						className: "m3tp-btn m3tp-cancel",
						onClick: p,
						children: "Cancel"
					}), /* @__PURE__ */ i("button", {
						type: "button",
						className: "m3tp-btn m3tp-ok",
						onClick: re,
						children: "OK"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/index.js
var p = "materialui-react-time-picker-styles";
if (typeof document < "u" && !document.getElementById(p)) {
	let e = document.createElement("style");
	e.id = p, e.textContent = o, document.head.appendChild(e);
}
//#endregion
export { f as default };
