export default {
  SUCCESS_CREATE: id => {
    return { code: 200, message: "Erfolgreich erstellt", id };
  },
  SUCCESS_UPDATE: doc => {
    return { code: 201, message: "Erfolgreich aktualisiert", doc };
  },
  SUCCESS_DELETE: { code: 202, message: "Erfolgreich gelöscht" },
  SUCCESS_UPLOAD: file => {
    return { code: 203, message: "Erfolgreich hochgeladen", file };
  }
}
