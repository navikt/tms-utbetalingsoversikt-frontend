const isDevelopment = process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
const isProduction = process.env.NAIS_CLUSTER_NAME === 'prod-gcp';
export const isLocal = process.env.NODE_ENV === 'development';

export const getEnvironment = () => {
  if (isDevelopment) {
    return 'dev';
  }

  if (isLocal) {
    return 'dev';
  }

  return 'prod';
};

export const getDecoratorEnvironment = () => (isProduction ? 'prod' : 'dev');
