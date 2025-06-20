export function registerSW() {
    console.log('Registering Service Workder...','serviceWorker' in navigator);
    
    
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    //   const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      const swUrl = `/service-worker.js`;
      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}