class Overlay {
	overlayElem = document.createElement("div");
	private _visible = false;
	get visible(): boolean {
		return this._visible;
	}
	constructor(
		private modName: string,
		private htmlFile: string,
		x: number,
		y: number,
		z: number,
		width: string,
		height: string,
		private toggalable: false | string,
	) {
		if (this.toggalable) {
			this.overlayElem.style.display = "none";
			this.bindToKey(this.toggalable);
		}
		this.overlayElem.style.width = width;
		this.overlayElem.style.height = height;
		this.overlayElem.style.padding = "0";
		this.overlayElem.style.margin = "0";
		this.overlayElem.style.top = `${y}px`;
		this.overlayElem.style.left = `${x}px`;
		this.overlayElem.style.position = "absolute";
		this.overlayElem.style.overflow = "hidden";
		this.overlayElem.style.zIndex = z.toString();
		this.overlayElem.style.border = "none";

		document.body.appendChild(this.overlayElem);
	}
	toggle = () => {
		if (this.visible) {
			this._visible = false;
			this.overlayElem.style.display = "none";
			window.focus();
		} else {
			this._visible = true;
			this.overlayElem.style.display = "block";
		}
	};
	bindToKey = (key: string) => {
		document.addEventListener("keypress", (event) => {
			if (event.key !== key) return;
			this.toggle();
		});
		return this;
	};
	render = async (fn?: VoidFunction) => {
		await fetch(
			`http://localhost:5131/mods/${this.modName}/assets/${this.htmlFile}`,
		)
			.then((res) => res.text())
			.then((html) => {
				this.overlayElem.innerHTML = html;
			});
		if (fn) fn();
	};
}
