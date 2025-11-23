import { Command } from "commander";
import Fragment from "../service/Fragment";

export default new Command("add-fragment")
    .description(
        "Adds a new XML fragment to your project. \n" +
        "The fragment name can include a relative path from the webapp folder.\n" +
        "For example, 'fragments.employee.NewEmployee' will create: 'webapp/fragments/employee/NewEmployee.fragment.xml'"
    )
    .action(async () => {
        const fragment = new Fragment();
        await fragment.add();
    });