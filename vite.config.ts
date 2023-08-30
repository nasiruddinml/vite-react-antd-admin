import type { ConfigEnv, UserConfig } from 'vite';
import { createViteResolve } from './build/configs/vite/resolve';
import { createVitePlugins } from './build/configs/vite/plugins';
import { createViteBuild } from './build/configs/vite/build';
import { createViteServer } from './build/configs/vite/server';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
  const { command } = configEnv;

  const isBuild = command === 'build';

  return {
    resolve: createViteResolve(__dirname),
    plugins: createVitePlugins(isBuild, configEnv),
    build: createViteBuild(),
    server: createViteServer(),
  };
};
