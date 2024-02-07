self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.showNotification("You have a new question", {
      body: "Tap to view",
      icon: "https://ngl-drx.vercel.app/icon.jpg",
    })
  );
});
