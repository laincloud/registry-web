'use strict';

import Elm from './Main.elm';
import './main.scss';

window.mdc.autoInit();
let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
document.querySelector('.menu').addEventListener('click', () => drawer.open = true);
Elm.Main.embed(document.getElementById('main'));
