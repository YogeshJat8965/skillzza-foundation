import images from '../../data/images.generated.json';

// Responsive AVIF/WebP picture with a blurred placeholder underneath while it loads.
export default function Photo({ id, sizes = '100vw', className = '', imgClassName = '', priority = false, alt, focus }) {
  const img = images[id];
  const srcSet = (format) => img.widths.map((w) => `/images/${id}-${w}.${format} ${w}w`).join(', ');
  const fallback = img.widths.includes(800) ? 800 : img.widths.at(-1);
  const position = focus ?? img.focus;
  return (
    <picture className={`block h-full w-full ${className}`}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/images/${id}-${fallback}.webp`}
        width={img.width}
        height={img.height}
        alt={alt ?? img.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{
          objectPosition: position,
          backgroundImage: `url(${img.lqip})`,
          backgroundSize: 'cover',
          backgroundPosition: position,
        }}
      />
    </picture>
  );
}
