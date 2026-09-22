export default function Square({ value, onClick, isWinning, disabled }) {
  return (
    <button
      className={`square${isWinning ? ' square--winning' : ''}${value ? ` square--${value}` : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={value ? `Square filled with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}
