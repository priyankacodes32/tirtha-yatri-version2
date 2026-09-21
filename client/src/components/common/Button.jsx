import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * Shared CTA button. Renders a react-router <Link> when `to` is given,
 * an <a> when `href` is given, otherwise a plain <button>.
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, icon: Icon, iconPosition = 'right', className = '', children, ...rest },
  ref
) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={18} aria-hidden="true" />}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { duration: 0.15 },
  };

  if (to) {
    return (
      <motion.span {...motionProps} style={{ display: 'inline-block' }}>
        <Link ref={ref} to={to} className={classes} {...rest}>
          {content}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    return (
      <motion.a ref={ref} href={href} className={classes} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} className={classes} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
});

export default Button;
