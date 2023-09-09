import { themes } from '@storybook/theming';
import { init as initLayout } from '../modules/layout';

let layoutApi;
let store;
let provider;
let currentState;

beforeEach(() => {
  currentState = {
    ui: {
      enableShortcuts: true,
    },
    layout: {
      showToolbar: true,
      isFullscreen: false,
      showPanel: true,
      showNav: true,
      panelPosition: 'bottom',
    },
    selectedPanel: 'storybook/actions/panel',
    theme: themes.light,
  };
  store = {
    getState: () => currentState,
    setState: jest.fn((patch) => {
      currentState = {
        ...currentState,
        ...(typeof patch === 'function' ? patch(currentState) : patch),
      };
    }),
  };
  provider = { getConfig: jest.fn(() => ({})) };
  layoutApi = initLayout({ store, provider }).api;
});

describe('layout API', () => {
  describe('toggleFullscreen', () => {
    it('should toggle isFullscreen', () => {
      currentState.layout.isFullscreen = false;
      layoutApi.toggleFullscreen();
      expect(currentState.layout.isFullscreen).toBe(true);
      layoutApi.toggleFullscreen();
      expect(currentState.layout.isFullscreen).toBe(false);
      layoutApi.toggleFullscreen(false);
      expect(currentState.layout.isFullscreen).toBe(false);
      layoutApi.toggleFullscreen(true);
      expect(currentState.layout.isFullscreen).toBe(true);
    });

    it('should not affect nav or panel state when enabling fullscreen', () => {
      currentState.layout.isFullscreen = false;
      layoutApi.toggleFullscreen();
      expect(currentState.layout.showNav).toBe(true);
      expect(currentState.layout.showNav).toBe(true);
    });

    it('should enable nav when exiting fullscreen', () => {
      currentState.layout.isFullscreen = true;
      currentState.layout.showNav = false;
      layoutApi.toggleFullscreen();
      expect(currentState.layout).toEqual(
        expect.objectContaining({
          isFullscreen: false,
          showPanel: true,
          showNav: true,
        })
      );
    });

    describe('singleStory=true', () => {
      beforeEach(() => {
        layoutApi = initLayout({ store, provider, singleStory: true }).api;
      });

      it('should NOT enable nav when exiting fullscreen', () => {
        currentState.layout.showNav = false;
        layoutApi.toggleFullscreen();
        expect(currentState.layout).toEqual(
          expect.objectContaining({
            isFullscreen: true,
            showPanel: true,
            showNav: false,
          })
        );
      });
    });
  });

  describe('toggleNav', () => {
    it('should toggle showNav', () => {
      currentState.layout.showNav = true;
      layoutApi.toggleNav();
      expect(currentState.layout.showNav).toBe(false);
      layoutApi.toggleNav();
      expect(currentState.layout.showNav).toBe(true);
      layoutApi.toggleNav(true);
      expect(currentState.layout.showNav).toBe(true);
      layoutApi.toggleNav(false);
      expect(currentState.layout.showNav).toBe(false);
    });

    describe('singleStory=true', () => {
      beforeEach(() => {
        layoutApi = initLayout({ store, provider, singleStory: true }).api;
      });

      it('should NOT toggle showNav', () => {
        currentState.layout.showNav = false;
        layoutApi.toggleNav();
        expect(currentState.layout.showNav).toBe(false);
        layoutApi.toggleNav(true);
        expect(currentState.layout.showNav).toBe(false);
      });
    });
  });

  describe('setOptions', () => {
    const getLastSetStateArgs = () => {
      const { calls } = store.setState.mock;
      return calls[calls.length - 1];
    };

    it('should not change selectedPanel if it is undefined in the options', () => {
      layoutApi.setOptions({});

      expect(getLastSetStateArgs()).toBeUndefined();
    });

    it('should not change selectedPanel if it is undefined in the options, but something else has changed', () => {
      layoutApi.setOptions({ panelPosition: 'right' });

      expect(getLastSetStateArgs()[0].selectedPanel).toBeUndefined();
    });

    it('should not change selectedPanel if it is currently the same', () => {
      const panelName = currentState.selectedPanel;
      layoutApi.setOptions({});
      // second call is needed to overwrite initial layout
      layoutApi.setOptions({ selectedPanel: panelName });

      expect(getLastSetStateArgs()).toBeUndefined();
    });

    it('should not change selectedPanel if it is currently the same, but something else has changed', () => {
      layoutApi.setOptions({});
      // second call is needed to overwrite initial layout
      layoutApi.setOptions({ panelPosition: 'right', selectedPanel: currentState.selectedPanel });

      expect(getLastSetStateArgs()[0].selectedPanel).toBeUndefined();
    });

    it('should set selectedPanel initially', () => {
      const panelName = 'storybook/a11y/panel';
      layoutApi.setOptions({ selectedPanel: panelName });

      expect(getLastSetStateArgs()[0].selectedPanel).toEqual(panelName);
    });

    it('should change selectedPanel if it is defined in the options and is different', () => {
      const panelName = 'storybook/a11y/panel';
      layoutApi.setOptions({});
      layoutApi.setOptions({ selectedPanel: panelName });

      expect(getLastSetStateArgs()[0].selectedPanel).toEqual(panelName);
    });
  });
});
