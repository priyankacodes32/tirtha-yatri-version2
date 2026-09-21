import { forwardRef } from 'react';
import styles from './Button.module.css';

/**
 * Shared button — functional admin variant of the client's Button (no
 * framer-motion, no Link support; admin navigation goes through the sidebar).
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', icon: Icon, iconPosition = 'left', className = '', children, ...rest },
  ref
) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={classes} {...rest}>
      {Icon && iconPosition === 'left' && <Icon size={16} aria-hidden="true" />}
      {children && <span>{children}</span>}
      {Icon && iconPosition === 'right' && <Icon size={16} aria-hidden="true" />}
    </button>
  );
});

export default Button;
