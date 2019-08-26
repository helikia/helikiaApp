export const singleDocumentResolver = (key, loader, fallback) => (
  ({ [key]: objectId, [fallback]: fallbackValue = null }, _, { loaders }) => (
    objectId
      ? loaders[loader].load(objectId)
      : fallbackValue
  )
);

export const multipleDocumentResolver = (key, loader) => ({ [key]: objectIds }, _, { loaders }) => (
  objectIds && Array.isArray(objectIds) && objectIds.length > 0
    ? loaders[loader].loadMany(objectIds)
    : []
);

export const company = singleDocumentResolver('companyId', 'companyLoader');

export const owner = singleDocumentResolver('ownerId', 'userLoader');

export const client = singleDocumentResolver('clientId', 'clientLoader');
