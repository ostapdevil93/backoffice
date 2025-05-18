import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const setupPinia = () => {
    const pinia = createPinia();
    pinia.use(
        createPersistedState({
            auto: true,
            key: (id) => `pinia-${id}`,
        }),
    );
    return pinia;
};

