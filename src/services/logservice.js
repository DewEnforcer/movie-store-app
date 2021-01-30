import Raven from "raven-js";
import config from "../config.json";

const init = () => {
    return;
    Raven.config(config.sentryDsn, {
    release: config.release,
    environment: config.environment
    }).install();
}

const log = (err) => {
    console.log(err);
    return;
    Raven.captureException(err);
}

export default {
    init,
    log
}