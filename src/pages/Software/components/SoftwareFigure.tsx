type SoftwareFigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  priority?: boolean;
};

/** Captura de producto con su epígrafe: el pie explica qué se está viendo. */
const SoftwareFigure = ({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: SoftwareFigureProps) => (
  <figure className="software-figure">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
    <figcaption className="software-figure__caption">{caption}</figcaption>
  </figure>
);

export default SoftwareFigure;
