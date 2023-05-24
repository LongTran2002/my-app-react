import { create } from 'zustand'
const storeUser = (set) => ({
    listUsers: [],
    dataUserEdit: {},
    setDataUserEdit: (data) => set({dataUserEdit: data}),
    setListUsers: (users) => set({listUsers: users}),
})
export const useStoreUser = create(storeUser);
