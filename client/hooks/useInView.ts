import { useEffect, useRef, useState } from 'react';
import { InViewHookResponse, IntersectionOptions } from '../utils/types';
import { observe } from '../utils/observe';

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export function useInView({
  threshold,
  delay,
  trackVisibility,
  rootMargin,
  root,
  triggerOnce,
  skip,
  initialInView,
  fallbackInView,
  onChange,
}: IntersectionOptions = {}): InViewHookResponse {
  const [ref, setRef] = useState<Element | null>(null);
  const callback = useRef<IntersectionOptions['onChange']>();
  const [state, setState] = useState<State>({
    inView: !!initialInView,
    entry: undefined,
  });

  // Store the onChange callback in a `ref`, so we can access the latest instance
  // inside the `useEffect`, but without triggering a rerender.
  callback.current = onChange;

  useEffect(
    () => {
      if (skip || !ref) return;

      let unobserve: (() => void) | undefined;
      unobserve = observe(
        ref,
        (inView, entry) => {
          setState({
            inView,
            entry,
          });
          if (callback.current) callback.current(inView, entry);

          if (entry.isIntersecting && triggerOnce && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        },
        {
          root,
          rootMargin,
          threshold,
          // @ts-ignore
          trackVisibility,
          delay,
        },
        fallbackInView
      );

      return () => {
        if (unobserve) {
          unobserve();
        }
      };
    },
    // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // If the threshold is an array, convert it to a string, so it won't change between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Array.isArray(threshold) ? threshold.toString() : threshold,
      ref,
      root,
      rootMargin,
      triggerOnce,
      skip,
      trackVisibility,
      fallbackInView,
      delay,
    ]
  );

  const entryTarget = state.entry?.target;
  const previousEntryTarget = useRef<Element>();
  if (
    !ref &&
    entryTarget &&
    !triggerOnce &&
    !skip &&
    previousEntryTarget.current !== entryTarget
  ) {
    previousEntryTarget.current = entryTarget;
    setState({
      inView: !!initialInView,
      entry: undefined,
    });
  }

  const result = [setRef, state.inView, state.entry] as InViewHookResponse;

  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];

  return result;
}
