export type ObserverInstanceCallback = (
  inView: boolean,
  entry: IntersectionObserverEntry
) => void;

export interface IntersectionOptions extends IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  skip?: boolean;
  initialInView?: boolean;
  fallbackInView?: boolean;
  trackVisibility?: boolean;
  delay?: number;
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
}

export type InViewHookResponse = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined
] & {
  ref: (node?: Element | null) => void;
  inView: boolean;
  entry?: IntersectionObserverEntry;
};
