enum MediaSizes {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
}

const mediaQueries: { [size: string]: MediaQueryList } = {
    sm: window.matchMedia('only screen and (min-width: 576px)'),
    md: window.matchMedia('only screen and (min-width: 768px)'),
    lg: window.matchMedia('only screen and (min-width: 992px)'),
    xl: window.matchMedia('only screen and (min-width: 1200px)'),
};

const mediaQueryEvent = (setMediaSize: (mediaSize: MediaSizes) => any) => {
    if (mediaQueries.xl.matches) {
        setMediaSize(MediaSizes.xl);
    } else if (mediaQueries.lg.matches) {
        setMediaSize(MediaSizes.lg);
    } else if (mediaQueries.md.matches) {
        setMediaSize(MediaSizes.md);
    } else if (mediaQueries.sm.matches) {
        setMediaSize(MediaSizes.sm);
    } else {
        setMediaSize(MediaSizes.xs);
    }
};

const isSizeAtLeast = (
    currentSize: MediaSizes,
    atLeastSize: MediaSizes
): boolean => {
    const sizes: { [size: string]: number } = {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
    };
    return sizes[currentSize] >= sizes[atLeastSize];
};

export { MediaSizes };
export { mediaQueries, mediaQueryEvent, isSizeAtLeast };
