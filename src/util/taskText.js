// Thrive task descriptions in the catalog carry a little legacy HTML, e.g.
// "Hours of sleep <br /><small>(1 - 12 hours)</small>". Rendering that string as-is shows
// the literal tags. Split on <br> and strip every other tag so it can be rendered as
// plain text: the first line is the label, anything after a <br> is a small note.
const stripTags = (s) => s.replace(/<[^>]*>/g, '').trim();

export const splitTaskDescription = (description) => {
  if (!description) return { label: '', note: '' };
  const [label, ...rest] = String(description).split(/<br\s*\/?>/i);
  return {
    label: stripTags(label),
    note: rest.map(stripTags).filter(Boolean).join(' '),
  };
};
