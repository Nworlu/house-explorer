export function SearchField() {
  return <form className="m-search" action="#properties"><label className="sr-only" htmlFor="property-search">Search properties or locations</label><input id="property-search" name="q" placeholder="Search properties or locations" /><button type="submit" aria-label="Search">⌕</button></form>;
}
