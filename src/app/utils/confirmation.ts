const CONFIRMATION_KEY = "submitted:3dplan";

// Marks a successful submit so /confirmation can be opened once.
export const allowConfirmation = (page: "contact" | "order") => {
  try {
    sessionStorage.setItem(CONFIRMATION_KEY, page);
  } catch {
    // sessionStorage may be unavailable (private mode, blocked storage)
  }
};

// Reads and clears the flag, so a reload or a direct visit is rejected.
export const consumeConfirmation = () => {
  try {
    const key = sessionStorage.getItem(CONFIRMATION_KEY);
    sessionStorage.removeItem(CONFIRMATION_KEY);
    return key as "contact" | "order" | null | undefined;
  } catch {
    return false;
  }
};
