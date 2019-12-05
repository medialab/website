localStorage.clear();
sessionStorage.clear();
indexedDB.deleteDatabase('gatsby-plugin-offline-precache-https___medialab_sciencespo_fr_');
indexedDB.deleteDatabase('keyval-store');

navigator.serviceWorker.getRegistrations(workers => {
  workers.forEach(worker => worker.unregister());
});
