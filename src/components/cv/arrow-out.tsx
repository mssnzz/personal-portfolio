/** The outbound arrow shared by every card that leaves the site. */
export function ArrowOut() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M4 12L12 4M12 4H6M12 4v6" />
    </svg>
  );
}
