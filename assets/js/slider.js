! function() {
    "use strict";
    var t = function(t) {
        this.input = null, this.inputDisplay = null, this.slider = null, this.sliderWidth = 0, this.sliderLeft = 0, this.pointerWidth = 0, this.pointerR = null, this.pointerL = null, this.activePointer = null, this.selected = null, this.scale = null, this.step = 0, this.tipL = null, this.tipR = null, this.timeout = null, this.valRange = !1, this.values = {
            start: null,
            end: null
        }, this.conf = {
            target: null,
            values: null,
            set: null,
            range: !1,
            width: null,
            scale: !0,
            labels: !0,
            tooltip: !0,
            step: null,
            disabled: !1,
            onChange: null
        }, this.cls = {
            container: "rs-container",
            background: "rs-bg",
            selected: "rs-selected",
            pointer: "rs-pointer",
            scale: "rs-scale",
            noscale: "rs-noscale",
            tip: "rs-tooltip"
        };
        for (var i in this.conf) t.hasOwnProperty(i) && (this.conf[i] = t[i]);
        this.init()
    };
    t.prototype.init = function() {
        return "object" == typeof this.conf.target ? this.input = this.conf.target : this.input = document.getElementById(this.conf.target.replace("#", "")), this.input ? (this.inputDisplay = getComputedStyle(this.input, null).display, this.input.style.display = "none", this.valRange = !(this.conf.values instanceof Array), !this.valRange || this.conf.values.hasOwnProperty("min") && this.conf.values.hasOwnProperty("max") ? this.createSlider() : console.log("Missing min or max value...")) : console.log("Cannot find target element...")
    }, t.prototype.createSlider = function() {
        return this.slider = i("div", this.cls.container), this.slider.innerHTML = '<div class="rs-bg"></div>', this.selected = i("div", this.cls.selected), this.pointerL = i("div", this.cls.pointer, ["dir", "left"]), this.scale = i("div", this.cls.scale), this.conf.tooltip && (this.tipL = i("div", this.cls.tip), this.tipR = i("div", this.cls.tip), this.pointerL.appendChild(this.tipL)), this.slider.appendChild(this.selected), this.slider.appendChild(this.scale), this.slider.appendChild(this.pointerL), this.conf.range && (this.pointerR = i("div", this.cls.pointer, ["dir", "right"]), this.conf.tooltip && this.pointerR.appendChild(this.tipR), this.slider.appendChild(this.pointerR)), this.input.parentNode.insertBefore(this.slider, this.input.nextSibling), this.conf.width && (this.slider.style.width = parseInt(this.conf.width) + "px"), this.sliderLeft = this.slider.getBoundingClientRect().left, this.sliderWidth = this.slider.clientWidth, this.pointerWidth = this.pointerL.clientWidth, this.conf.scale || this.slider.classList.add(this.cls.noscale), this.setInitialValues()
    }, t.prototype.setInitialValues = function() {
        if (this.disabled(this.conf.disabled), this.valRange && (this.conf.values = s(this.conf)), this.values.start = 0, this.values.end = this.conf.range ? this.conf.values.length - 1 : 0, this.conf.set && this.conf.set.length && n(this.conf)) {
            var t = this.conf.set;
            this.conf.range ? (this.values.start = this.conf.values.indexOf(t[0]), this.values.end = this.conf.set[1] ? this.conf.values.indexOf(t[1]) : null) : this.values.end = this.conf.values.indexOf(t[0])
        }
        return this.createScale()
    }, t.prototype.createScale = function(t) {
        this.step = this.sliderWidth / (this.conf.values.length - 1);
        for (var e = 0, s = this.conf.values.length; e < s; e++) {
            var n = i("span"),
                l = i("ins");
            n.appendChild(l), this.scale.appendChild(n), n.style.width = e === s - 1 ? 0 : this.step + "px", this.conf.labels ? l.innerHTML = this.conf.values[e] : 0 !== e && e !== s - 1 || (l.innerHTML = this.conf.values[e]), l.style.marginLeft = l.clientWidth / 2 * -1 + "px"
        }
        return this.addEvents()
    }, t.prototype.updateScale = function() {
        this.step = this.sliderWidth / (this.conf.values.length - 1);
        for (var t = this.slider.querySelectorAll("span"), i = 0, e = t.length; i < e; i++) t[i].style.width = this.step + "px";
        return this.setValues()
    }, t.prototype.addEvents = function() {
        var t = this.slider.querySelectorAll("." + this.cls.pointer),
            i = this.slider.querySelectorAll("span");
        e(document, "mousemove touchmove", this.move.bind(this)), e(document, "mouseup touchend touchcancel", this.drop.bind(this));
        for (var s = 0, n = t.length; s < n; s++) e(t[s], "mousedown touchstart", this.drag.bind(this));
        for (var s = 0, n = i.length; s < n; s++) e(i[s], "click", this.onClickPiece.bind(this));
        return window.addEventListener("resize", this.onResize.bind(this)), this.setValues()
    }, t.prototype.drag = function(t) {
        if (t.preventDefault(), !this.conf.disabled) {
            var i = t.target.getAttribute("data-dir");
            return "left" === i && (this.activePointer = this.pointerL), "right" === i && (this.activePointer = this.pointerR), this.slider.classList.add("sliding")
        }
    }, t.prototype.move = function(t) {
        if (this.activePointer && !this.conf.disabled) {
            var i = ("touchmove" === t.type ? t.touches[0].clientX : t.pageX) - this.sliderLeft - this.pointerWidth / 2;
            return (i = Math.round(i / this.step)) <= 0 && (i = 0), i > this.conf.values.length - 1 && (i = this.conf.values.length - 1), this.conf.range ? (this.activePointer === this.pointerL && (this.values.start = i), this.activePointer === this.pointerR && (this.values.end = i)) : this.values.end = i, this.setValues()
        }
    }, t.prototype.drop = function() {
        this.activePointer = null
    }, t.prototype.setValues = function(t, i) {
        var e = this.conf.range ? "start" : "end";
        return t && this.conf.values.indexOf(t) > -1 && (this.values[e] = this.conf.values.indexOf(t)), i && this.conf.values.indexOf(i) > -1 && (this.values.end = this.conf.values.indexOf(i)), this.conf.range && this.values.start > this.values.end && (this.values.start = this.values.end), this.pointerL.style.left = this.values[e] * this.step - this.pointerWidth / 2 + "px", this.conf.range ? (this.conf.tooltip && (this.tipL.innerHTML = this.conf.values[this.values.start], this.tipR.innerHTML = this.conf.values[this.values.end]), this.input.value = this.conf.values[this.values.start] + "," + this.conf.values[this.values.end], this.pointerR.style.left = this.values.end * this.step - this.pointerWidth / 2 + "px") : (this.conf.tooltip && (this.tipL.innerHTML = this.conf.values[this.values.end]), this.input.value = this.conf.values[this.values.end]), this.values.end > this.conf.values.length - 1 && (this.values.end = this.conf.values.length - 1), this.values.start < 0 && (this.values.start = 0), this.selected.style.width = (this.values.end - this.values.start) * this.step + "px", this.selected.style.left = this.values.start * this.step + "px", this.onChange()
    }, t.prototype.onClickPiece = function(t) {
        if (!this.conf.disabled) {
            var i = Math.round((t.clientX - this.sliderLeft) / this.step);
            return i > this.conf.values.length - 1 && (i = this.conf.values.length - 1), i < 0 && (i = 0), this.conf.range && i - this.values.start <= this.values.end - i ? this.values.start = i : this.values.end = i, this.slider.classList.remove("sliding"), this.setValues()
        }
    }, t.prototype.onChange = function() {
        var t = this;
        this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
            if (t.conf.onChange && "function" == typeof t.conf.onChange) return t.conf.onChange(t.input.value)
        }, 500)
    }, t.prototype.onResize = function() {
        return this.sliderLeft = this.slider.getBoundingClientRect().left, this.sliderWidth = this.slider.clientWidth, this.updateScale()
    }, t.prototype.disabled = function(t) {
        this.conf.disabled = t, this.slider.classList[t ? "add" : "remove"]("disabled")
    }, t.prototype.getValue = function() {
        return this.input.value
    }, t.prototype.destroy = function() {
        this.input.style.display = this.inputDisplay, this.slider.remove()
    };
    var i = function(t, i, e) {
            var s = document.createElement(t);
            return i && (s.className = i), e && 2 === e.length && s.setAttribute("data-" + e[0], e[1]), s
        },
        e = function(t, i, e) {
            for (var s = i.split(" "), n = 0, l = s.length; n < l; n++) t.addEventListener(s[n], e)
        },
        s = function(t) {
            var i = [],
                e = t.values.max - t.values.min;
            if (!t.step) return console.log("No step defined..."), [t.values.min, t.values.max];
            for (var s = 0, n = e / t.step; s < n; s++) i.push(t.values.min + s * t.step);
            return i.indexOf(t.values.max) < 0 && i.push(t.values.max), i
        },
        n = function(t) {
            return !t.set || t.set.length < 1 ? null : t.values.indexOf(t.set[0]) < 0 ? null : !t.range || !(t.set.length < 2 || t.values.indexOf(t.set[1]) < 0) || null
        };
    window.rSlider = t
}();