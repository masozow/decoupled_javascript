import { userModule } from "./features/user/UserModule.js";
document.addEventListener('DOMContentLoaded', () => {
    try {
        //#region DOM elements
        const results = document.getElementById('results');
        const searchBox = document.getElementById('search');
        //#endregion
        //#region User related logic
        userModule({ input: searchBox, results });
        //#endregion
    } catch (error) {
        console.error(error);
    }
})
//import('./shared/tests/index.js');