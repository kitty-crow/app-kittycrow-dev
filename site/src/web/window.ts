import { mountWindow, type WindowHandle } from "../../../vendor/website/src/window.ts";

const launcher = "/assets/website/images/miku.svg";

export function mountAppWindow(frame: HTMLElement, id: string, title: string): WindowHandle {
  const dock = document.getElementById("window-dock");

  return mountWindow(frame, {
    id,
    title,
    mountTarget: dock instanceof HTMLElement ? dock : frame.parentElement,
    floatMntTrgt: document.body,
    launcherSrc: launcher,
    initFloat: false,
    showCloseBttn: true,
    showMiniBttn: true,
    showFloatBttn: true
  });
}
