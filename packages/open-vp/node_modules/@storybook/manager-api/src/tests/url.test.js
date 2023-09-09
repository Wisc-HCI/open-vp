import qs from 'qs';

import { SET_CURRENT_STORY, GLOBALS_UPDATED, UPDATE_QUERY_PARAMS } from '@storybook/core-events';

import { init as initURL } from '../modules/url';

jest.mock('@storybook/client-logger');
jest.useFakeTimers();

describe('initial state', () => {
  const viewMode = 'story';

  describe('config query parameters', () => {
    it('handles full parameter', () => {
      const navigate = jest.fn();
      const location = { search: qs.stringify({ full: '1' }) };

      const {
        state: { layout },
      } = initURL({ navigate, state: { location } });

      expect(layout).toEqual({ isFullscreen: true });
    });

    it('handles nav parameter', () => {
      const navigate = jest.fn();
      const location = { search: qs.stringify({ nav: '0' }) };

      const {
        state: { layout },
      } = initURL({ navigate, state: { location } });

      expect(layout).toEqual({ showNav: false });
    });

    it('handles shortcuts parameter', () => {
      const navigate = jest.fn();
      const location = { search: qs.stringify({ shortcuts: '0' }) };

      const {
        state: { ui },
      } = initURL({ navigate, state: { location } });

      expect(ui).toEqual({ enableShortcuts: false });
    });

    it('handles panel parameter, bottom', () => {
      const navigate = jest.fn();
      const location = { search: qs.stringify({ panel: 'bottom' }) };

      const {
        state: { layout },
      } = initURL({ navigate, state: { location } });

      expect(layout).toEqual({ panelPosition: 'bottom' });
    });

    it('handles panel parameter, right', () => {
      const navigate = jest.fn();
      const location = { search: qs.stringify({ panel: 'right' }) };

      const {
        state: { layout },
      } = initURL({ navigate, state: { location } });

      expect(layout).toEqual({ panelPosition: 'right' });
    });

    it('handles panel parameter, 0', () => {
      const navigate = jest.fn();
      const location = { search: qs.stringify({ panel: '0' }) };

      const {
        state: { layout },
      } = initURL({ navigate, state: { location } });

      expect(layout).toEqual({ showPanel: false });
    });
  });
});

describe('queryParams', () => {
  it('lets your read out parameters you set previously', () => {
    let state = {};
    const store = {
      setState: (change) => {
        state = { ...state, ...change };
      },
      getState: () => state,
    };
    const fullAPI = { emit: jest.fn() };
    const { api } = initURL({
      state: { location: { search: '' } },
      navigate: jest.fn(),
      store,
      fullAPI,
    });

    api.setQueryParams({ foo: 'bar' });

    expect(api.getQueryParam('foo')).toEqual('bar');
    expect(fullAPI.emit).toHaveBeenCalledWith(UPDATE_QUERY_PARAMS, { foo: 'bar' });
  });
});

describe('initModule', () => {
  const store = {
    state: {},
    getState() {
      return this.state;
    },
    setState(value) {
      this.state = { ...this.state, ...value };
    },
  };
  const storyState = (storyId) => ({
    path: `/story/${storyId}`,
    storyId,
    viewMode: 'story',
  });

  const fullAPI = {
    callbacks: {},
    on(event, fn) {
      this.callbacks[event] = this.callbacks[event] || [];
      this.callbacks[event].push(fn);
    },
    emit(event, ...args) {
      this.callbacks[event]?.forEach((cb) => cb(...args));
    },
    showReleaseNotesOnLaunch: jest.fn(),
  };

  beforeEach(() => {
    store.state = {};
    fullAPI.callbacks = {};
  });

  it('updates args param on SET_CURRENT_STORY', async () => {
    store.setState(storyState('test--story'));

    const navigate = jest.fn();

    const { api, init } = initURL({ store, state: { location: {} }, navigate, fullAPI });
    Object.assign(fullAPI, api, {
      getCurrentStoryData: () => ({
        type: 'story',
        args: { a: 1, b: 2 },
        initialArgs: { a: 1, b: 1 },
        isLeaf: true,
      }),
    });
    init();

    fullAPI.emit(SET_CURRENT_STORY);
    expect(navigate).toHaveBeenCalledWith(
      '/story/test--story&args=b:2',
      expect.objectContaining({ replace: true })
    );
    expect(store.getState().customQueryParams).toEqual({ args: 'b:2' });
  });

  it('updates globals param on GLOBALS_UPDATED', async () => {
    store.setState(storyState('test--story'));

    const navigate = jest.fn();

    const { api, init } = initURL({ store, state: { location: {} }, navigate, fullAPI });
    Object.assign(fullAPI, api);
    init();

    fullAPI.emit(GLOBALS_UPDATED, { globals: { a: 2 }, initialGlobals: { a: 1, b: 1 } });
    expect(navigate).toHaveBeenCalledWith(
      '/story/test--story&globals=a:2;b:!undefined',
      expect.objectContaining({ replace: true })
    );
    expect(store.getState().customQueryParams).toEqual({ globals: 'a:2;b:!undefined' });
  });

  it('adds url params alphabetically', async () => {
    store.setState({ ...storyState('test--story'), customQueryParams: { full: 1 } });
    const navigate = jest.fn();

    const { api, init } = initURL({ store, state: { location: {} }, navigate, fullAPI });
    Object.assign(fullAPI, api, {
      getCurrentStoryData: () => ({ type: 'story', args: { a: 1 }, isLeaf: true }),
    });
    init();

    fullAPI.emit(GLOBALS_UPDATED, { globals: { g: 2 } });
    expect(navigate).toHaveBeenCalledWith(
      '/story/test--story&full=1&globals=g:2',
      expect.objectContaining({ replace: true })
    );

    fullAPI.emit(SET_CURRENT_STORY);
    expect(navigate).toHaveBeenCalledWith(
      '/story/test--story&args=a:1&full=1&globals=g:2',
      expect.objectContaining({ replace: true })
    );
  });

  it('navigates to release notes when needed', () => {
    fullAPI.showReleaseNotesOnLaunch.mockReturnValueOnce(true);

    const navigate = jest.fn();
    initURL({ store, state: { location: {} }, navigate, fullAPI }).init();

    expect(navigate).toHaveBeenCalledWith('/settings/release-notes');
  });
});
