import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CompleteUserProfile, Profile } from '../schemas';
import { authService } from '../services';

interface AuthState {
    completeProfile: CompleteUserProfile | null;
    isLoading: boolean;
    isInitializing: boolean; // Added for separate initialization state
    error: string | null;
    redirectPage: string | null;

    // Getters for abstracted access
    is_logged_in: () => boolean;
    is_onboarding_done: () => boolean;
    profile: () => CompleteUserProfile | null;

    // Core Actions
    initialize: () => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    signUp: (email: string, password: string, metadata?: any) => Promise<boolean>;
    onboarding: (profileData: Partial<Profile>) => Promise<boolean>;
    setRedirectPage: (page: string) => void;
    getRedirectPage: () => string;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    checkUsername: (username: string) => Promise<boolean>;
    uploadAvatar: (file: File) => Promise<string | null>;
}

/**
 * useAuthStore
 * Manages the authentication state and complete user profile.
 * Uses the authService for all Supabase interactions.
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            completeProfile: null,
            isLoading: false, // Changed to false by default for actions
            isInitializing: true, // Initial boot state
            error: null,
            redirectPage: null,

            // Implementation of Getters 
            is_logged_in: () => get().completeProfile !== null,
            is_onboarding_done: () => get().completeProfile?.is_onboarding_completed ?? false,
            profile: () => get().completeProfile,

            /**
             * Initialize the store by checking the current session
             */
            initialize: async () => {
                set({ isInitializing: true, error: null });
                try {
                    const userResult = await authService.getCurrentUser();
                    const user = Array.isArray(userResult.data) ? userResult.data[0] : userResult.data;

                    if (userResult.isSuccess && user) {
                        const profileResult = await authService.fetchProfile(user.id);
                        const profileData = Array.isArray(profileResult.data) ? profileResult.data[0] : profileResult.data;

                        if (profileResult.isSuccess && profileData) {
                            set({ completeProfile: profileData, isInitializing: false });
                            return;
                        }
                    }
                    set({ completeProfile: null, isInitializing: false });
                } catch (err: any) {
                    set({ error: err.message, isInitializing: false, completeProfile: null });
                }
            },

            setRedirectPage: (page: string) => {
                set({ redirectPage: page });
            },

            getRedirectPage: () => {
                const page = get().redirectPage ?? "/";
                set({ redirectPage: null });
                return page;
            },

            /**
             * Basic Login with Email
             */
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                const result = await authService.loginWithEmail(email, password);
                const loginData = Array.isArray(result.data) ? result.data[0] : result.data;

                if (result.isSuccess && loginData?.user) {
                    const profileResult = await authService.fetchProfile(loginData.user.id);
                    const profileData = Array.isArray(profileResult.data) ? profileResult.data[0] : profileResult.data;

                    set({
                        completeProfile: profileResult.isSuccess && profileData ? profileData : null,
                        isLoading: false
                    });
                    return true;
                } else {
                    set({ error: (result.backendError as string) || 'Login failed', isLoading: false });
                    return false;
                }
            },

            /**
             * Sign Up with Email
             */
            signUp: async (email, password, metadata) => {
                set({ isLoading: true, error: null });
                const result = await authService.signUp(email, password, metadata);
                const signUpData = Array.isArray(result.data) ? result.data[0] : result.data;

                if (result.isSuccess) {
                    if (signUpData?.user) {
                        const profileResult = await authService.fetchProfile(signUpData.user.id);
                        const profileData = Array.isArray(profileResult.data) ? profileResult.data[0] : profileResult.data;
                        set({ completeProfile: profileResult.isSuccess && profileData ? profileData : null });
                    }
                    set({ isLoading: false });
                    return true;
                } else {
                    set({ error: (result.backendError as string) || 'Signup failed', isLoading: false });
                    return false;
                }
            },

            /**
             * Handle Profile Onboarding
             */
            onboarding: async (profileData) => {
                const profile = get().profile();
                if (!profile || !profile.id) {
                    set({ error: 'No active profile to onboard' });
                    return false;
                }

                set({ isLoading: true, error: null });
                const result = await authService.onboarding(profile.id, profileData);

                if (result.isSuccess && result.data) {
                    // Update the profile locally to avoid waiting for refresh to reflect onboarding status
                    const updatedProfile = {
                        ...profile,
                        profile: { ...profile.profile, onboarding_completed: true },
                        is_onboarding_completed: true
                    } as CompleteUserProfile;

                    set({
                        completeProfile: updatedProfile,
                        isLoading: false
                    });

                    // Trigger a real background refresh just in case
                    get().refresh();
                    return true;
                } else {
                    set({ error: (result.backendError as string) || 'Onboarding failed', isLoading: false });
                    return false;
                }
            },

            /**
             * Refresh the current profile data
             */
            refresh: async () => {
                const currentProfile = get().profile();
                if (!currentProfile || !currentProfile.id) return;

                const profileResult = await authService.fetchProfile(currentProfile.id);
                const profileData = Array.isArray(profileResult.data) ? profileResult.data[0] : profileResult.data;

                if (profileResult.isSuccess && profileData) {
                    set({ completeProfile: profileData });
                }
            },

            /**
             * Logout and clear state
             */
            logout: async () => {
                set({ isLoading: true });
                await authService.logout();
                set({ completeProfile: null, isLoading: false, error: null, redirectPage: null });
            },

            /**
             * Login with Google OAuth
             */
            loginWithGoogle: async () => {
                set({ isLoading: true, error: null });
                const result = await authService.loginWithOAuth('google');
                if (!result.isSuccess) {
                    set({ error: (result.backendError as string) || 'Google login failed', isLoading: false });
                }
            },

            /**
             * Check if a username is available
             */
            checkUsername: async (username) => {
                const result = await authService.checkUsernameAvailability(username);
                return result.isSuccess && result.data === true;
            },

            /**
             * Upload Avatar Action
             */
            uploadAvatar: async (file) => {
                const profile = get().profile();
                if (!profile || !profile.id) {
                    set({ error: 'No active profile to upload avatar' });
                    return null;
                }

                set({ isLoading: true });
                const result = await authService.uploadAvatar(profile.id, file);

                if (result.isSuccess && result.data) {
                    set({ isLoading: false });
                    return result.data as string;
                } else {
                    set({ error: (result.backendError as string) || 'Upload failed', isLoading: false });
                    return null;
                }
            }
        }),
        {
            name: 'unseen-nepal-auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                redirectPage: state.redirectPage,
            }),
        }
    )
);
