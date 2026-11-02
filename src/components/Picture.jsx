/**
 * Bild-Wrapper mit srcset/sizes, fixem Seitenverhältnis (kein CLS)
 * und der einheitlichen Dark-Industrial-Gradierung.
 */
export default function Picture({
  src,           // { w1600, w2560 }
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  grade = 'graded',
}) {
  return (
    <img
      src={src.w1600}
      srcSet={`${src.w1600} 1600w, ${src.w2560} 2560w`}
      sizes={sizes}
      alt={alt}
      width={2560}
      height={1920}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`${grade} ${className} ${imgClassName}`}
    />
  )
}
