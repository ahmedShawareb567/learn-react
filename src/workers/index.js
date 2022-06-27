self.addEventListener("message", (e) => {
  postMessage({
    test: e.data.firstName,
  });
});
