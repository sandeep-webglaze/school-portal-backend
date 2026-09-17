"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROMETHEUS_METRICS_TYPES = void 0;
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const counterList = [
    {
        name: 'total_requests',
        help: 'Number of Total Requests'
    },
    {
        name: 'error_requests',
        help: 'Number of Errored Requests'
    },
    {
        name: 'error_database',
        help: 'Number of database errors'
    },
    {
        name: 'error_application',
        help: 'Number of runtime errors'
    },
    {
        name: 'error_unknown',
        help: 'Number of unknown errors'
    },
];
exports.PROMETHEUS_METRICS_TYPES = counterList.map((el) => {
    return (0, nestjs_prometheus_1.makeCounterProvider)({
        name: el.name,
        help: el.help
    });
});
//# sourceMappingURL=app.metrics.js.map