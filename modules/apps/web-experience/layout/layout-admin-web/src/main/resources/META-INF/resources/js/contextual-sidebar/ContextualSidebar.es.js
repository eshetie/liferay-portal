import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './ContextualSidebar.soy';

/**
 * ContextualSidebar
 */
class ContextualSidebar extends Component {
	/**
	 * @inheritDoc
	 */
	created() {
		document.body.classList.add('has-contextual-sidebar');

		this._productMenuToggle = $('.product-menu-toggle');
		this._productMenu = $(this._productMenuToggle.data('target'));

		this._handleOpenProductMenu = this._handleOpenProductMenu.bind(this);

		this._productMenu.on('openStart.lexicon.sidenav', this._handleOpenProductMenu);
	}

	/**
	 * @inheritDoc
	 */
	disposed() {
		document.body.classList.remove('has-contextual-sidebar');

		this._productMenu.off('openStart.lexicon.sidenav', this._handleOpenProductMenu);
	}

	/**
	 * Disallow setting element display to none
	 * @inheritDoc
	 */
	syncVisible() {
	}

	/**
	 * @inheritDoc
	 */
	rendered() {
		if (this.visible) {
			document.body.classList.add('contextual-sidebar-visible');

			this._productMenuToggle.sideNavigation('hide');
		} else {
			document.body.classList.remove('contextual-sidebar-visible');
		}
	}

	/**
	 * Handle product menu's show event and emits a hide event.
	 * Components using ContextualSidebar should change it's visible
	 * property at this point.
	 * @private
	 */
	_handleOpenProductMenu() {
		this.emit('hide');
	}
}

/**
 * State definition.
 * @type {!Object}
 * @static
 */
ContextualSidebar.STATE = {
	/**
	 * Sidebar body content
	 * @default undefined
	 * @instance
	 * @memberOf ContextualSidebar
	 * @type {!string}
	 */
	body: Config.func().required(),

	/**
	 * Sidebar header content
	 * @default undefined
	 * @instance
	 * @memberOf ContextualSidebar
	 * @type {!string}
	 */
	header: Config.func().required(),

	/**
	 * Autogenerated id provided by the template engine
	 * @default ''
	 * @instance
	 * @memberOf ContextualSidebar
	 * @type {string}
	 */
	id: Config.string().value(''),

	/**
	 * Allow opening/closing contextual sidebar
	 * @default undefined
	 * @instance
	 * @memberOf ContextualSidebar
	 * @type {!boolean}
	 */
	visible: Config.bool().required(),

	/**
	 * Internal property that keeps an existing ProductMenu sidebar synced.
	 * @default undefined
	 * @instance
	 * @memberOf ContextualSidebar
	 * @type {object}
	 */
	_productMenu: Config.internal(),
};

Soy.register(ContextualSidebar, templates);

export {ContextualSidebar};
export default ContextualSidebar;
