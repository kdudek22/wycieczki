import create from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  userRole: '',


  setUsername: (username) => set({ username }),


  setUserRole: (userRole) => set({ userRole }),


  resetUser: () => set({ username: '', userRole: '' })
}));

export default useUserStore;
