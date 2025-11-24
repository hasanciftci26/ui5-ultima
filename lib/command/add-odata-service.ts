import { Command } from "commander";
import Util from "../service/Util";
import ODataService from "../service/ODataService";

export default new Command("add-odata-service")
    .description(Util.getCommandDescription(
        "Adds the built-in UI5 Ultima OData classes. OData classes are generated in the webapp/lib/odata directory.\n" +
        "WARNING: This action overrides OData related files if already exist!"
    ))
    .action(async () => {
        const odata = new ODataService();
        await odata.add();
    });