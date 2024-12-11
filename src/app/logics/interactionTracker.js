let focusStartTime = null;
let interactionTimer = null;

export const startTrackingInteraction = (quoteId, author, isFocused) => {
  if (isFocused) {
    focusStartTime = new Date();
    interactionTimer = setInterval(() => {
      const focusDuration = (new Date() - focusStartTime) / 1000; // Focus duration in seconds
      console.log(`Current focus duration: ${focusDuration} seconds`);
    }, 1000);
  } else {
    if (focusStartTime) {
      const focusEndTime = new Date();
      const focusDuration = (focusEndTime - focusStartTime) / 1000; // Focus duration in seconds

      if (focusDuration > 5) {
        updateLocalStorage(quoteId, author, focusDuration);
      }

      clearInterval(interactionTimer);
      focusStartTime = null;
    }
  }
};

const updateLocalStorage = (quoteId, author, focusDuration) => {
  const userInteractions = JSON.parse(localStorage.getItem('userInteractions')) || {};
  const key = `${author}_${quoteId}`; // Create a unique key based on author and quote

  if (!userInteractions[key]) {
    userInteractions[key] = { count: 0, totalTime: 0 };
  }
  
  userInteractions[key].count += 1;
  userInteractions[key].totalTime += focusDuration;

  localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
  console.log(`User interacted with quote: "${quoteId}" by ${author} for ${focusDuration} seconds`);
};
