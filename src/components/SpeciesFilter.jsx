export function SpeciesFilter({ options, selected, onChange }) {
  return (
    <div className="species-filter" aria-label="Filter sightings by species">
      <span className="filter-label">Showing</span>
      <select
        aria-label="Species"
        value={selected}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="select-arrow" aria-hidden="true">↓</span>
    </div>
  );
}
