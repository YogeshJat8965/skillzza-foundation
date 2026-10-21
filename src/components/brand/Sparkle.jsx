export default function Sparkle({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 1.5c.5 4.9 2.6 7 7.5 7.5v.01c-4.9.5-7 2.6-7.5 7.5h-.01c-.5-4.9-2.6-7-7.5-7.5V9c4.9-.5 7-2.6 7.5-7.5Z"
        transform="translate(0 3)"
      />
    </svg>
  );
}
