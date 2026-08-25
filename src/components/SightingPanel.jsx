export function SightingPanel({ sighting, onClose }) {
  if (!sighting) return null;

  return (
    <aside className="sighting-panel" aria-label={`${sighting.species} sighting`}>
      <button className="panel-close" type="button" onClick={onClose} aria-label="Close sighting">
        ×
      </button>
      <div className="sighting-image" data-has-image={Boolean(sighting.image)}>
        {sighting.image ? (
          <img src={sighting.image} alt={`${sighting.species} at ${sighting.title}`} />
        ) : (
          <div className="image-placeholder" aria-hidden="true">
            <span>Field photo pending</span>
          </div>
        )}
        <span className="sighting-index">Sighting 01</span>
      </div>
      <div className="sighting-copy">
        <p className="eyebrow">{sighting.place}</p>
        <h2>{sighting.title}</h2>
        <p className="species-name">{sighting.species}</p>
        <p className="scientific-name">{sighting.scientificName}</p>
        <div className="field-rule" />
        <p className="field-note">{sighting.note}</p>
        <dl>
          <div>
            <dt>Observed</dt>
            <dd>{sighting.observedOn}</dd>
          </div>
          <div>
            <dt>Record</dt>
            <dd>Prototype data</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
