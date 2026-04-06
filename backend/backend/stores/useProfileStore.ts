import { create } from 'zustand';
import { profileService } from '../services/profileService';
import { PrivateProfileData, Profile } from '../schemas';

interface ProfileState {
    myPrivateData: PrivateProfileData | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchMyPrivateData: (userId: string) => Promise<void>;
    clearMyData: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    myPrivateData: null,
    isLoading: false,
    error: null,

    fetchMyPrivateData: async (userId) => {
        set({ isLoading: true, error: null });
        const result = await profileService.getMyPrivateData(userId);

        if (result.isSuccess && result.data) {
            set({ 
                myPrivateData: result.data as PrivateProfileData, 
                isLoading: false 
            });
        } else {
            set({ 
                error: (result.backendError as string) || 'Failed to fetch profile data', 
                isLoading: false 
            });
        }
    },

    clearMyData: () => set({ myPrivateData: null, error: null }),
}));
