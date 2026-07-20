// The strict application resolver does not do app-tree merging, so the
// store service ember-data would normally provide via its app re-exports
// is registered explicitly here.
export { default } from 'ember-data/store';
