// store/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      recipientId:null,
      id: null, // Initial state
      token:"",
      emailStore:"",
      loading: false,
      setLoading: (state) => set({ loading: state }),
      setRecipientId:(id) => set({recipientId:id}),
      setEmailStore:(email) => set({emailStore:email}),
      setToken:(token)=>set({token:token}),
      setId: (newId) => set({ id: newId }), // Action to update id
    }),
    {
      name: "app-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage (default)
    }
  )
);

export default useAppStore;
