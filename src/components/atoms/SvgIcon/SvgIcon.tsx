import { memo } from 'react';
import './SvgIcon.css';

interface SvgIconType {
  prefix?: string;
  name: string;
  color?: string;
  className?: string;
}

const SvgIcon = memo((props: SvgIconType) => {
  const { prefix = 'icon', name, color = '#333', className = '' } = props;
  return (
    <span className={`svg-icon ${className}`}>
      <svg className="svg" aria-hidden={true}>
        <use xlinkHref={`#${prefix}-${name}`} fill={color} />
      </svg>
    </span>
  );
});

export default SvgIcon;
