import React from 'react'

// This is a private, not intended for use except by the Select
// component for wrapping Options (TODO: Make into a HOC for giggles?)
export const OptionWrapper = (props) => {
  const { onMouseOver, onClick, selectedKey, highlightedKey, children,
          optionKey, label, value, optionId, disabled, ...others } = props
  const highlighted = optionKey === highlightedKey
  const selected = optionKey === selectedKey
  const classes =
    `${highlighted ? 'ReactA11ySelect__ul__li--highlighted' : ''}
     ${selected ? 'ReactA11ySelect__ul__li--selected' : 'ReactA11ySelect__ul__li--unselected'}
     ${disabled ? 'ReactA11ySelect__ul__li--disabled' : ''}`
  const ariaLabel = label || value
  return (
    <li
      id={optionId}
      onMouseOver={disabled ? undefined : onMouseOver}
      onClick={disabled ? undefined : onClick}
      className={`ReactA11ySelect__ul__li ${classes}`}
      aria-checked={selected ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      aria-label={ariaLabel}
      role="menuitemradio"
      {...others}
    >
      {selected &&
        <span className="ReactA11ySelect__ul__li__selected-indicator" aria-hidden="true"/>}
      {children}
    </li>
  )
}

export default OptionWrapper