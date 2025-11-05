import moduleAlias from "module-alias";
import path from "path";

const root = path.resolve(__dirname);
moduleAlias.addAliases({
  "@services": path.join(root, "services"),
  "@repositories": path.join(root, "repositories"),
  "@models": path.join(root, "models"),
});
