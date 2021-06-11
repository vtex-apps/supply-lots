import { defineMessages } from 'react-intl'

export const commonMessages = defineMessages({
  inventory: { id: 'admin/inventory' },
  retry: { id: 'admin/inventory.commons.retry' },
  loading: {
    id: 'admin/inventory.commons.loading',
  },
  skuDoesntExist: { id: 'admin/inventory.commons.sku-doesnt-exist' },
})

export const columnsMessages = defineMessages({
  products: { id: 'admin/inventory.columns.products' },
  sku: { id: 'admin/inventory.columns.sku' },
  lastUpdate: { id: 'admin/inventory.columns.last-update' },
  reserved: { id: 'admin/inventory.columns.reserved' },
  dispatchedReservations: {
    id: 'admin/inventory.columns.dispatched-reservations',
  },
  available: { id: 'admin/inventory.columns.available' },
  infinite: { id: 'admin/inventory.columns.infinite' },
  warehouse: { id: 'admin/inventory.columns.warehouse' },
  updateCount: { id: 'admin/inventory.columns.update-count' },
  infiniteInventory: { id: 'admin/inventory.columns.infinite-inventory' },
  secondLoadingError: { id: 'admin/inventory.columns.second-loading-error' },
  rowSaveError: { id: 'admin/inventory.columns.row-save-error' },
  deleteInventoryItem: { id: 'admin/inventory.columns.delete-item' },
  deleteInventoryItemSuccess: {
    id: 'admin/inventory.columns.delete-item.success',
  },
  deleteInventoryItemError: { id: 'admin/inventory.columns.delete-item.error' },
})

export const tableMessages = defineMessages({
  of: { id: 'admin/inventory.commons.table.of' },
  showRows: { id: 'admin/inventory.commons.table.show-rows' },
})

export const productsTableMessages = defineMessages({
  itemsSearchDefault: {
    id: 'admin/inventory.products-table.items-search-default',
  },
  autocompleteSkuIsPrefix: {
    id: 'admin/inventory.products-table.items-search.sku-prefix',
  },
  autocompleteSkuIdIsPrefix: {
    id: 'admin/inventory.products-table.items-search.sku-id-prefix',
  },
  autocompleteProductIsPrefix: {
    id: 'admin/inventory.products-table.items-search.product-prefix',
  },
  autocompleteProductIdIsPrefix: {
    id: 'admin/inventory.products-table.items-search.product-id-prefix',
  },
  productsPageQueryError: {
    id: 'admin/inventory.products-table.products-page-query-error',
  },
  productsPageQueryErrorTitle: {
    id: 'admin/inventory.products-table.products-page-query-error.title',
  },
  noItemsFound: { id: 'admin/inventory.products-table.no-items-found' },
  save: { id: 'admin/inventory.products-table.save' },
  clearChanges: { id: 'admin/inventory.products-table.clear-changes' },
  saveSuccess: { id: 'admin/inventory.products-table.save-success' },
  saveError: { id: 'admin/inventory.products-table.save-error' },
})

export const changelogMessages = defineMessages({
  changelog: { id: 'admin/inventory.changelog.title' },
  productWarehouseNames: {
    id: 'admin/inventory.changelog.product-warehouse-names',
  },
  user: { id: 'admin/inventory.changelog.user' },
  date: { id: 'admin/inventory.changelog.date' },
  quantityBefore: { id: 'admin/inventory.changelog.quantity-before' },
  quantityAfter: { id: 'admin/inventory.changelog.quantity-after' },
  queryError: { id: 'admin/inventory.changelog.query-error' },
  noEntries: { id: 'admin/inventory.changelog.no-entries' },
})

export const reservedItemsMessages = defineMessages({
  reservedTitle: { id: 'admin/inventory.reserved-items.title' },
  dispatchedTitle: { id: 'admin/inventory.reserved-items.dispatched.title' },
  skuIdentification: {
    id: 'admin/inventory.reserved-items.sku-identification',
  },
  order: { id: 'admin/inventory.reserved-items.order' },
  quantity: {
    id: 'admin/inventory.reserved-items.quantity',
  },
  reservationDate: { id: 'admin/inventory.reserved-items.reservation-date' },
  expirationDate: { id: 'admin/inventory.reserved-items.expiration-date' },
  status: { id: 'admin/inventory.reserved-items.status' },
  confirmed: { id: 'admin/inventory.reserved-items.status.confirmed' },
  authorized: { id: 'admin/inventory.reserved-items.status.authorized' },
  canceled: { id: 'admin/inventory.reserved-items.status.canceled' },
  expired: { id: 'admin/inventory.reserved-items.status.expired' },
  action: { id: 'admin/inventory.reserved-items.action' },
  seeOrder: { id: 'admin/inventory.reserved-items.action.see-order' },
  queryError: { id: 'admin/inventory.reserved-items.query-error' },
  noEntries: { id: 'admin/inventory.reserved-items.no-entries' },
})

export const filtersMessages = defineMessages({
  ok: { id: 'admin/inventory.filters.ok' },
  all: { id: 'admin/inventory.filters.all' },
  and: { id: 'admin/inventory.filters.and' },
  greaterOrEqualDropdown: {
    id: 'admin/inventory.filters.dropdown.greater-or-equal',
  },
  greaterOrEqualLabel: {
    id: 'admin/inventory.filters.label.greater-or-equal-value',
  },
  lessOrEqualDropdown: {
    id: 'admin/inventory.filters.dropdown.less-or-equal',
  },
  lessOrEqualLabel: {
    id: 'admin/inventory.filters.label.less-or-equal-value',
  },
  betweenDropdown: {
    id: 'admin/inventory.filters.dropdown.between',
  },
  betweenLabel: {
    id: 'admin/inventory.filters.label.between-values',
  },
  betweenInvalid: {
    id: 'admin/inventory.filters.error.between',
  },
  maximumPlaceholder: {
    id: 'admin/inventory.filters.placeholder.maximum',
  },
  minimumPlaceholder: {
    id: 'admin/inventory.filters.placeholder.minimum',
  },
  search: {
    id: 'admin/inventory.filters.search',
  },
  warehousesQueryError: {
    id: 'admin/inventory.filters.warehouses-query-error',
  },
  warehousesNamesQueryError: {
    id: 'admin/inventory.filters.warehouses-names-query-error',
  },
})

export const unsavedChangesMessages = defineMessages({
  modalTitle: {
    id: 'admin/inventory.unsaved-changes.modal.title',
  },
  modalDescription: {
    id: 'admin/inventory.unsaved-changes.modal.description',
  },
  saveChanges: {
    id: 'admin/inventory.unsaved-changes.modal.save',
  },
  ignoreChanges: {
    id: 'admin/inventory.unsaved-changes.modal.ignore',
  },
  cancel: {
    id: 'admin/inventory.unsaved-changes.modal.cancel',
  },
})
