import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useItems = create(
  persist(
    (set, get) => ({
      data: [],
      setItems: (items) => set({ data: items }),
      buy: false,
      setBuy: (buy) => set((state) => ({ buy: !state.buy })),
      sort: (by) => {
        switch (by) {
          case 'nameaz':
            return get().data.sort((a, b) => a.productName - b.productName)
          case 'nameza':
            return get().data.sort((a, b) => {
              if (a.productName > b.productName) {
                return -1;
              }
              if (b.productName > a.productName) {
                return 1;
              }
              return 0;
            })
          case 'pricehl':
            return set({ data: get().data.sort((a, b) => a.fixedSenderDenominations - b.fixedSenderDenominations) })
          case 'pricelh':
            return set({ data: get().data.sort((a, b) => b.fixedSenderDenominations - a.fixedSenderDenominations) })
          default:
            return;
        }
      }
    }),
    {
      name: 'items-storage',
    },
  ),
)

export default useItems;