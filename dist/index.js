import { useCallback as e, useMemo as t, useRef as n, useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/style.css?inline
var o = ".m3tp-overlay{z-index:99999;background:#00000073;justify-content:center;align-items:center;animation:.18s m3tp-fade-in;display:flex;position:fixed;inset:0}@keyframes m3tp-fade-in{0%{opacity:0}to{opacity:1}}.m3tp-dialog{-webkit-user-select:none;user-select:none;background:#fff;border-radius:28px;width:320px;padding:24px;animation:.22s cubic-bezier(.34,1.26,.64,1) m3tp-slide-up;box-shadow:0 8px 40px #0000002e}@keyframes m3tp-slide-up{0%{opacity:0;transform:translateY(24px)scale(.96)}to{opacity:1;transform:translateY(0)scale(1)}}.m3tp-header{margin-bottom:20px}.m3tp-label{color:#49454f;letter-spacing:.4px;margin-bottom:10px;font-size:12px;font-weight:500;display:block}.m3tp-display{justify-content:space-around;align-items:center;gap:4px;display:flex}.m3tp-seg{color:#1c1b1f;cursor:pointer;letter-spacing:-1px;background:#ece6f0;border:none;border-radius:12px;justify-content:center;align-items:center;width:80px;height:72px;font-size:32px;font-weight:400;line-height:1;transition:background .15s,color .15s;display:flex}.m3tp-seg.active{color:#fff;background:#8a32fa}.m3tp-seg:hover:not(.active){background:#e0d7f7}.m3tp-colon{color:#1c1b1f;padding:0 2px;font-size:32px;font-weight:300;line-height:1}.m3tp-ampm{border:1px solid #79747e;border-radius:10px;flex-direction:column;flex-shrink:0;height:72px;margin-left:8px;display:flex;overflow:hidden}.m3tp-ampm button{color:#49454f;cursor:pointer;background:0 0;border:none;flex:1;padding:0 14px;font-size:13px;font-weight:500;line-height:1;transition:background .15s,color .15s}.m3tp-ampm button:first-child{border-bottom:1px solid #79747e}.m3tp-ampm button.active{color:#21005d;background:#e8def8}.m3tp-ampm button:hover:not(.active){background:#f3edf7}.m3tp-clock-wrap{justify-content:center;margin-bottom:20px;display:flex}.m3tp-clock{cursor:pointer;touch-action:none;border-radius:50%;display:block}.m3tp-face{fill:#ece6f0}.m3tp-hand{stroke:#8a32fa;stroke-width:2px}.m3tp-center-dot,.m3tp-thumb{fill:#8a32fa}.m3tp-tick{fill:#1c1b1f;cursor:pointer;pointer-events:all;font-size:14px;font-weight:400}.m3tp-tick-active{fill:#fff;font-weight:500}.m3tp-footer{justify-content:flex-end;gap:8px;display:flex}.m3tp-btn{cursor:pointer;letter-spacing:.1px;background:0 0;border:none;border-radius:20px;padding:10px 20px;font-size:14px;font-weight:500;transition:background .15s}.m3tp-cancel{color:#8a32fa}.m3tp-cancel:hover{background:#f3edf7}.m3tp-ok{color:#8a32fa}.m3tp-ok:hover{background:#f3edf7}";
//#endregion
//#region src/MD3TimePicker.jsx
function s({ value: o = null, onChange: s, onClose: c }) {
	let l = o && o.getHours() % 12 || 12, u = o ? o.getMinutes() : 0, d = o && o.getHours() >= 12 ? "PM" : "AM", [f, p] = r("hour"), [m, h] = r(l), [g, _] = r(u), [v, y] = r(d), [b, x] = r(!1), S = n(null), C = t(() => {
		let e = [];
		for (let t = 1; t <= 12; t += 1) e.push(t);
		return e;
	}, []), w = t(() => {
		let e = [];
		for (let t = 0; t < 60; t += 5) e.push(t);
		return e;
	}, []), T = (e, t) => (e / t * 360 - 90 + 360) % 360, E = f === "hour" ? T(m === 12 ? 0 : m, 12) : T(g, 60), D = 110 + Math.cos(E * Math.PI / 180) * 78, O = 110 + Math.sin(E * Math.PI / 180) * 78, k = (e, t, n) => e.map((e) => {
		let r = (e / t * 360 - 90 + 360) % 360 * Math.PI / 180;
		return {
			val: e,
			x: 110 + Math.cos(r) * n,
			y: 110 + Math.sin(r) * n
		};
	}), A = k(C, 12, 78), j = k(w, 60, 78), M = f === "hour" ? m : g, N = e((e) => {
		let t = S.current?.getBoundingClientRect();
		if (!t) return;
		let n = e.touches ? e.touches[0].clientX : e.clientX, r = e.touches ? e.touches[0].clientY : e.clientY, i = t.left + t.width / 2, a = t.top + t.height / 2, o = Math.atan2(r - a, n - i) * 180 / Math.PI + 90;
		if (o < 0 && (o += 360), f === "hour") {
			let e = Math.round(o / 30);
			e === 0 && (e = 12), e > 12 && (e = 12), h(e);
			return;
		}
		let s = Math.round(o / 6);
		s >= 60 && (s = 0), _(s);
	}, [f]);
	return /* @__PURE__ */ i("div", {
		className: "m3tp-overlay",
		onClick: c,
		children: /* @__PURE__ */ a("div", {
			className: "m3tp-dialog",
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
								className: `m3tp-seg${f === "hour" ? " active" : ""}`,
								onClick: () => p("hour"),
								children: String(m).padStart(2, "0")
							}),
							/* @__PURE__ */ i("span", {
								className: "m3tp-colon",
								children: ":"
							}),
							/* @__PURE__ */ i("button", {
								type: "button",
								className: `m3tp-seg${f === "minute" ? " active" : ""}`,
								onClick: () => p("minute"),
								children: String(g).padStart(2, "0")
							}),
							/* @__PURE__ */ a("div", {
								className: "m3tp-ampm",
								children: [/* @__PURE__ */ i("button", {
									type: "button",
									className: v === "AM" ? "active" : "",
									onClick: () => y("AM"),
									children: "AM"
								}), /* @__PURE__ */ i("button", {
									type: "button",
									className: v === "PM" ? "active" : "",
									onClick: () => y("PM"),
									children: "PM"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ i("div", {
					className: "m3tp-clock-wrap",
					children: /* @__PURE__ */ a("svg", {
						ref: S,
						width: 220,
						height: 220,
						className: "m3tp-clock",
						onMouseDown: (e) => {
							e.preventDefault(), x(!0), N(e);
						},
						onMouseMove: (e) => {
							b && N(e);
						},
						onMouseUp: (e) => {
							b && (x(!1), N(e), f === "hour" && setTimeout(() => p("minute"), 150));
						},
						onMouseLeave: () => b && x(!1),
						onTouchStart: (e) => {
							x(!0), N(e);
						},
						onTouchMove: N,
						onTouchEnd: () => {
							x(!1), f === "hour" && setTimeout(() => p("minute"), 150);
						},
						children: [
							/* @__PURE__ */ i("circle", {
								cx: 110,
								cy: 110,
								r: 108,
								className: "m3tp-face"
							}),
							/* @__PURE__ */ i("line", {
								x1: 110,
								y1: 110,
								x2: D,
								y2: O,
								className: "m3tp-hand"
							}),
							/* @__PURE__ */ i("circle", {
								cx: 110,
								cy: 110,
								r: 4,
								className: "m3tp-center-dot"
							}),
							/* @__PURE__ */ i("circle", {
								cx: D,
								cy: O,
								r: 16,
								className: "m3tp-thumb"
							}),
							(f === "hour" ? A : j).map(({ val: e, x: t, y: n }) => /* @__PURE__ */ i("g", { children: /* @__PURE__ */ i("text", {
								x: t,
								y: n,
								textAnchor: "middle",
								dominantBaseline: "central",
								className: `m3tp-tick${e === M ? " m3tp-tick-active" : ""}`,
								onClick: () => {
									if (f === "hour") {
										h(e), setTimeout(() => p("minute"), 150);
										return;
									}
									_(e);
								},
								children: f === "minute" ? String(e).padStart(2, "0") : e
							}) }, e))
						]
					})
				}),
				/* @__PURE__ */ a("div", {
					className: "m3tp-footer",
					children: [/* @__PURE__ */ i("button", {
						type: "button",
						className: "m3tp-btn m3tp-cancel",
						onClick: c,
						children: "Cancel"
					}), /* @__PURE__ */ i("button", {
						type: "button",
						className: "m3tp-btn m3tp-ok",
						onClick: () => {
							let e = m % 12;
							v === "PM" && (e += 12);
							let t = /* @__PURE__ */ new Date();
							t.setHours(e, g, 0, 0), s?.(t);
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
var c = "materialui-react-time-picker-styles";
if (typeof document < "u" && !document.getElementById(c)) {
	let e = document.createElement("style");
	e.id = c, e.textContent = o, document.head.appendChild(e);
}
//#endregion
export { s as default };
