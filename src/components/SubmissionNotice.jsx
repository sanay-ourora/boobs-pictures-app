export function SubmissionNotice({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="notice-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="submission-notice"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="notice-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <p className="eyebrow">Submissions are next</p>
        <h2 id="submission-title">The map is taking shape.</h2>
        <p>
          Accounts, photo uploads, location privacy, and moderation will arrive in the next build.
        </p>
        <button type="button" className="text-action" onClick={onClose}>
          Back to the field map
        </button>
      </section>
    </div>
  );
}
