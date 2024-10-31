import { create } from "zustand";

type State = {
  isUserLoggedIn: boolean;
    setIsUserLoggedIn: (value: boolean) => void;
    userData:any;
    setUserData:(value:any) => void
    isAdminLoggedIn:boolean
    setIsAdminLoggedIn:(value:boolean) => void;
   

};

export const useStore = create<State>((set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (value) => set({ isUserLoggedIn: value }),
    userData:null,
    setUserData:(value)=>{
        set({userData:value})
    },
    isAdminLoggedIn:false,
    setIsAdminLoggedIn:(value) => set({isAdminLoggedIn:value})

    
}));