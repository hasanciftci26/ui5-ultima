import consola from "consola";
import Manifest from "./Manifest";
import path from "path";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import Util from "./Util";

export default class ODataService {
    private manifest = new Manifest();
    private namespace: string;
    private ui5Path: string;

    public async add() {
        try {
            this.namespace = await this.manifest.getNamespace();
            this.ui5Path = this.manifest.getUI5Path(this.namespace);

            consola.start("Generating the OData classes...");

            await this.addODataClasses();
            await this.addODataClassTypes();
            await this.addCustomClassType();

            consola.success("UI5 Ultima has successfully generated the OData classes!");
        } catch (error) {
            consola.error(error);
        }
    }

    private async addODataClasses() {
        const targetDirectory = path.join(process.cwd(), "webapp", "lib", "odata");
        const directoryExists = await Util.pathExists(targetDirectory);
        const templateDirectory = path.join(__dirname, "..", "..", "template", "class", "odata");
        const templates = await readdir(templateDirectory);

        if (!directoryExists) {
            consola.info("Generating lib/odata directory...");
            await mkdir(targetDirectory, { recursive: true });
        }

        for (const template of templates) {
            const templatePath = path.join(templateDirectory, template);
            const fileName = template.slice(0, -4);
            const targetPath = path.join(targetDirectory, fileName);
            const rawContent = await readFile(templatePath, "utf-8");
            const content = this.replaceContent(rawContent);

            consola.info(`Generating ${fileName} file...`);
            await writeFile(targetPath, content);
        }
    }

    private async addODataClassTypes() {
        const targetDirectory = path.join(process.cwd(), "webapp", "types", "odata");
        const directoryExists = await Util.pathExists(targetDirectory);
        const templateDirectory = path.join(__dirname, "..", "..", "template", "types", "odata");
        const templates = await readdir(templateDirectory);

        if (!directoryExists) {
            consola.info("Generating types/odata directory...");
            await mkdir(targetDirectory, { recursive: true });
        }

        for (const template of templates) {
            const templatePath = path.join(templateDirectory, template);
            const fileName = template.slice(0, -4);
            const targetPath = path.join(targetDirectory, fileName);
            const rawContent = await readFile(templatePath, "utf-8");
            const content = this.replaceContent(rawContent);

            consola.info(`Generating ${fileName} file...`);
            await writeFile(targetPath, content);
        }
    }

    private async addCustomClassType() {
        const targetDirectory = path.join(process.cwd(), "webapp", "types", "global");
        const targetPath = path.join(targetDirectory, "CustomClass.types.ts");
        const directoryExists = await Util.pathExists(targetDirectory);
        const exists = await Util.pathExists(targetPath);

        if (exists) {
            return;
        }

        const templatePath = path.join(__dirname, "..", "..", "template", "types", "global", "CustomClass.types.ts.tpl");
        const template = await readFile(templatePath, "utf-8");
        const content = this.replaceContent(template);

        if (!directoryExists) {
            consola.info("Generating types/global directory...");
            await mkdir(targetDirectory, { recursive: true });
        }

        consola.info("Generating CustomClass.types.ts file...");
        await writeFile(targetPath, content);
    }

    private replaceContent(rawContent: string) {
        return rawContent
            .replaceAll("{{NAMESPACE}}", this.namespace)
            .replaceAll("{{UI5_PATH}}", this.ui5Path);
    }
}