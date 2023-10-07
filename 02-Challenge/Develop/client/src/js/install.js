const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Trigger the installation prompt
    deferredPrompt.prompt();
    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User declined the installation');
    }
    // Reset the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed by the user');
  // You can add any additional logic you need here
});

