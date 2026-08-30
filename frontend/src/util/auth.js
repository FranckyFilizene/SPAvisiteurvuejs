// Gestion de l'authentification côté client : token + informations utilisateur.
// Contient aussi un "mode démo" (localStorage) utilisé automatiquement quand
// l'API backend est injoignable, afin que l'application reste entièrement
// testable sans backend.

const TOKEN_KEY = "user_token";
const USER_KEY = "user_data";
const DEMO_USERS_KEY = "demo_users";
const DEMO_VISITEURS_KEY = "demo_visiteurs";

/* ------------------------------------------------------------------ */
/* Session                                                            */
/* ------------------------------------------------------------------ */

export function setSession(token, user, rememberMe = false) {
  clearSession();
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user ?? null));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function clearSession() {
  [localStorage, sessionStorage].forEach((storage) => {
    storage.removeItem(TOKEN_KEY);
    storage.removeItem(USER_KEY);
  });
}

export function logout() {
  clearSession();
}

/* ------------------------------------------------------------------ */
/* Détection du mode démo                                             */
/* ------------------------------------------------------------------ */

/** true si la requête n'a jamais atteint un serveur (backend éteint...). */
export function isNetworkError(error) {
  return Boolean(error && error.request && !error.response);
}

/**
 * Indique si l'on doit basculer sur le mode démo :
 * - la requête n'est jamais arrivée au serveur, ou
 * - le serveur a répondu 404 (cas d'un dossier backend absent :
 *   Apache/Laragon renvoie alors une page 404 HTML).
 */
export function shouldUseDemo(error) {
  if (isNetworkError(error)) return true;
  return Boolean(error && error.response && error.response.status === 404);
}

/* ------------------------------------------------------------------ */
/* Mode démo : comptes utilisateurs                                   */
/* ------------------------------------------------------------------ */

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function seedDemoUsers() {
  if (!readJSON(DEMO_USERS_KEY, null)) {
    writeJSON(DEMO_USERS_KEY, [
      {
        id: 1,
        name: "Admin",
        username: "admin",
        telephone: "034 00 000 00",
        email: "admin@visiteur.com",
        password: "admin123",
      },
    ]);
  }
}

function sanitizeUser({ password, ...safeUser }) {
  return safeUser;
}

export async function demoLogin(identifier, password) {
  seedDemoUsers();
  const users = readJSON(DEMO_USERS_KEY, []);
  const needle = String(identifier).trim().toLowerCase();
  const user = users.find(
    (u) =>
      u.password === password &&
      (u.email.toLowerCase() === needle ||
        u.username.toLowerCase() === needle ||
        String(u.telephone).replace(/\s/g, "") === needle.replace(/\s/g, ""))
  );
  if (!user) {
    throw new Error("Identifiants invalides (mode démo).");
  }
  return { token: `demo-token-${Date.now()}`, user: sanitizeUser(user) };
}

export async function demoRegister({ name, username, telephone, email, password }) {
  seedDemoUsers();
  const users = readJSON(DEMO_USERS_KEY, []);
  const exists = users.some(
    (u) => u.email.toLowerCase() === String(email).trim().toLowerCase()
  );
  if (exists) {
    throw new Error("Un compte existe déjà avec cet email (mode démo).");
  }
  const newUser = { id: Date.now(), name, username, telephone, email, password };
  users.push(newUser);
  writeJSON(DEMO_USERS_KEY, users);
  return { token: `demo-token-${Date.now()}`, user: sanitizeUser(newUser) };
}

export async function demoForgotPassword(email) {
  // En mode démo on simule simplement l'envoi du lien de réinitialisation.
  return {
    message: `Un lien de réinitialisation a été envoyé à ${email} (mode démo : aucun email réel n'est envoyé).`,
  };
}

/* ------------------------------------------------------------------ */
/* Mode démo : visiteurs                                              */
/* ------------------------------------------------------------------ */

function seedDemoVisiteurs() {
  if (readJSON(DEMO_VISITEURS_KEY, null)) return;
  const now = new Date();
  // [joursPassés, nom, prénom, email, téléphone, motif, statut, heure]
  const sample = [
    [0, "Rakoto", "Jean", "jean.rakoto@mail.com", "034 12 345 67", "Réunion", "Valide", 9],
    [0, "Rabe", "Marie", "marie.rabe@mail.com", "033 98 765 43", "Entretien", "En attente", 10],
    [0, "Randria", "Paul", "paul.randria@mail.com", "032 11 22 33", "Livraison", "Valide", 11],
    [1, "Rasoa", "Hanta", "hanta.rasoa@mail.com", "034 44 55 66", "Visite client", "Valide", 8],
    [1, "Andry", "Tom", "tom.andry@mail.com", "032 77 88 99", "Réunion", "Refusé", 15],
    [2, "Soa", "Lala", "lala.soa@mail.com", "033 12 90 12", "Entretien", "Valide", 14],
    [3, "Mamy", "Rado", "rado.mamy@mail.com", "034 55 44 33", "Livraison", "Valide", 9],
    [4, "Fetra", "Naina", "naina.fetra@mail.com", "032 22 33 44", "Visite client", "En attente", 13],
    [5, "Koto", "Bako", "bako.koto@mail.com", "033 66 77 88", "Réunion", "Valide", 10],
    [6, "Vola", "Miora", "miora.vola@mail.com", "034 99 88 77", "Entretien", "Valide", 11],
  ];
  const visiteurs = sample.map((row, index) => {
    const [daysAgo, nom, prenom, email, telephone, motif, statut, hour] = row;
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hour, 0, 0, 0);
    return {
      id: `demo-${Date.now()}-${index}`,
      nom,
      prenom,
      email,
      telephone,
      motif,
      statut,
      dateVisite: date.toISOString(),
    };
  });
  writeJSON(DEMO_VISITEURS_KEY, visiteurs);
}

export async function demoGetVisiteurs() {
  seedDemoVisiteurs();
  return readJSON(DEMO_VISITEURS_KEY, []);
}

export async function demoAddVisiteur(visiteur) {
  const visiteurs = await demoGetVisiteurs();
  const nouveau = {
    ...visiteur,
    id: `demo-${Date.now()}`,
    dateVisite: visiteur.dateVisite || new Date().toISOString(),
  };
  writeJSON(DEMO_VISITEURS_KEY, [nouveau, ...visiteurs]);
  return nouveau;
}

export async function demoDeleteVisiteur(id) {
  const visiteurs = await demoGetVisiteurs();
  writeJSON(DEMO_VISITEURS_KEY, visiteurs.filter((v) => v.id !== id));
}

