export default {
  SUCCESS_CREATE: id => {
    return { code: 200, message: "Erfolgreich erstellt", id };
  },
  SUCCESS_UPDATE: doc => {
    return { code: 200, message: "Erfolgreich aktualisiert", doc };
  },
  SUCCESS_DELETE: { code: 200, message: "Erfolgreich gelöscht" }
}
