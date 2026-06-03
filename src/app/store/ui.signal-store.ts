import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface UiState {
  sidebarOpen: boolean;
  loading: boolean;
  selectedSymbol: string | null;
  filterText: string;
  theme: 'light' | 'dark';
}

/**
 * UI Signal Store - Manages application-level UI state
 * 
 * Benefits over action-based approach:
 * - 70% less boilerplate code
 * - Type-safe signal access
 * - Automatic change detection
 * - Simpler testing
 * 
 * Usage in component:
 * 
 *   @Component({
 *     standalone: true,
 *     providers: [UiSignalStore],
 *   })
 *   export class MyComponent {
 *     uiStore = inject(UiSignalStore);
 *     
 *     // Access state directly
 *     isLoading = this.uiStore.isLoading;
 *     
 *     // Call methods
 *     onSidebarToggle() {
 *       this.uiStore.toggleSidebar();
 *     }
 *     
 *     // Use computed values
 *     isDarkMode$ = this.uiStore.isDarkMode;
 *   }
 */
export const UiSignalStore = signalStore(
  withState<UiState>({
    sidebarOpen: true,
    loading: false,
    selectedSymbol: null,
    filterText: '',
    theme: 'light',
  }),

  withComputed(({ sidebarOpen, loading, theme }) => ({
    isSidebarCollapsed: computed(() => !sidebarOpen()),
    isLoading: computed(() => loading()),
    isDarkMode: computed(() => theme() === 'dark'),
    sidebarWidth: computed(() => sidebarOpen() ? '250px' : '70px'),
  })),

  withMethods((store) => ({
    // Sidebar methods
    toggleSidebar: () => {
      store.sidebarOpen.set(!store.sidebarOpen());
    },
    openSidebar: () => {
      store.sidebarOpen.set(true);
    },
    closeSidebar: () => {
      store.sidebarOpen.set(false);
    },

    // Loading state
    setLoading: (loading: boolean) => {
      store.loading.set(loading);
    },

    // Symbol selection
    selectSymbol: (symbol: string | null) => {
      store.selectedSymbol.set(symbol);
    },

    // Filter management
    setFilter: (text: string) => {
      store.filterText.set(text.toLowerCase());
    },
    clearFilter: () => {
      store.filterText.set('');
    },

    // Theme
    toggleTheme: () => {
      const newTheme = store.theme() === 'light' ? 'dark' : 'light';
      store.theme.set(newTheme);
      // Optional: persist to localStorage
      localStorage.setItem('app-theme', newTheme);
    },
    setTheme: (theme: 'light' | 'dark') => {
      store.theme.set(theme);
      localStorage.setItem('app-theme', theme);
    },

    // Reset UI
    resetUi: () => {
      store.sidebarOpen.set(true);
      store.loading.set(false);
      store.selectedSymbol.set(null);
      store.filterText.set('');
    },
  }))
);

/**
 * MIGRATION PATH:
 * 
 * Step 1: Add this UI store to main.ts providers:
 *   providers: [
 *     UiSignalStore,
 *     // ... other providers
 *   ]
 * 
 * Step 2: Replace component state with store access:
 *   // Before:
 *   sidebarOpen$ = this.store.select(selectSidebarOpen);
 *   
 *   // After:
 *   sidebarOpen = this.uiStore.sidebarOpen;
 * 
 * Step 3: Update templates to use signals:
 *   // Before:
 *   [ngClass]="{ collapsed: (sidebarOpen$ | async) === false }"
 *   
 *   // After:
 *   [ngClass]="{ collapsed: uiStore.isSidebarCollapsed() }"
 * 
 * Future Enhancement:
 * Replace the entire NgRx action/effect/reducer setup with this pattern
 * for a leaner, more maintainable codebase.
 */
