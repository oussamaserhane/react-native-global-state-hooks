import React, { useCallback } from 'react';
import * as IGlobalState from '../src/GlobalStoreTypes';
import {
  useCountStore, useCountPercist, useCountWithActions, useCountWithActionsTyped, useCountWithActionsPersisted,
} from './hooks';

export const StageTitle = ({ title }: { title: string }) => <h1>{title}</h1>;

export default StageTitle;

export interface ICountActionsConfig extends IGlobalState.IActionCollectionConfig<number> {
  decrease: (decrease: number) => (setter: IGlobalState.StateSetter<number>, state: number) => Promise<void>,
  increase: (increase: number) => (setter: IGlobalState.StateSetter<number>, state: number) => Promise<void>,
}

export interface ICountActions extends IGlobalState.IActionCollectionResult {
  decrease: (decrease: number) => Promise<void>,
  increase: (increase: number) => Promise<void>,
}

export const useCountHooks = () => {
  const [count, setCount] = useCountStore();
  const [countPersisted, setCountPersisted] = useCountPercist();
  const [countWithActions, actionsCountWithActions] = useCountWithActions();
  const [countWithActionsTyped, actionsCountWithActionsTyped] = useCountWithActionsTyped();
  const [countWithActionsPersisted, actionsCountWithActionsPersisted] = useCountWithActionsPersisted();

  const onPressCount = useCallback(() => {
    setCount((_count) => _count + 1);
  }, []);
  const onPressCountPersisted = useCallback(() => setCountPersisted((_countP) => _countP + 1), []);
  const onPressCountWithActions = useCallback(() => actionsCountWithActions.increase(2), []);
  const onPressCountWithActionsTyped = useCallback(() => actionsCountWithActionsTyped.increase(1), []);
  const onPressCountWithActionsPersisted = useCallback(() => actionsCountWithActionsPersisted.increase(1), []);

  return {
    count,
    countPersisted,
    countWithActions,
    countWithActionsPersisted,
    countWithActionsTyped,
    onPressCount,
    onPressCountPersisted,
    onPressCountWithActions,
    onPressCountWithActionsPersisted,
    onPressCountWithActionsTyped,
  };
};
