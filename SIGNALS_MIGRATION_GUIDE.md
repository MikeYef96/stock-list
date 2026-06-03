/**
 * NGRX SIGNALS MIGRATION GUIDE
 * =============================
 * 
 * Current State (Action-Based):
 * - Using Actions for dispatching events
 * - Using Effects for side effects (API calls)
 * - Using Reducers for state updates
 * - Manual subscription management
 * 
 * Signal Store Benefits:
 * ✓ Simpler API - no boilerplate
 * ✓ Type-safe store access
 * ✓ Automatic change detection
 * ✓ Reduced bundle size
 * ✓ Less code to maintain
 * 
 * MIGRATION STRATEGY
 * ==================
 * 
 * Phase 1 (Coexist): Keep action-based NgRx, add signal stores for new features
 * Phase 2 (Gradual): Convert simple reducers to signals first
 * Phase 3 (Complete): Migrate effects and complex state
 * 
 * START HERE: Add signal store for simple state
 * 
 * EXAMPLE: Simple Signal Store for UI State
 * ==========================================
 * 
 * 1. Install Signal Store utilities:
 *    npm install @ngrx/signals
 * 
 * 2. Create store file (e.g., ui.store.ts):
 * 
 *    import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
 *    import { computed } from '@angular/core';
 * 
 *    interface UiState {
 *      theme: 'light' | 'dark';
 *      sidebarOpen: boolean;
 *    }
 * 
 *    export const UiStore = signalStore(
 *      withState<UiState>({
 *        theme: 'light',
 *        sidebarOpen: true,
 *      }),
 * 
 *      withComputed(({ theme, sidebarOpen }) => ({
 *        isDarkMode: computed(() => theme() === 'dark'),
 *        isCollapsed: computed(() => !sidebarOpen()),
 *      })),
 * 
 *      withMethods((store) => ({
 *        toggleTheme: () => {
 *          store.theme.set(store.theme() === 'light' ? 'dark' : 'light');
 *        },
 *        toggleSidebar: () => {
 *          store.sidebarOpen.set(!store.sidebarOpen());
 *        },
 *      }))
 *    );
 * 
 * 3. Use in component:
 * 
 *    import { Component } from '@angular/core';
 *    import { UiStore } from './ui.store';
 * 
 *    @Component({
 *      selector: 'app-root',
 *      standalone: true,
 *      providers: [UiStore],
 *    })
 *    export class AppComponent {
 *      uiStore = inject(UiStore);
 * 
 *      // Direct access to signals (auto-reactive)
 *      isDark = this.uiStore.isDarkMode;
 *      
 *      // Call methods
 *      onToggleTheme() {
 *        this.uiStore.toggleTheme();
 *      }
 *    }
 * 
 * 4. Use in template:
 * 
 *    <div [class.dark]="uiStore.isDarkMode()">
 *      <button (click)="uiStore.toggleTheme()">Toggle Theme</button>
 *    </div>
 * 
 * CONVERTING CURRENT STORES TO SIGNALS
 * ====================================
 * 
 * For StocksList (Simple Query - Good First Migration):
 * \n *    Current Flow: Action → Effect → API Call → Reducer → State
 *    Signal Flow: Store Method → Signal Update
 * 
 *    Advantages: Removes boilerplate, easier testing
 * 
 * For Stock Data (Complex with Effects - Later):
 *    Requires: withAsyncMethods, withDataFetching patterns
 *    More complex due to loading states and error handling
 * 
 * NEXT STEPS
 * ==========
 * 1. Install @ngrx/signals: npm install @ngrx/signals
 * 2. Start with UI state (theme, sidebar, filters)
 * 3. Gradually migrate API-based stores
 * 4. Deprecate action-based stores once all features converted
 * 
 * RESOURCES
 * =========
 * - NgRx Signals Docs: https://ngrx.io/guide/signals
 * - Migration Guide: https://ngrx.io/guide/signals/migrate-from-store
 * - Live Examples: https://github.com/ngrx/platform/tree/main/projects/ngrx.io/src/app/docs/signals
 */
